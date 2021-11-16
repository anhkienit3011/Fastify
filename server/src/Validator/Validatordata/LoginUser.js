const {registerSchema} = require('../DataModel/DataModel')
const {MESSAGEREGISTER }  = require('../Message/Message')
const {resSchema} = require('../Schema/resSchema')

const LoginUser = {
    body: {
      type: 'object',
      required: ['email','password'],
      properties: {
        email: {
            ...registerSchema.email,
            errorMessage: {
              _: MESSAGEREGISTER.EMAIL,
            },
          },
          password: {
            ...registerSchema.password,
            errorMessage: {
              _: MESSAGEREGISTER.PASSWORD,
            },
          },
      },
      additionalProperties: false,
    },
    response: resSchema.response,
  };

  module.exports = {
    LoginUser
  };
  