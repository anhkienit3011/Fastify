const controllers = require("../controller/ControllerUser");

const {RegisterUser} = require ("../Validator/Validatordata/RegisterUser" ) 
 const {LoginUser} =require("../Validator/Validatordata/LoginUser")
const fp = require('fastify-plugin');
const status  = async (fastify) => {

fastify.post( "/api/register", { schema:RegisterUser} ,  controllers.register )

fastify.get( "/api/listuser",controllers.getListUserDB)
fastify.delete( "/api/deleteuser/:id",controllers.deleteUserDB )
fastify.get( "/api/edituser/:id",controllers.editUserDB )
fastify.post( "/api/login", {schema:LoginUser} , controllers.login )
fastify.put( "/api/updateuser/:id" , controllers.updateUserDB )


}
module.exports = fp(status);
