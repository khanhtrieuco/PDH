const { createCoreController } = require('@strapi/strapi').factories;
const moment = require('moment');

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
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

		if (!address.name) {
			return { message: 'Không tìm thấy thông tin địa chỉ người nhận' };
		}
		if (listProductItem && listProductItem.length > 0) {
			let listCartId = []
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
				pick_date,
				end_date,
				discount_price: 0,
				cod: payment_type === 'cod' ? total_price + priceShip : 0,
				cartitems: listCartId,
				products: listProductId,
				variants: listVariantId,
				user: user?.id
			}
			let res = await strapi.entityService.create('api::order.order', { data: _order });

			ctx.send({ data: { ...res, productName } });
		}
		return { message: 'Không tìm thấy thông tin giỏ hàng' };
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
		return check ? { data : true } : { }
	}

}));
