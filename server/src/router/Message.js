
const  controllers  = require('./../controller/Message')



const fp = require('fastify-plugin');
const status  = async (fastify) => {

fastify.post("/api/messages",  controllers.postMessage)
fastify.get("/api/messagechat/:id/:idchat",  controllers.getMessage)


}
module.exports = fp(status);
