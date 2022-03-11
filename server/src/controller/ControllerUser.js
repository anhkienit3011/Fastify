
const boom = require("boom");
const db = require('./../models/index')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const BaseService = require('./service')
const fs = require('fs');
const Op = require('Sequelize').Op;
const register = async(req ,reply)=>{
   
    try {
      
    let { email, ten , password ,role ,avatar } = req.body;
    let base64Image = avatar.split(';base64,').pop();
    const time =  Date.now() +".png"
    fs.writeFileSync(`./src/uploads/${time}`, base64Image, {encoding: 'base64'}, function(err) {
      console.log('File created');
  });

    const datauser =  await db.User.findOne({ where: { email } });
   
     if(datauser){
        return  reply.code(500).send(BaseService.ERROR("Email đã tồn tại trong hệ thống" ,"emailerror"));
    }
        const hasspassword = await bcrypt.hash(password,saltRounds)
        await db.User.create({
            name:ten,
            email:email,
            password:hasspassword,
            avatar:time,
            role:role
        })
          return  reply.send(BaseService.SUCCESS("Tạo Thành Công User" ,"success"));
    } catch (err) {
        throw boom.boomify(err);  
    }
  
}

const getListUserDB = async(req,res)=>{
    try{
   const listUser = await db.User.findAll({
    attributes:["id","name" ,"email","role","avatar"]
   })
    return  res.send(BaseService.SUCCESS(listUser,null));

} catch (err) {
    throw boom.boomify(err);  
}
}

const getListUserDBcongty = async(req,res)=>{
    try{
   const listUser = await db.User.findAll({
    attributes:["id","name" ,"email","role","avatar"]
   })
    return  res.send(BaseService.SUCCESS(listUser,null));

} catch (err) {
    throw boom.boomify(err);  
}
}

const deleteUserDB = async(req ,reply)=>{
    try {
    let {id} = req.params;
    const email = req.user.email;
    const datadelete = await db.User.findOne({
        where: {
            id: id
         }
    }) 

    const datadevicem = await db.DeviceMuon.findOne({
        where: {
            UserId: id
         }
    })
  
    if(datadevicem){
        return  reply.code(500).send("errordelete");
    }

    const ttBECheck = await db.User.findOne({
        where:{
            email
        }
    })
    if(ttBECheck.id === datadelete.id){
        return  reply.code(500).send("errordeleteuser");
    }
     const datachat = await db.tableIdUserIdChat.findAll({
         where:{
            idUserChat:datadelete.id
         }
     })


      if(datachat){
          datachat.map(async(data)=>{
        await db.tableChat.destroy({
            where:{
                idRowUserChat:data.id
            }
        })
          
    })
     
    await db.tableIdUserIdChat.destroy({
        where:{
            idUserChat:datadelete.id
         }
    })

}

    const datachats = await db.tableIdUserIdChat.findAll({
        where:{
           idUserChat:datadelete.id
        }
    })

    //idUser

     if(datachats){
         datachats.map(async(data)=>{
            await db.tableChat.destroy({
                where:{
                    idRowUserChat:data.id
                }
            })
        })

        await db.tableIdUserIdChat.destroy({
            where:{
                idUserChat:datadelete.id
             }
        })
    }


     
    
     const image ="./src/uploads/" +datadelete.avatar
     fs.unlinkSync((image), err => {
      if (err) throw err;
     });
     await db.User.destroy({
      where: {
         id: id
     } })
    return  reply.send(BaseService.SUCCESS("Xóa User Thành Công" ,"success"));

} catch (error) {
    throw boom.boomify(err); 
}
  
    }

    
    const editUserDB = async(req ,res)=>{
        try {
            let {id} = req.params;
            const datauser =     await db.User.findOne({ 
                where: { id },
                attributes:["name" ,"role","avatar"]
             });
             return  res.send(BaseService.SUCCESS(datauser,null));
    
        } catch (err) {
            throw boom.boomify(err); 
        }
    }


    const updateUserDB = async(req, reply)=>{
      
        try {
            const {ten ,password , role , avatar} = req.body

     

            const {id} = req.params;
            if(ten.length<8){
                return  reply.code(500).send(BaseService.ERROR("Tên phải từ 8 kí tự trở lên " ,"tenerror"));
            }
            if(avatar  ===undefined  && password ===undefined  ){
                await db.User.update(
                    { 
                     name :ten,
                     role:role,

                     },
                    { where: { id} } )  
            }else if (avatar !=undefined  && password ===undefined  ){
                let base64Image = avatar.split(';base64,').pop();
                const time =  Date.now() +".png"
                fs.writeFileSync(`./src/uploads/${time}`, base64Image, {encoding: 'base64'}, function(err) {
                  console.log('File created');
              });

              const datadelete = await db.User.findOne({
                where: {
                    id: id
                 }
            })
        
            const image ="./src/uploads/" +datadelete.avatar

                await db.User.update(
                    { 
                     name :ten,
                     role:role,
                     avatar:time

                     },
                    { where: { id} } )  

        
                 
                   fs.unlinkSync((image), err => {
                     if (err) throw err;
                    });

            
            }else if (avatar  ===undefined  && password !=undefined  ){
                const hasspassword = await bcrypt.hash(password,saltRounds)
                if(password.length<8){
                    return  reply.code(500).send(BaseService.ERROR("Mật khẩu phải từ 8 kí tự trở lên " ,"passworderror"));
                }
                await db.User.update(
                    { 
                     name :ten,
                     role:role,
                     password: hasspassword

                     },
                    { where: { id} } ) 
                    

            }else{
                if(password.length<8){
                    return  reply.code(500).send(BaseService.ERROR("Mật khẩu phải từ 8 kí tự trở lên " ,"passworderror"));
                }
                let base64Image = avatar.split(';base64,').pop();
                const time =  Date.now() +".png"
                fs.writeFileSync(`./src/uploads/${time}`, base64Image, {encoding: 'base64'}, function(err) {
                  console.log('File created');
              });

              const datadelete = await db.User.findOne({
                where: {
                    id: id
                 }
            })
            const image ="./src/uploads/" +datadelete.avatar
            const hasspassword = await bcrypt.hash(password,saltRounds)
                await db.User.update(
                    { 
                     name :ten,
                     role:role,
                     password:hasspassword,
                     avatar:time
                     },
                    { where: { id} } ) 
                    fs.unlinkSync((image), err => {
                        if (err) throw err;
                       });
            }
            
            return  reply.send(BaseService.SUCCESS("Sửa User Thành Công" ,"success"));
        } catch (error) {
            throw boom.boomify(error); 
        }
    }



    const login = async(req,reply)=>{
        try {
            let { email, password } = req.body; 
            const datauser =  await db.User.findOne({ where: { email } });
            if(!datauser){
                return  reply.code(400).send(BaseService.ERROR("Tài khoản của bạn không đúng " ,"usererr"));
            }
           
            const passwordb =  datauser.password
            const isMatch = await bcrypt.compare(password ,passwordb )
            if(!isMatch) return reply.code(400).send(BaseService.ERROR("Tài khoản của bạn không đúng"  ,"usererr"))
            const accesstoken = createAccessToken({email})
        
            const data  = {
                msg:accesstoken,
                role:datauser.role,
                name:datauser.name,
                avatar:datauser.avatar
            }
            return  reply.code(200).send(BaseService.SUCCESS( null ,JSON.stringify( data)));
    
        } catch (err) {
            throw boom.boomify(err);  
        }
    
    
       
    }

     const searchUser  = async(req,res)=>{
        
        const data  = await db.User.findAll({
            where:{
                name:{ 
                [Op.like]:`%${req.body.nameseach}%`
              }
            }
        })
        return res.send({listUser:data})
 
     }

     const getUserLogin  = async (req ,res)=>{
        const {email} = req.user
         const data = await db.User.findOne({
             where:{
                 email
             }
         })
      
         return res.code(200).send(data)
     }
    
    const createAccessToken = (email) =>{
        return jwt.sign(email, "mabimat", {expiresIn: '7d'})
    }
    
module.exports = {
    register,
    getListUserDB,
    deleteUserDB,
    editUserDB,
    updateUserDB,
    login,
    searchUser,
    getUserLogin,
    getListUserDBcongty
  };