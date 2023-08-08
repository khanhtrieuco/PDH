<template>
    <div class="admin-user-container">
        <a-table :columns="columns" :data-source="listUser" bordered>
            <span slot="blocked" slot-scope="blocked">
                <a-tag color="red" v-if="blocked">Deleted</a-tag>
                <a-tag color="green" v-else>Active</a-tag>
            </span>
            <span slot="orders" slot-scope="orders">
                {{ orders ? orders.length : 0 }}
            </span>
            <span slot="address" slot-scope="address">
                <div v-if="address">
                    <div>Tên người nhận: {{ address.name }}</div>
                    <div>Số điện thoại: {{ address.phone }}</div>
                    <div>Email: {{ address.email }}</div>
                    <div>Địa chỉ: {{ address.full_address }}</div>
                </div>
            </span>
            <span slot="action" slot-scope="text, record">
                <!-- <a-button class="admin-btn" type="primary">Cập nhật</a-button> -->
                <a-button @click="activeProduct(record.id)" class="admin-btn" ghost type="danger" v-if="record?.blocked">Khôi phục</a-button>
                <a-button @click="deletedProduct(record.id)" class="admin-btn" type="danger" v-else>Xoá</a-button>
            </span>
        </a-table>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
//   import general from "~/mixins/general";
//   import moment from "moment";

export default {
    layout: "admin",
    data() {
        return {
            columns : [
                {
                    title: 'Tên khách hàng',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                },
                {
                    title: 'Số điện thoại',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: 'Trạng thái',
                    dataIndex: 'blocked',
                    key: 'blocked',
                    scopedSlots: { customRender: 'blocked' },
                },
                {
                    title: 'Địa chỉ',
                    dataIndex: 'address',
                    key: 'address',
                    scopedSlots: { customRender: 'address' },
                },
                {
                    title: 'Số đơn hàng',
                    dataIndex: 'orders',
                    key: 'orders',
                    scopedSlots: { customRender: 'orders' },
                },
                {
                    title: 'Ngày tạo',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                },
                {
                    title: 'Action',
                    key: 'action',
                    scopedSlots: { customRender: 'action' },
                },
            ]
        };
    },
    computed: {
        ...mapGetters({
            listUser: "user/getListUser"
        })
    },
    mounted() {
        this.loadData();
    },
    methods: {
        ...mapActions({
            getListUser: "user/getListUser",
            updateUser: "user/updateUser"
        }),
        loadData: async function () {
            await this.getListUser()
        },
        activeProduct: async function(id) {
            let _data = {
                blocked: false
            }
            let rs = await this.updateUser({
                id,
                data: _data
            })
            this.loadData()
            if(rs) {
                this.$message.success('Active khách hàng thành công');
            } else {
                this.$message.error('Active khách hàng thất bại');
            }
        },
        deletedProduct: async function(id) {
            let _data = {
                blocked: true
            }
            let rs = await this.updateUser({
                id,
                data: _data
            })
            this.loadData()
            if(rs) {
                this.$message.success('Xoá khách hàng thành công');
            } else {
                this.$message.error('Xoá khách hàng thất bại');
            }
        },
        //   goProfile(alias_link) {
        //     let href = new URL(`${window.location.href}/${alias_link}`);
        //     // href.searchParams.set("profile", uuid);
        //     window.location.href = href.toString();
        //     // this.$router.push(`/profile/${uuid}`);
        //   }
    }
};
</script>
<style lang="less" scoped></style>