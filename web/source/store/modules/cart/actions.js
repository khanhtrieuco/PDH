import ApiService from '@/service/api.service'
import qs from 'qs';
export default {
    // getListCart: async ({ commit, rootState }, data = {}) => {
    //     const query = qs.stringify({
    //         ...data,
    //         sort: {
    //             id: 'desc'
    //         }
    //     });
    //     let res = await ApiService.request({
    //         method: 'get',
    //         url: `/api/carts?${query}`
    //     })
    //     commit('set_list_cart', {
    //         list_cart: res.data.filter(i => !i.attributes.order)
    //     })
    // },

    getListCart: async ({ commit, rootState }, data = {}) => {
        if (window.localStorage) {
            let listCart = window.localStorage.getItem('listCartCheckout');
            if (listCart) {
                listCart = JSON.parse(listCart)
                commit('set_list_cart', {
                    list_cart: listCart
                })
            }
        }
    },

    getListCartUser: async ({ commit, rootState }, data = {}) => {
        if (window.localStorage) {
            let listCart = window.localStorage.getItem('listCart');
            if (listCart) {
                listCart = JSON.parse(listCart)
                commit('set_list_user_cart', {
                    list_user_cart: listCart
                })
            }
        }
    },

    setListCart: async ({ commit, rootState }, data = {}) => {
        if (window.localStorage) {
            window.localStorage.setItem('listCart',JSON.stringify(data));
            window.localStorage.setItem('listCartCheckout',JSON.stringify(data));
            commit('set_list_cart', {
                list_cart: data
            })
        }
    },

    createCart: async function ({ commit }, data) {
        let res = await ApiService.request({
            method: "post",
            url: "/api/carts",
            data: data
        });
        return res
    },

    resetUserCart: async function ({ commit }, data) {
        window.localStorage.setItem('listCartCheckout', []);
        window.localStorage.setItem('listCart',[]);
        commit('set_list_user_cart', { list_user_cart: [] })
        commit('set_list_cart', { list_cart: [] })
    },

    addCartItem: ({ commit, rootState }, data = {}) => {
        if (window.localStorage) {
            let listCart = window.localStorage.getItem('listCart');
            if (listCart) {
                listCart = JSON.parse(listCart)
                let checkProduct = listCart.find(o => o.id === data.id)
                if (checkProduct) {
                    for (let i = 0; i < listCart.length; i++) {
                        if (listCart[i].id === checkProduct.id) {
                            listCart[i].quantity += data.quantity ? data.quantity : 1
                        }
                    }
                } else {
                    listCart.push({
                        id: data.id,
                        imagelink: data.imagelink,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        quantity: data.quantity ? data.quantity : 1
                    })
                }
                window.localStorage.setItem('listCart', JSON.stringify(listCart));
                commit('set_list_cart', {
                    list_cart: listCart
                })
            } else {
                listCart = [{
                    id: data.id,
                    imagelink: data.imagelink,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    quantity: data.quantity ? data.quantity : 1
                }]
                window.localStorage.setItem('listCart', JSON.stringify(listCart));
                commit('set_list_cart', {
                    list_cart: listCart
                })
            }
        }
    },

    addCartItemDirect: ({ commit, rootState }, data = {}) => {
        if (window.localStorage) {
            let listCart = window.localStorage.getItem('listCartCheckout');
            if (listCart) {
                listCart = JSON.parse(listCart)
                let checkProduct = listCart.find(o => o.id === data.id)
                if (checkProduct) {
                    for (let i = 0; i < listCart.length; i++) {
                        if (listCart[i].id === checkProduct.id) {
                            listCart[i].quantity += data.quantity ? data.quantity : 1
                        }
                    }
                } else {
                    listCart.push({
                        id: data.id,
                        imagelink: data.imagelink,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        quantity: data.quantity ? data.quantity : 1
                    })
                }
                window.localStorage.setItem('listCartCheckout', JSON.stringify(listCart));
                commit('set_list_user_cart', {
                    list_user_cart: listCart
                })
            } else {
                listCart = [{
                    id: data.id,
                    imagelink: data.imagelink,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    quantity: data.quantity ? data.quantity : 1
                }]
                window.localStorage.setItem('listCartCheckout', JSON.stringify(listCart));
                commit('set_list_user_cart', {
                    list_user_cart: listCart
                })
            }
        }
        if (window.localStorage) {
            let listCart = window.localStorage.getItem('listCart');
            if (listCart) {
                listCart = JSON.parse(listCart)
                let checkProduct = listCart.find(o => o.id === data.id)
                if (checkProduct) {
                    for (let i = 0; i < listCart.length; i++) {
                        if (listCart[i].id === checkProduct.id) {
                            listCart[i].quantity += data.quantity ? data.quantity : 1
                        }
                    }
                } else {
                    listCart.push({
                        id: data.id,
                        imagelink: data.imagelink,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        quantity: data.quantity ? data.quantity : 1
                    })
                }
                window.localStorage.setItem('listCart', JSON.stringify(listCart));
                commit('set_list_cart', {
                    list_cart: listCart
                })
            } else {
                listCart = [{
                    id: data.id,
                    imagelink: data.imagelink,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    quantity: data.quantity ? data.quantity : 1
                }]
                window.localStorage.setItem('listCart', JSON.stringify(listCart));
                commit('set_list_cart', {
                    list_cart: listCart
                })
            }
        }
    },

    setCartCheckoutItem: ({ commit, rootState }, data = {}) => {
        commit('set_list_cart', {
            list_cart: data.listCheckout
        })
        if (window.localStorage) {
            window.localStorage.setItem('listCartCheckout', JSON.stringify(data.listCheckout));
            let listCart = window.localStorage.getItem('listCart');
            if(listCart){
                // listCart = JSON.parse(listCart)
                // let _temp = listCart.filter(f=> !data.listCheckout.find(o=>o.id === f.id))
                // window.localStorage.setItem('listCart', JSON.stringify(_temp));
                // commit('set_list_user_cart', {
                //     list_user_cart: _temp
                // })

                window.localStorage.setItem('listCart', JSON.stringify(data.listCheckout));
                commit('set_list_user_cart', {
                    list_user_cart: data.listCheckout
                })
            }
        }
    }

}