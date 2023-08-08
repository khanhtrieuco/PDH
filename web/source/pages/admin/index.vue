<template>
  <div class="main-container">
    <a-row :gutter="16">
      <a-col :span="4">
        <a-statistic class="dashboard-number" title="Tổng User" :value="statistic.all_user" style="margin-right: 5px">
          <template #suffix>
            <a-icon type="usergroup-add" />
          </template>
        </a-statistic>
      </a-col>
      <a-col :span="4">
        <a-statistic class="dashboard-number" title="Tổng đơn hàng" :value="statistic.all_order"
          style="margin-right: 5px">
          <template #suffix>
            <a-icon type="bank" />
          </template>
        </a-statistic>
      </a-col>
      <a-col :span="4">
        <a-statistic class="dashboard-number" title="Tổng doanh thu" :value="formatPrice(statistic.all_money)"
          style="margin-right: 5px">
          <template #suffix>
            <a-icon type="dollar" />
          </template>
        </a-statistic>
      </a-col>
      <a-col :span="4">
        <a-statistic class="dashboard-number" title="User mới" :value="statistic.new_user" style="margin-right: 5px">
          <template #suffix>
            <a-icon type="user-add" />
          </template>
        </a-statistic>
      </a-col>
      <a-col :span="4">
        <a-statistic class="dashboard-number" title="Đơn hàng mới" :value="statistic.new_order"
          style="margin-right: 5px">
          <template #suffix>
            <a-icon type="book" />
          </template>
        </a-statistic>
      </a-col>
      <a-col :span="4">
        <a-statistic class="dashboard-number" title="Doanh thu mới" :value="formatPrice(statistic.new_money)"
          style="margin-right: 5px">
          <template #suffix>
            <a-icon type="smile" />
          </template>
        </a-statistic>
      </a-col>
    </a-row>
    <client-only>
      <div class="chart-panel-full">
        <div class="chart-title">Doanh thu 30 ngày gần nhất</div>
        <LineChart :data="chartDataMoney" style="width: 100%;height: 400px;" />
      </div>
      <div class="d-flex">
        <div class="chart-panel">
          <div class="chart-title">Đơn hàng 15 ngày gần nhất</div>
          <BarChart :data="chartDataOrder" style="width: 100%;height: 300px;" />
        </div>
        <div class="chart-panel">
          <div class="chart-title">Người dùng đăng ký 15 ngày gần nhất</div>
          <BarChart :data="chartDataUser" style="width: 100%;height: 300px;" />
        </div>
      </div>
    </client-only>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";
import general from "~/mixins/general";
import moment from "moment";

export default {
  mixins: [general],
  layout: "admin",
  data() {
    return {
      token: null,
      is_mobile: false,
      top_user: [],
      chartDataMoney: {},
      chartDataOrder: {},
      chartDataUser: {},
    }
  },
  computed: {
    ...mapGetters({
      statistic: "common/getStatistic",
      chatMoney: "common/getChartMoney",
      chatOrder: "common/getChartOrder",
      chatUser: "common/getChartUser",
    })
  },
  async mounted() {
    await this.getStatistic({
      query: `start=${moment().startOf('day').toISOString()}&end=${moment().endOf('day').toISOString()}`
    });
    this.loadDataMoney()
    this.loadDataOrder()
    this.loadDataUser()
  },
  methods: {
    ...mapActions({
      getStatistic: "common/getStatistic",
      getChartMoney: "common/getChartMoney",
      getChartOrder: "common/getChartOrder",
      getChartUser: "common/getChartUser",
    }),
    loadDataMoney: async function () {
      await this.getChartMoney()
      let newChart = {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: 'rgba(111,40,134, 0.3)',
            borderColor: 'rgba(111,40,134, 1)',
            borderWidth: 2,
          },
        ],
      }
      for (let i = 1; i < 31; i++) {
        let day = moment().add(-1 * i, 'day').format('YYYY-MM-DD')
        newChart.labels.push(day)
        let count = 0
        let _check = this.chatMoney.find(o => o.DateOnly === day)
        if (_check) {
          count = _check.total
        }
        newChart.datasets[0].data.push(count)
      }
      newChart.labels = newChart.labels.reverse()
      newChart.datasets[0].data = newChart.datasets[0].data.reverse()
      this.chartDataMoney = newChart
    },
    loadDataOrder: async function () {
      await this.getChartOrder()
      let newChartOrder = {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: 'rgba(20, 255, 0, 0.3)',
            borderColor: 'rgba(100, 255, 0, 1)',
            borderWidth: 2,
          },
        ],
      }
      for (let i = 1; i < 16; i++) {
        let day = moment().add(-1 * i, 'day').format('YYYY-MM-DD')
        newChartOrder.labels.push(day)
        let count = 0
        let _check = this.chatOrder.find(o => o.DateOnly === day)
        if (_check) {
          count = _check.total
        }
        newChartOrder.datasets[0].data.push(count)
      }
      newChartOrder.labels = newChartOrder.labels.reverse()
      newChartOrder.datasets[0].data = newChartOrder.datasets[0].data.reverse()
      this.chartDataOrder = newChartOrder
    },
    loadDataUser: async function () {
      await this.getChartUser()
      let newChart = {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: 'rgba(69,33,174, 0.3)',
            borderColor: 'rgba(69,33,174, 1)',
            borderWidth: 2,
          },
        ],
      }
      for (let i = 1; i < 16; i++) {
        let day = moment().add(-1 * i, 'day').format('YYYY-MM-DD')
        newChart.labels.push(day)
        let count = 0
        let _check = this.chatUser.find(o => o.DateOnly === day)
        if (_check) {
          count = _check.total
        }
        newChart.datasets[0].data.push(count)
      }
      newChart.labels = newChart.labels.reverse()
      newChart.datasets[0].data = newChart.datasets[0].data.reverse()
      this.chartDataUser = newChart
    },
  }
};
</script>
<style lang="scss" scoped>
.dashboard-number {
  border: 1px solid #777;
  border-radius: 3px;
  box-shadow: 1px 1px 2px 0 hsla(0, 0%, 5%, .31);
  box-sizing: border-box;
  padding: 20px;
}

.chart-panel-full {
  margin-top: 30px;
}

.chart-panel {
  margin-top: 30px;
  display: inline-block;
  width: 50%;
}

.chart-title {
  font-size: 20px;
  margin-bottom: 20px;
}
</style>