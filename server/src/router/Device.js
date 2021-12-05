const controllers = require("../controller/ControllerThietBi");
const {createDevice} = require('../Validator/Validatordata/CreateDevice')
const {DeviceMuon} =  require('../Validator/Validatordata/MuonDevice')
const fp = require('fastify-plugin');

const status  = async (fastify) => {
 fastify.post( "/api/createdevice", {schema: createDevice } , controllers.createdevice);
 fastify.get( "/api/listdevice" ,controllers.listdevice  )
 fastify.delete("/api/deletedevice/:id"  ,controllers.deletedevice  )
 fastify.get( "/api/listdevicem"  ,controllers.listdevicemdevice  )
 fastify.post( "/api/devicemuonchoduyet", {schema: DeviceMuon , preValidation: [fastify.authenticate]  },controllers.devicem  )
 fastify.get( "/api/listdevicechoduyet"  ,controllers.listdevicechekduyet  )

 fastify.put("/api/huylistdevicechoduyet/:id"  ,controllers.huydevicechoduyet  )
 fastify.put("/api/dylistdevicechoduyet/:id"  ,controllers.dydevicechoduyet  )


 
 fastify.post("/api/searchdevice" ,{ preValidation: [fastify.authenticate] },controllers.searchDevice)
 
 fastify.get("/api/showdeviceyou" ,{ preValidation: [fastify.authenticate] },controllers.showtinhtrangthietbicuaban)
 fastify.post("/api/searchnhom" ,{ preValidation: [fastify.authenticate] },controllers.searchNhom)
 fastify.post("/api/createnhomthietbi" ,{ preValidation: [fastify.authenticate] },controllers.createnhomthietbi)
 
 
 fastify.get("/api/getnhomdivice" ,{ preValidation: [fastify.authenticate] },controllers.getnhomthietbi)
 fastify.delete("/api/deletenhomthietbi/:id" ,{ preValidation: [fastify.authenticate] },controllers.deletenhomthietbi)


 fastify.get("/api/editnhomthietbi/:id" ,{ preValidation: [fastify.authenticate] },controllers.getEditNhomThietBi)

 fastify.put("/api/updatenhomthietbi/:id" ,{ preValidation: [fastify.authenticate] },controllers.updateNhomThietBi)

 

 fastify.post("/api/searchdevicemuon" ,{ preValidation: [fastify.authenticate] },controllers.searchDevicemuon)

 fastify.post("/api/searchdevicechoduyet" ,{ preValidation: [fastify.authenticate] },controllers.searchDevicechoduyet)

 fastify.get("/api/listdevicedangmuon" ,{ preValidation: [fastify.authenticate] },controllers.listdevicedangmuon)

 
 
}

module.exports = fp(status);
