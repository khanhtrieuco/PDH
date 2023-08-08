export default {
    set_siteinfo(state, payload) {
        state.siteinfo = payload.siteinfo;
    },
    set_nasinfo(state, payload) {
        state.nasinfo = payload.nasinfo;
    },
    set_bannerinfo(state, payload) {
        state.bannerinfo = payload.bannerinfo;
    },
    set_statistic(state, payload) {
        state.statistic = payload.statistic;
    },
    set_chart_money(state, payload) {
        state.chartMoney = payload.chartMoney;
    },
    set_chart_order(state, payload) {
        state.chartOrder = payload.chartOrder;
    },
    set_chart_user(state, payload) {
        state.chartUser = payload.chartUser;
    },
};
