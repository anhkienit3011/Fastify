const registerSchema = {
    ten:{
        type: 'string',
        minLength: 8,
        maxLength: 30,
    },
    email:{
        type: 'string',
        minLength: 15,
        maxLength: 100,
        format:"email"
       
    },
    password:{
        type: 'string',
        minLength: 8,
        maxLength: 20,
    },
    avatar:{
        type: 'string',
        minLength: 20,
    },role:{
        type:'string',
        enum:['Admin','User']
    }
}



const CreateDeviceSchema ={
  
    device_name:{
        type:"string",
        minLength:5
       },
    device_quantity:{
        type: 'number',
        minimum: 1
    },
    imagedevice:{
        type:"string",
        minLength:5
    },
    giadevice:{
        type: 'number',
        minimum: 1
    }
   }




   const timetraDevice = {
    time:{
        type:"string",
        format: "date",
    },
    numberm:{
        type: 'number',
        minimum: 1 
    },
    id:{
        type: 'integer',
    }
}



module.exports = {
    registerSchema ,
    CreateDeviceSchema,
    timetraDevice
  };