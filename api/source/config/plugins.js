module.exports = {
    'users-permissions': {
        config: {
          jwt: {
            expiresIn: '1y',
          },
          register: {
            allowedFields: ["brithday","phone"],
          },
        },
    },
    // 'google-auth': {
    //     enabled: true,
    // },
}