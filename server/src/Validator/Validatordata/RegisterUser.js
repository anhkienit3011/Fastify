const {registerSchema} = require('../DataModel/DataModel')
const {MESSAGEREGISTER }  = require('../Message/Message')
const {resSchema} = require('../Schema/resSchema')
const RegisterUser = {
    body: {
      type: 'object',
      required: ['ten','email','password','role','avatar'],
      properties: {
       ten: {
            ...registerSchema.ten,
            errorMessage: {
              _: MESSAGEREGISTER.NAME,
            },
          },
        email: {
          ...registerSchema.email,
          errorMessage: {
            _: MESSAGEREGISTER.EMAIL,
          },
        },
      avatar: {
          ...registerSchema.avatar,
          errorMessage: {
            _: MESSAGEREGISTER.AVATAR,
          },
        },
        password: {
          ...registerSchema.password,
          errorMessage: {
            _: MESSAGEREGISTER.PASSWORD,
          },
        },
        role: {
            ...registerSchema.role,
            errorMessage: {
              _:MESSAGEREGISTER.ROLE,
            },
          },
      },
      additionalProperties: false,
    },
    response: resSchema.response,
  };

  module.exports = {
    RegisterUser
  };
  