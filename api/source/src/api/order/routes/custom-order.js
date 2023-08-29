module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/app/createorder', 
      handler: 'apporder.create'
    },
    {
      method: 'POST',
      path: '/app/deletelike', 
      handler: 'apporder.deletelike'
    },
    {
      method: 'POST',
      path: '/app/approveOrder', 
      handler: 'apporder.approveOrder'
    },
    {
      method: 'POST',
      path: '/app/upload', 
      handler: 'apporder.upload'
    },
    {
      method: 'GET',
      path: '/app/statistic', 
      handler: 'apporder.statistic'
    },
    {
      method: 'GET',
      path: '/app/chartmoney', 
      handler: 'apporder.chartmoney'
    },
    {
      method: 'GET',
      path: '/app/chartuser', 
      handler: 'apporder.chartuser'
    },
    {
      method: 'GET',
      path: '/app/chartorder', 
      handler: 'apporder.chartorder'
    }
  ]
}