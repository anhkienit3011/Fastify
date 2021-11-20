const fastify = require("fastify")({
    logger: true,
  });
  const path = require("path")

  fastify.register(require("fastify-cors"), {
    origin: "*",
  });

  const Ajv = require("ajv")



 
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: 'array', // This line
    allErrors: true,
    formats: {date: true, time: true}
  })
  
require("ajv-errors")(ajv /*, {singleError: true} */)
require("ajv-formats")(ajv)
fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema)
})
fastify.setSchemaErrorFormatter((errors, dataVar) => {
  const payload = [];
  errors.forEach((error) => {
    payload.push({
      instancePath: error.instancePath ,
      message: error.message,
    });
  });
  return new Error(JSON.stringify(payload));
});

fastify.register(require("./src/middlware/Auth"))

fastify.register(require('fastify-jwt'), {
  secret:"mabimat"
})


    fastify.register(require('fastify-static'), { 
    root: path.join(__dirname, './src/uploads'),
    prefix: '/src/uploads/', // optional: default '/'
  })
  fastify.register(require('./src/router/User'));
  fastify.register(require('./src/router/Device'));
  const start = async () => {
    try {
      await fastify.listen(5000);
      fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  
  start();