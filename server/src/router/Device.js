const controllers = require("../controller/ControllerThietBi");
const {createDevice} = require('../Validator/Validatordata/CreateDevice')
const {DeviceMuon} =  require('../Validator/Validatordata/MuonDevice')
const fp = require('fastify-plugin');

const status  = async (fastify) => {
 fastify.post( "/api/createdevice", {schema: createDevice } , controllers.createdevice);
 fastify.get( "/api/listdevice" ,controllers.listdevice  )
 fastify.delete(  "/api/deletedevice/:id"  ,controllers.deletedevice  )
 fastify.get( "/api/listdevicem"  ,controllers.listdevicemdevice  )
 fastify.post( "/api/devicemuonchoduyet", {schema: DeviceMuon , preValidation: [fastify.authenticate]  },controllers.devicem  )
}

module.exports = fp(status);
