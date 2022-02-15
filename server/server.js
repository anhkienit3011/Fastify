const fastify = require("fastify")({
  logger: true,
});
const path = require("path")

fastify.register(require("fastify-cors"), {
  origin: "*",
});

const Ajv = require("ajv")
const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: 'array', // This line
  allErrors: true,
  formats: {
      date: true,
      time: true
  }
})

require("ajv-errors")(ajv /*, {singleError: true} */ )
require("ajv-formats")(ajv)
fastify.setValidatorCompiler(({
  schema,
  method,
  url,
  httpPart
}) => {
  return ajv.compile(schema)
})
fastify.setSchemaErrorFormatter((errors, dataVar) => {
  const payload = [];
  errors.forEach((error) => {
      payload.push({
          instancePath: error.instancePath,
          message: error.message,
      });
  });
  return new Error(JSON.stringify(payload));
});

fastify.register(require("./src/middlware/Auth"))
fastify.register(require("./src/middlware/CheckRole"))
fastify.register(require('fastify-jwt'), {
  secret: "mabimat"
})
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, './src/uploads'),
  prefix: '/src/uploads/', // optional: default '/'
})
fastify.register(require('./src/router/User'));
fastify.register(require('./src/router/Device'));
fastify.register(require('./src/router/Message'));
// cronjob
const nodemailer = require('nodemailer')
const {
  google
} = require('googleapis')
const CLIENT_ID = '108700255244-j1nejv58it5t3qrs7cn38jtp6ms5b9ci.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFEST_TOKEN = '1//04T5ELVp_XHLyCgYIARAAGAQSNwF-L9IrCudoP_eaVYwm47hrIehQ097Wbtf6FoTZBuuhAMoBLhjy3axgAKXz17ikDRvV3x1u8rU'
const cron = require('cron');
const db = require('./src/models/index')
const Op = require('Sequelize').Op;


const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({
  refresh_token: REFEST_TOKEN
});
google.options({
  auth: oAuth2Client
});




async function sendMail() {
   
  const accessToken = new Promise((resolve, reject) => {
    oAuth2Client.getAccessToken((err, token) => {
        if (err) console.log(err); // Handling the errors
        else resolve(token);
    });
  });
  
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'muadongyeuthuong3x@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFEST_TOKEN,
        accessToken: accessToken,
    },
  });
  
  const datasendEmailpush = []
  const datasendemail = await db.DeviceMuon.findAll({
      where: {
          datetra: {
              [Op.eq]: new Date("2022-02-17")
          }
      },
      include: [{
              model: db.User,
              attributes: ["email"],
          },
          {
              model: db.Device,
              attributes: ["namedevice"]
          }
      ],

  })
  datasendemail.forEach(data => {

      const itemSendEamil = {
          email: data.User.email,
          numberm: data.numberm,
          namedevice: data.Device.namedevice,
          timetra : data.datetra
      }
      datasendEmailpush.push(itemSendEamil)
  })
  datasendEmailpush.forEach(async data => {
      let mailOptions = {
          from: 'muadongyeuthuong3x@gmail.com',
          to: data.email,
          subject: 'Công ty công nghệ số việt Nam',
          text: 'Đến ngày trả thiết bị ',
          html: `Thiết bị ${namedevice} số lượng ${numberm} ngày ${timetra} sẽ hết thời gian mượn thiết bị của bạn . Bạn vui lòng cầm đến công ty trả thiết bị đúng hạn`,
      };
      const result = await transport.sendMail(mailOptions);
      return result
  })

}
const job = new cron.CronJob({
  cronTime: '00 44 22 * * 0-6',
  onTick: function() {
      sendMail()
          .then(() => console.log('Email sent oke'))
          .catch((error) => console.log(error.message));
  },
  start: true,
  timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
});

job.start();
//end 
const start = async () => {
  try {
      await fastify.listen(5000);
      fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
      fastify.log.error(err);
      process.exit(1);
  }
};

start();