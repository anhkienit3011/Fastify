const {registerSchema} = require('../DataModel/DataModel')
const {MESSAGEREGISTER }  = require('../Message/Message')
const {resSchema} = require('../Schema/resSchema')
const UpdateUser = {
    body: {
      type: 'object',
      required: ['isPassword',"isAvatar"],
      if: {
        properties: {
            isPassword: {
            enum: [0],
            errorMessage: {
              _: '',
            },
          },
          isAvatar: {
            enum: [0],
            errorMessage: {
              _: '',
            },
          },
        },
      },
      then: {
        required: ['ten','role'],
        properties: {
            ten: {
                ...registerSchema.ten,
                errorMessage: {
                  _: MESSAGEREGISTER.NAME,
                },
              },
            role: {
                ...registerSchema.role,
                errorMessage: {
                  _:MESSAGEREGISTER.ROLE,
                },
              },
      },
    },
    // if: {
    //     properties: {
    //         isPassword: {
    //         enum: [1],
    //         errorMessage: {
    //           _: '',
    //         },
    //       },
    //       isAvatar: {
    //         enum: [0],
    //         errorMessage: {
    //           _: '',
    //         },
    //       },
    //     },
    //   },
    //   then: {
    //     required: ['ten','role' ,"password"],
    //     properties: {
    //         ten: {
    //             ...registerSchema.ten,
    //             errorMessage: {
    //               _: MESSAGEREGISTER.NAME,
    //             },
    //           },
    //         role: {
    //             ...registerSchema.role,
    //             errorMessage: {
    //               _:MESSAGEREGISTER.ROLE,
    //             },
    //           },
    //           password: {
    //             ...registerSchema.password,
    //             errorMessage: {
    //               _: MESSAGEREGISTER.PASSWORD,
    //             },
    //           },
    //   },
    // },
    // if: {
    //     properties: {
    //         isPassword: {
    //         enum: [0],
    //         errorMessage: {
    //           _: '',
    //         },
    //       },
    //       isAvatar: {
    //         enum: [1],
    //         errorMessage: {
    //           _: '',
    //         },
    //       },
    //     },
    //   },
    //   then: {
    //     required: ['ten','role',"avatar"],
    //     properties: {
    //         ten: {
    //             ...registerSchema.ten,
    //             errorMessage: {
    //               _: MESSAGEREGISTER.NAME,
    //             },
    //           },
    //         role: {
    //             ...registerSchema.role,
    //             errorMessage: {
    //               _:MESSAGEREGISTER.ROLE,
    //             },
    //           },
    //            avatar: {
    //       ...registerSchema.avatar,
    //       errorMessage: {
    //         _: MESSAGEREGISTER.AVATAR,
    //       },
    //     },
    //   },
    // },  if: {
    //     properties: {
    //         isPassword: {
    //         enum: [1],
    //         errorMessage: {
    //           _: '',
    //         },
    //       },
    //       isAvatar: {
    //         enum: [1],
    //         errorMessage: {
    //           _: '',
    //         },
    //       },
    //     },
    //   },
    //   then: {
    //     required: ['ten','role',"avatar","password"],
    //     properties: {
    //         ten: {
    //             ...registerSchema.ten,
    //             errorMessage: {
    //               _: MESSAGEREGISTER.NAME,
    //             },
    //           },
    //         role: {
    //             ...registerSchema.role,
    //             errorMessage: {
    //               _:MESSAGEREGISTER.ROLE,
    //             },
    //           },
    //            avatar: {
    //       ...registerSchema.avatar,
    //       errorMessage: {
    //         _: MESSAGEREGISTER.AVATAR,
    //       },
    //     },
    //     password: {
    //         ...registerSchema.password,
    //         errorMessage: {
    //           _: MESSAGEREGISTER.PASSWORD,
    //         },
    //       },
    //   },
    // },
      additionalProperties: false,
    },
    response: resSchema.response,
  }
  
  module.exports = {
    UpdateUser
  }
  