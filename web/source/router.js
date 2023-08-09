
import Vue from 'vue'
import Router from 'vue-router'

function interopDefault(promise) {
  return promise.then(m => m.default || m)
}

const HomePage = () => interopDefault(import(/* webpackChunkName: "HomePage" */ './pages/home/index.vue'))
const AboutPage = () => interopDefault(import(/* webpackChunkName: "WorkPage" */ './pages/about/index.vue'))
// const InnovationPage = () => interopDefault(import(/* webpackChunkName: "InnovationPage" */ './pages/innovation/index.vue'))
const ContactPage = () => interopDefault(import(/* webpackChunkName: "ContactPage" */ './pages/contact/index.vue'))
const CategoryDetail = () => interopDefault(import(/* webpackChunkName: "WorkDetail" */ './pages/category/index.vue'))
const ProductDetail = () => interopDefault(import(/* webpackChunkName: "WorkDetail" */ './pages/product/index.vue'))
const UserCart = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/cart/index.vue'))
const Payment = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/payment/index.vue'))
const Order = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/order/index.vue'))
const Club = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/club/index.vue'))
const Customer = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/customer/index.vue'))
const Faq = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/faq/index.vue'))
const NasUser = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/nas-user/index.vue'))
const Place = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/place/index.vue'))
const ClubDetail = () => interopDefault(import(/* webpackChunkName: "WorkDetail" */ './pages/club/detail.vue'))
const BlogDetail = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/blog/index.vue'))
const Login = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/login/index.vue'))
const CallBackGoogle = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/login/google.vue'))
const CallBackFacebook = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/login/facebook.vue'))
const DashboardCrm = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/admin/index.vue'))
const UserCrm = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/admin/users/index.vue'))
const ProductCrm = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/admin/products/index.vue'))
const OrderCrm = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/admin/orders/index.vue'))
const ClubsCrm = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/admin/clubs/index.vue'))
const SupportsCrm = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/admin/cares/index.vue'))
const PlaceCrm = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/admin/places/index.vue'))
const DistributorCrm = () => interopDefault(import(/* webpackChunkName: "InnovationDetail" */ './pages/admin/distributor/index.vue'))

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
                path: '/dang-ky',
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
                path: '/ve-nas',
                component: AboutPage
            },
            {
                path: '/lien-he',
                component: ContactPage
            },
            {
                path: '/chuyen-muc/:id',
                component: CategoryDetail
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
                path: '/aura-club',
                component: Club
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
                path: '/thanh-vien-nas',
                component: NasUser
            },
            {
                path: '/thong-tin-mua-sam',
                component: Place
            },
            {
                path: '/club/:id',
                component: ClubDetail
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
                path: '/crm-admin/clubs',
                component: ClubsCrm
            },{
                path: '/crm-admin/supports',
                component: SupportsCrm
            },{
                path: '/crm-admin/places',
                component: PlaceCrm
            },
            {
                path: '/crm-admin/distributor',
                component: DistributorCrm
            }
        ]
    })
}