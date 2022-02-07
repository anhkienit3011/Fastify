const fp = require("fastify-plugin")
const db = require('./../models/index')
const BaseService = require('../controller/service')
module.exports = fp(async function(fastify, opts) {
  fastify.decorate("authencheckadmin", async function(request, reply ) {
    try {
      
     const {email} = request.user
     const datauser =  await db.User.findOne({ where: { email } });
     console.log(datauser)
     if(datauser.role==="User"){
      return reply.code(400).send(BaseService.ERROR(null ,"errorrole"))
     }
     
     
    }catch (err) {
      reply.send(err)
    }
  })
})
