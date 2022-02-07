const controllers = require("../controller/ControllerUser");

const {RegisterUser} = require ("../Validator/Validatordata/RegisterUser" ) 
 const {LoginUser} =require("../Validator/Validatordata/LoginUser")
const fp = require('fastify-plugin');
const status  = async (fastify) => {

fastify.post("/api/register", { schema:RegisterUser , preValidation: [fastify.authenticate ,fastify.authencheckadmin] } ,  controllers.register )

fastify.get( "/api/listuser",{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.getListUserDB)
fastify.delete( "/api/deleteuser/:id",{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.deleteUserDB )
fastify.get( "/api/edituser/:id",{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.editUserDB )
fastify.post( "/api/login", {schema:LoginUser} , controllers.login )
fastify.put( "/api/updateuser/:id" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] }, controllers.updateUserDB )

fastify.post("/api/searchuser" ,{ preValidation: [fastify.authenticate ,fastify.authencheckadmin] },controllers.searchUser)

fastify.get("/api/informationUserLogin" ,{ preValidation: [fastify.authenticate ] },controllers.getUserLogin)
fastify.get( "/api/listusercongty",{ preValidation: [fastify.authenticate ] },controllers.getListUserDBcongty)

}
module.exports = fp(status);
