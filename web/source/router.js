
import Vue from 'vue'
import Router from 'vue-router'

function interopDefault(promise) {
  return promise.then(m => m.default || m)
}

const HomePage = () => interopDefault(import('./pages/home/index.vue'))
const AboutPage = () => interopDefault(import('./pages/about/index.vue'))
const ClientPage = () => interopDefault(import('./pages/client/index.vue'))
const Collection = () => interopDefault(import('./pages/collection/index.vue'))
const CollectionDetail = () => interopDefault(import('./pages/collection/detail.vue'))
const ProductDetail = () => interopDefault(import('./pages/product/index.vue'))
const UserCart = () => interopDefault(import('./pages/cart/index.vue'))
const Payment = () => interopDefault(import('./pages/payment/index.vue'))
const Order = () => interopDefault(import('./pages/order/index.vue'))
const News = () => interopDefault(import('./pages/news/index.vue'))
const NewsDetail = () => interopDefault(import('./pages/news/detail.vue'))
const Show = () => interopDefault(import('./pages/show/index.vue'))
const ShowDetail = () => interopDefault(import('./pages/show/detail.vue'))
const Customer = () => interopDefault(import('./pages/customer/index.vue'))
const Faq = () => interopDefault(import('./pages/faq/index.vue'))
const AccountUser = () => interopDefault(import('./pages/account/index.vue'))
const Place = () => interopDefault(import('./pages/place/index.vue'))
const SaveItem = () => interopDefault(import('./pages/saveItem/index.vue'))
const MyOrder = () => interopDefault(import('./pages/myorder/index.vue'))
const BlogDetail = () => interopDefault(import('./pages/blog/index.vue'))
const Login = () => interopDefault(import('./pages/login/index.vue'))
const CallBackGoogle = () => interopDefault(import('./pages/login/google.vue'))
const CallBackFacebook = () => interopDefault(import('./pages/login/facebook.vue'))
const DashboardCrm = () => interopDefault(import('./pages/admin/index.vue'))
const UserCrm = () => interopDefault(import('./pages/admin/users/index.vue'))
const ProductCrm = () => interopDefault(import('./pages/admin/products/index.vue'))
const OrderCrm = () => interopDefault(import('./pages/admin/orders/index.vue'))
const ShowCrm = () => interopDefault(import('./pages/admin/show/index.vue'))
const SupportsCrm = () => interopDefault(import('./pages/admin/cares/index.vue'))
const PlaceCrm = () => interopDefault(import('./pages/admin/places/index.vue'))
const MenuCrm = () => interopDefault(import('./pages/admin/menu/index.vue'))
const CollectionCrm = () => interopDefault(import('./pages/admin/collection/index.vue'))
const NewCollectionCrm = () => interopDefault(import('./pages/admin/newcategory/index.vue'))
const NewsCrm = () => interopDefault(import('./pages/admin/news/index.vue'))
const SizeCrm = () => interopDefault(import('./pages/admin/size/index.vue'))
const ColorCrm = () => interopDefault(import('./pages/admin/color/index.vue'))
const PaymentCrm = () => interopDefault(import('./pages/admin/payment/index.vue'))

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: HomePage
            },
            {
                path: '/dang-nhap',
                component: Login
            },
            {
                path: '/connect/google/redirect',
                component: CallBackGoogle
            },
            {
                path: '/connect/facebook/redirect',
                component: CallBackFacebook
            },
            {
                path: '/house-of-pdh',
                component: AboutPage
            },
            {
                path: '/client-service',
                component: ClientPage
            },
            {
                path: '/collection/:id',
                component: Collection
            },
            {
                path: '/collection/detail/:id',
                component: CollectionDetail
            },
            {
                path: '/san-pham/:id',
                component: ProductDetail
            },
            {
                path: '/gio-hang',
                component: UserCart
            },
            {
                path: '/thanh-toan',
                component: Payment
            },
            {
                path: '/don-hang',
                component: Order
            },
            {
                path: '/save-item',
                component: SaveItem
            },{
                path: '/my-order',
                component: MyOrder
            },
            {
                path: '/news',
                component: News
            },
            {
                path: '/show',
                component: Show
            },
            {
                path: '/show/:id',
                component: ShowDetail
            },
            {
                path: '/cham-soc-khach-hang',
                component: Customer
            },
            {
                path: '/faq',
                component: Faq
            },
            {
                path: '/account',
                component: AccountUser
            },
            {
                path: '/thong-tin-mua-sam',
                component: Place
            },
            {
                path: '/news/:id',
                component: NewsDetail
            },
            {
                path: '/blog/:id',
                component: BlogDetail
            },{
                path: '/crm-admin',
                component: DashboardCrm
            },{
                path: '/crm-admin/users',
                component: UserCrm
            },{
                path: '/crm-admin/products',
                component: ProductCrm
            },{
                path: '/crm-admin/orders',
                component: OrderCrm
            },{
                path: '/crm-admin/shows',
                component: ShowCrm
            },{
                path: '/crm-admin/supports',
                component: SupportsCrm
            },{
                path: '/crm-admin/places',
                component: PlaceCrm
            },{
                path: '/crm-admin/collections',
                component: CollectionCrm
            },{
                path: '/crm-admin/new-collections',
                component: NewCollectionCrm
            },{
                path: '/crm-admin/news',
                component: NewsCrm
            },{
                path: '/crm-admin/color',
                component: ColorCrm
            },{
                path: '/crm-admin/size',
                component: SizeCrm
            },{
                path: '/crm-admin/payment',
                component: PaymentCrm
            },{
                path: '/crm-admin/menu',
                component: MenuCrm
            }
        ]
    })
}