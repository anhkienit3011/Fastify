
const  controllers  = require('./../controller/Message')



const fp = require('fastify-plugin');
const status  = async (fastify) => {

fastify.post("/api/messages", { preValidation: [fastify.authenticate ] },  controllers.postMessage)
fastify.get("/api/messagechat/:id/:idchat", { preValidation: [fastify.authenticate] }, controllers.getMessage)


}
module.exports = fp(status);
