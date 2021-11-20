const fp = require("fastify-plugin")
const db = require('./../models/index')
const BaseService = require('../controller/service')
module.exports = fp(async function(fastify, opts) {

  fastify.decorate("authenticate", async function(request, reply) {
    try {
     await request.jwtVerify();
     
     const {email} = request.user
     console.log(email)
     const datauser = await db.User.findOne({ where: { email } });
   
     if(!datauser){
      return reply.code(400).send(BaseService.ERROR(null ,"error"))
     }
     
    }catch (err) {
      reply.send(err)
    }
  })
})