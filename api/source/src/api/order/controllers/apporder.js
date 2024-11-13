const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
const qs = require('qs');
const moment = require('moment');
const paypalHost = "https://api-m.sandbox.paypal.com";
const PAYPAL_CLIENT_ID = 'AT4-PxZueVDnzKNSqDwGGuu03TNfQJNFhJre1yzmzuVzKMefyasd1EHQxsKw3rnOxypFSJX7XPnx_yXB'
const PAYPAL_CLIENT_SECRET = 'EKbbuQaiDqeQN1vwiBLJ7V2NpkRZKhrGNQPmXyfc-qG3wUwjXs_LVXLym_ckt6ilWwxTwOaCqG0vFUac'
module.exports = createCoreController('api::order.order', ({ strapi }) => ({
	async test(ctx) {
		let order =  await strapi.db.query('api::order.order').findOne({
			select: ['*'],
			populate: {
				cartitems: {
					populate: {
						product: { populate: ['thub']},
						variant: {}
					}
				}
			},
			where: { id: 22 }
		});
		return order
	},
	async create(ctx) {
		const { user } = ctx.state
		let { shippingType, listProductItem, code, payment_type } = ctx.request.body;
		if (!code) {
			return { message: 'Không tìm thấy mã đơn' };
		}
		if (!payment_type) {
			return { message: 'Không tìm thấy thông tin thanh toán' };
		}
		if (!shippingType) {
			return { message: 'Không tìm thấy thông tin vận chuyển' };
		}
		// let ship = await strapi.db.query('api::shipping.shipping').findOne({
		// 	select: ['id', 'price'],
		// 	where: { id: shipping_id }
		// });
		let address = await strapi.db.query('api::address.address').findOne({
			select: ['name', 'phone', 'email', 'full_address'],
			where: { user_id: user.id }
		});

		if (!address) {
			return { message: 'Không tìm thấy thông tin địa chỉ người nhận' };
		}
		if (listProductItem && listProductItem.length > 0) {
			let listCartId = []
			let listCartValue = []
			let listProductId = []
			let listVariantId = []
			let listCartAdd = []
			let total_price = 0
			let priceShip = 0 //ship.price
			let checkCart = true
			let productName = ''
			for (let i = 0; i < listProductItem.length; i++) {
				let product = await strapi.db.query('api::product.product').findOne({
					select: ['id', 'price', 'name'],
					where: { id: listProductItem[i].id }
				});
				listVariantId.push(listProductItem[i].variant_id)
				listProductId.push(product.id)
				if (i === listProductItem.length - 1) {
					productName += product.name
				} else {
					productName += product.name + ', '
				}
				total_price += listProductItem[i].quantity * product.price
				listCartValue.push(listProductItem[i].quantity * product.price)

				if (listProductItem[i].quantity <= 0) {
					checkCart = false
				}
				listCartAdd.push({
					id: listProductItem[i].id,
					variant: listProductItem[i].variant_id,
					quantity: listProductItem[i].quantity,
					price: product.price
				})
			}

			if (!checkCart || total_price <= 0) {
				return { message: 'Thông tin giỏ hàng không hợp lệ' };
			}
			for (let i = 0; i < listCartAdd.length; i++) {
				let cart = {
					total_price: listCartAdd[i].quantity * listCartAdd[i].price,
					product: listCartAdd[i].id,
					quantity: listCartAdd[i].quantity,
					variant: listCartAdd[i].variant,
					user: user?.id
				}
				let resCart = await strapi.entityService.create('api::cart.cart', { data: cart });
				if (resCart && resCart.id) {
					listCartId.push(resCart.id)
				}
			}
			let pick_date = moment().add(1, 'days').format('YYYY-MM-DD')
			let end_date = moment().add(4, 'days').format('YYYY-MM-DD')
			listProductId = listProductId.filter(function (item, pos) {
				return listProductId.indexOf(item) == pos;
			})
			let _order = {
				code,
				state: 'new',
				price: total_price,
				price_ship: priceShip,
				address_name: address.name,
				address_email: address.email,
				address_phone: address.phone,
				address_full: address.full_address,
				payment_type,
				shippingType,
				pick_date,
				end_date,
				discount_price: 0,
				cod: payment_type === 'cod' ? total_price + priceShip : 0,
				cartitems: listCartId,
				products: listProductId,
				variants: listVariantId,
				user: user?.id
			}
			let rorder = await strapi.entityService.create('api::order.order', { data: _order });
			let res_order = await createOrder(listCartValue);
			if(res_order.id) {
				await strapi.db.query('api::order.order').update({
					where: { id: rorder.id },
					data: {
						state: 'confirm',
						order_paypal_id :res_order.id
					},
				})
			}
			return res_order
		}
		return { message: 'Không tìm thấy thông tin giỏ hàng' };
	},

	async capture(ctx) {
		let { order_id } = ctx.request.body;
		if(!order_id) {
			return false
		}
		try {
			let order =  await strapi.db.query('api::order.order').findOne({
				select: ['*'],
				populate: {
					cartitems: {
						populate: {
							product: { populate: ['thub'] },
							variant: { populate: ['color','size'] }
						}
					}
				},
				where: { order_paypal_id: order_id }
			});
			if(!order) return false
			await strapi.db.query('api::order.order').update({
				where: { id: order.id },
				data: {
					state: 'payment'
				},
			})
			let res = await captureOrder(order_id);
			return {
				...res,
				order: order
			}
		} catch (error) {
			console.error("Failed to create order:", error);
			return false
		}
	},

	async approveOrder(ctx) {
		const { user } = ctx.state
		let { order_id } = ctx.request.body;
		// let { order_id } = ctx.query;


		let order = await strapi.db.query('api::order.order').findOne({
			select: ['*'],
			populate: {
				cartitems: {
					populate: { 'product': true, 'variant': true }
				},
			},
			where: { id: order_id }
		});
		if (order.state === 'new') {
			await strapi.db.query('api::order.order').update({
				where: { id: order_id },
				data: {
					state: 'pickitem',
				},
			});
			if (order.cartitems && order.cartitems.length > 0) {
				for (let i = 0; i < order.cartitems.length; i++) {
					if (order.cartitems[i].product?.id && order.cartitems[i].variant?.id) {
						let product = await strapi.db.query('api::product.product').findOne({
							select: ['id', 'sold'],
							where: { id: order.cartitems[i].product.id }
						});
						let variant = await strapi.db.query('api::variant.variant').findOne({
							select: ['id', 'sold', 'inventory'],
							where: { id: order.cartitems[i].variant.id }
						});
						let new_inventory = variant.inventory - order.cartitems[i].quantity
						await strapi.db.query('api::variant.variant').update({
							where: { id: order.cartitems[i].variant.id },
							data: {
								sold: variant.sold ? variant.sold + order.cartitems[i].quantity : order.cartitems[i].quantity,
								inventory: new_inventory < 0 ? 0 : new_inventory
							},
						});
						await strapi.db.query('api::product.product').update({
							where: { id: order.cartitems[i].product.id },
							data: {
								sold: product.sold ? product.sold + order.cartitems[i].quantity : order.cartitems[i].quantity,
							},
						});
					}

				}
			}
			return order

		}
		return order

	},

	async upload(ctx) {
		return true
	},

	async deletelike(ctx) {
		const { user } = ctx.state
		let { like_id, product_id } = ctx.request.body;
		let like = await strapi.db.query('api::like.like').findOne({
			select: ['id'],
			where: { id: like_id }
		});
		if (!like) {
			return { message: 'Không tìm thấy mã đơn' };
		}
		await strapi.db.query('api::like.like').delete({
			where: { id: 1 },
		});
		let product = strapi.db.query('api::product.product').findOne({
			select: ['id', 'likes'],
			where: { id: product_id }
		});
		console.log(product)
		if (product) {
			let listId = product.likes.filter(o => o.id !== like_id)
			let _data = {
				code,
				likes: listId
			}
			let res = await strapi.entityService.create('api::product.product', {
				where: { id: product_id },
				data: {
					likes: listId
				},
			});
			return { product }
		} else {
			return {}
		}
	},

	async statistic(ctx) {
		let { start, end } = ctx.query;
		let all_user = await strapi.db.query("plugin::users-permissions.user").count();
		let all_order = await strapi.db.query("api::order.order").count();
		let new_user = await strapi.db.query("plugin::users-permissions.user").count({
			where: {
				$and: [
					{ createdAt: { $gte: start } },
					{ createdAt: { $lte: end } }
				]
			},
		});
		let new_order = await strapi.db.query("api::order.order").count({
			where: {
				$and: [
					{ createdAt: { $gte: start } },
					{ createdAt: { $lte: end } }
				]
			},
		});
		let listOrder = await strapi.db.query('api::order.order').findMany({
			select: ['price', 'created_at'],
			where: { state: 'complete' }
		});
		let all_money = listOrder.reduce((_sum, o) => _sum + o.price, 0)
		let new_money = listOrder.filter(f => f.createdAt > start).reduce((_sum, o) => _sum + o.price, 0)

		return { all_user, all_order, new_user, new_order, all_money, new_money };
	},
	async chartmoney(ctx) {
		let _time = moment()
		let rs = await strapi.db.connection.raw(
			`SELECT SUM(price) as total, DATE(created_at) DateOnly FROM orders 
			WHERE created_at >= ${_time.startOf('day').add(-30, 'days').format('YYYY-MM-DD')} and state = 'complete'
			GROUP BY DateOnly`);
		if (rs && rs.length > 0)
			return { data: rs[0] }
		return { data: [] }

	},
	async chartuser(ctx) {
		let _time = moment()
		let rs = await strapi.db.connection.raw(
			`SELECT COUNT(id) as total, DATE(created_at) DateOnly FROM up_users WHERE created_at >= ${_time.startOf('day').add(-15, 'days').format('YYYY-MM-DD')} GROUP BY DateOnly`);
		if (rs && rs.length > 0)
			return { data: rs[0] }
		return { data: [] }
	},
	async chartorder(ctx) {
		let _time = moment()
		let rs = await strapi.db.connection.raw(
			`SELECT COUNT(id) as total, DATE(created_at) DateOnly FROM orders WHERE created_at >= ${_time.startOf('day').add(-15, 'days').format('YYYY-MM-DD')} GROUP BY DateOnly`);
		if (rs && rs.length > 0)
			return { data: rs[0] }
		return { data: [] }
	},

	async getemail(ctx) {
		let { email } = ctx.query;
		let check = await strapi.db.query("plugin::users-permissions.user").findOne({
			select: ['*'],
			where: { email: email }
		});
		return check ? { data: true } : {}
	}

}));

const generateAccessToken = async () => {
	try {
		if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
			throw new Error("MISSING_API_CREDENTIALS");
		}

		const response = await axios.request({
			method: 'post',
			url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic QVQ0LVB4WnVlVkRuektOU3FEd0dHdXUwM1ROZlFKTkZoSnJlMXl6bXp1VnpLTWVmeWFzZDFFSFF4c0t3M3JuT3h5cEZTSlg3WFBueF95WEI6RUtiYnVRYWlEcWVRTjF2d2lCTEo3VjJOcGtSWktockdOUVBtWHlmYy1xRzN3VXdqWHNfTFZYTHltX2NrdDZpbFd3eFR3T2FDcUcwdkZVYWM='
			},
			data: qs.stringify({
				'grant_type': 'client_credentials'
			})
		})
		const data = await response.data;
		return data.access_token;
	} catch (error) {
		console.error("Failed to generate Access Token:", error);
	}
};

const createOrder = async (cart) => {
	let listUnit = []
	for (let i = 0; i < cart.length; i++) {
		listUnit.push({
			amount: {
				currency_code: "USD",
				value: cart[i]
			}
		})
	}

	const accessToken = await generateAccessToken();
	const url = `${paypalHost}/v2/checkout/orders`;
	const payload = {
		intent: "CAPTURE",
		purchase_units: listUnit
	};

	const response = await axios.request({
		method: 'post',
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`
		},
		data: JSON.stringify(payload)
	})

	return response.data;
};

/**
* Capture payment for the created order to complete the transaction.
* @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
*/
const captureOrder = async (orderID) => {
	const accessToken = await generateAccessToken();
	const url = `${paypalHost}/v2/checkout/orders/${orderID}/capture`;

	const response = await axios.request({
		method: 'post',
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`
		}
	})

	console.log(response.data)

	return response.data;
};
