import { Store } from 'vuex'

import commonModule from './modules/common'
import bannerModule from './modules/banner'
import orderModule from './modules/order'
import productModule from './modules/product'
import clubModule from './modules/club'
import categoryModule from './modules/category'
import collectionModule from './modules/collection'
import cartModule from './modules/cart'
import authModule from './modules/auth'
import newCategoryModule from './modules/new_category'
import newsModule from './modules/news'
import supportModule from './modules/support'
import faqModule from './modules/faq'
import userModule from './modules/user'
import likeModule from './modules/like'
import placeModule from './modules/place'
import paymentModule from './modules/payment'
import shippingModule from './modules/shipping'

const createStore = () => {
    return new Store({
        namespaced: true,
        modules: {
            common: commonModule,
            banner: bannerModule,
            order: orderModule,
            product: productModule,
            club: clubModule,
            category: categoryModule,
            collection: collectionModule,
            cart: cartModule,
            auth: authModule,
            newCategory: newCategoryModule,
            news: newsModule,
            support: supportModule,
            faq: faqModule,
            user: userModule,
            like: likeModule,
            place: placeModule,
            payment: paymentModule,
            shipping: shippingModule,
        }
    })
}

export default createStore