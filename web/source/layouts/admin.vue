<template>
  <a-layout id="layout" style="min-height: 100vh;" v-show="allow">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible width="250">
      <div class="logo">
        <NuxtLink to="/">
          <img class="admin-crm-logo" src="/images/logo.png" v-if="!collapsed" />
        </NuxtLink>
      </div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="0" @click="goPage('/crm-admin')"
          :class="$route.path === '/crm-admin' ? 'ant-menu-item-selected' : ''">
          <a-icon type="area-chart" />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="1" @click="goPage('/crm-admin/users')"
          :class="$route.path === '/crm-admin/users' ? 'ant-menu-item-selected' : ''">
          <a-icon type="user" />
          <span>Danh sách user</span>
        </a-menu-item>
        <a-menu-item key="2" @click="goPage('/crm-admin/products')"
          :class="$route.path === '/crm-admin/products' ? 'ant-menu-item-selected' : ''">
          <a-icon type="gift" />
          <span>Danh sách sản phẩm</span>
        </a-menu-item>
        <a-menu-item key="3" @click="goPage('/crm-admin/orders')"
          :class="$route.path === '/crm-admin/orders' ? 'ant-menu-item-selected' : ''">
          <a-icon type="carry-out" />
          <span>Quản lý đơn hàng</span>
        </a-menu-item>
        <a-menu-item key="4" @click="goPage('/crm-admin/shows')"
          :class="$route.path === '/crm-admin/shows' ? 'ant-menu-item-selected' : ''">
          <a-icon type="crown" />
          <span>Danh sách show</span>
        </a-menu-item>
        <a-menu-item key="6" @click="goPage('/crm-admin/menu')"
          :class="$route.path === '/crm-admin/menu' ? 'ant-menu-item-selected' : ''">
          <a-icon type="solution" />
          <span>Quản lý menu</span>
        </a-menu-item>
        <a-menu-item key="7" @click="goPage('/crm-admin/collections')"
          :class="$route.path === '/crm-admin/collections' ? 'ant-menu-item-selected' : ''">
          <a-icon type="solution" />
          <span>Quản lý bộ sưu tập</span>
        </a-menu-item>
        <a-menu-item key="8" @click="goPage('/crm-admin/places')"
          :class="$route.path === '/crm-admin/places' ? 'ant-menu-item-selected' : ''">
          <a-icon type="bank" />
          <span>Quản lý chi nhánh</span>
        </a-menu-item>
        <!-- <a-menu-item key="9" @click="goPage('/crm-admin/new-collections')"
          :class="$route.path === '/crm-admin/new-collections' ? 'ant-menu-item-selected' : ''">
          <a-icon type="bank" />
          <span>Chuyên mục tin tức</span>
        </a-menu-item> -->
        <a-menu-item key="10" @click="goPage('/crm-admin/news')"
          :class="$route.path === '/crm-admin/news' ? 'ant-menu-item-selected' : ''">
          <a-icon type="bank" />
          <span>Quản lý tin tức</span>
        </a-menu-item>
        <a-menu-item key="11" @click="goPage('/crm-admin/payment')"
          :class="$route.path === '/crm-admin/payment' ? 'ant-menu-item-selected' : ''">
          <a-icon type="bank" />
          <span>Quản lý thanh toán</span>
        </a-menu-item>
        <a-menu-item key="12" @click="goPage('/crm-admin/color')"
          :class="$route.path === '/crm-admin/color' ? 'ant-menu-item-selected' : ''">
          <a-icon type="bank" />
          <span>Quản lý màu</span>
        </a-menu-item>
        <a-menu-item key="13" @click="goPage('/crm-admin/size')"
          :class="$route.path === '/crm-admin/size' ? 'ant-menu-item-selected' : ''">
          <a-icon type="bank" />
          <span>Quản lý kích thước</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '14px 16px', padding: '24px', background: '#fff' }">
        <Nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"

export default {
  mixins: [general],
  computed: {
    ...mapGetters({
      profile: "auth/getProfile",
      loggedIn: "auth/getloggedIn"
    }),
  },
  data() {
    return {
      collapsed: false,
      allow: false
    };
  },
  // watch: { 
  //   '$route.params.search': {
  //     handler: function(search) {
  //       console.log(search)
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  async mounted() {
    await this.setLoggedIn()
    let rs = await this.getMyInfo()
    if (rs && rs.role && rs.role.type === 'admin') {
      this.allow = true
    } else {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    ...mapActions({
      setLoggedIn: "auth/setLoggedIn",
      userLogout: "auth/logout",
      getMyInfo: "auth/me"
    }),
    goPage(url) {
      this.$router.push({ path: this.localePath(url) })
    },
  }
};
</script>
  
<style>
#layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#layout .trigger:hover {
  color: #1890ff;
}

#layout .logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
}
.admin-crm-logo{
  max-height: 32px;
}
</style>