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
    },
    isPassword:{
        type:'interger',
        enum:[0,1]
    },
    isAvatar:{
        type:'interger',
        enum:[0,1]
    }
} 

module.exports = {
    registerSchema 
  };