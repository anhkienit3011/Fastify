const {timetraDevice  } = require('../DataModel/DataModel')
const { MESSAGEDEVICEMUON  }  = require('../Message/Message')
const {resSchema} = require('../Schema/resSchema')

  const DeviceMuon = {
    body: {
      type: 'object',
      required: ['id' ,'numberm' ,'timetra'],
      properties: {
        timetra: {
            ...timetraDevice.time,
            errorMessage: {
              _: MESSAGEDEVICEMUON.TIMEMUONDEVICE
            },
          },
       
          numberm:{
            ...timetraDevice.numberm,
            errorMessage: {  _:MESSAGEDEVICEMUON.NUMBERDEVICEM   },
          } ,
            id:{ 
                ...timetraDevice.id,
                errorMessage: {  _:MESSAGEDEVICEMUON.ID  },   
            },
    
      
      },
      additionalProperties: false,
    },
    response: resSchema.response,
  };


  module.exports = {
    DeviceMuon
  };