const controllers = require("../controller/ControllerThietBi");
const {createDevice} = require('../Validator/Validatordata/CreateDevice')
const {DeviceMuon} =  require('../Validator/Validatordata/MuonDevice')
const fp = require('fastify-plugin');

const status  = async (fastify) => {
 fastify.post( "/api/createdevice", {schema: createDevice , preValidation: [fastify.authenticate ,fastify.authencheckadmin]  } , controllers.createdevice);
 
 fastify.put( "/api/editedevice", {  preValidation: [fastify.authenticate ,fastify.authencheckadmin]  } , controllers.editedevice);
 fastify.get( "/api/listdevice" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.listdevice  )
 fastify.delete("/api/deletedevice/:id"  ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.deletedevice  )
 fastify.get( "/api/listdevicem"  ,{ preValidation: [fastify.authenticate] },controllers.listdevicemdevice  )
 fastify.post( "/api/devicemuonchoduyet", {schema: DeviceMuon , preValidation: [fastify.authenticate ]  },controllers.devicem  )
 fastify.get( "/api/listdevicechoduyet",{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.listdevicechekduyet  )

 fastify.get("/api/huylistdevicechoduyet/:id"  ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.huydevicechoduyet  )
 fastify.get("/api/dylistdevicechoduyet/:id"  ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.dydevicechoduyet  )

 
 fastify.get("/api/geteditdevice/:id"  ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.getEditDevice  )
 
 fastify.post("/api/searchdevice" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.searchDevice)
 
 fastify.get("/api/showdeviceyou" ,{ preValidation: [fastify.authenticate] },controllers.showtinhtrangthietbicuaban)
 fastify.post("/api/searchnhom" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.searchNhom)
 fastify.post("/api/createnhomthietbi" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.createnhomthietbi)
 
 
 fastify.get("/api/getnhomdivice" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.getnhomthietbi)
 fastify.get("/api/getnhomdivicem" ,{ preValidation: [fastify.authenticate ] },controllers.getnhomthietbim)
 fastify.delete("/api/deletenhomthietbi/:id" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.deletenhomthietbi)


 fastify.get("/api/editnhomthietbi/:id" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.getEditNhomThietBi)

 fastify.put("/api/updatenhomthietbi/:id" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.updateNhomThietBi)

 

 fastify.post("/api/searchdevicemuon" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.searchDevicemuon)

 fastify.post("/api/searchdevicechoduyet" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.searchDevicechoduyet)

 fastify.get("/api/listdevicedangmuon" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.listdevicedangmuon)



 fastify.post("/api/trathietbi" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.trathietbi)
 
 fastify.post("/api/searchthietbimuonthanhcong" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.searchthietbidangmuon)
 
 fastify.delete("/api/deletetingtrang/:id" ,{ preValidation: [fastify.authenticate ] },controllers.deletenopheduyet)
 

}


module.exports = fp(status);
