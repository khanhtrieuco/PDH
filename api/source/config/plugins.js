module.exports = ({ env }) => ({
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
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            // type: "OAuth2",
            user: 'trieuqk@gmail.com',
            pass: env('MAILKEY')
          },
        },
        settings: {
          defaultFrom: 'trieuqk@gmail.com',
          defaultReplyTo: 'trieuqk@gmail.com',
        },
      },
    },
    // 'google-auth': {
    //     enabled: true,
    // },
})