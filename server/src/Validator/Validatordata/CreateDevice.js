const { CreateDeviceSchema} = require('../DataModel/DataModel')
const { MESSAGECREATEDEVICE  }  = require('../Message/Message')
const {resSchema} = require('../Schema/resSchema')

  const createDevice = {
    body: {
      type: 'object',
      required: ['device_name','device_quantity','imagedevice','giadevice'],
      properties: {
        device_name: {
            ...CreateDeviceSchema.device_name,
            errorMessage: {
              _: MESSAGECREATEDEVICE.NAMEDEVICE,
            },
          },
          device_quantity: {
          ...CreateDeviceSchema.device_quantity,
          errorMessage: {
            _: MESSAGECREATEDEVICE.QUANTITYDEVICE,
          },
        },
        imagedevice: {
          ...CreateDeviceSchema.imagedevice,
          errorMessage: {
            _: MESSAGECREATEDEVICE.IMAGEDEVICE,
          },
        },
        giadevice: {
            ...CreateDeviceSchema.giadevice,
            errorMessage: {
              _: MESSAGECREATEDEVICE.TIENDEVICE,
            },
          },
      },
      additionalProperties: false,
    },
    response: resSchema.response,
  };


  module.exports = {
   
    createDevice
  };
  