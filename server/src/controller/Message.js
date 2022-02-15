
const boom = require("boom");
const db = require('./../models/index')
const fs = require('fs')
const Op = require('Sequelize').Op;
const moment = require("moment");


const postMessage = async (req,res)=>{
    try {
        
        const {userid , userChat , text , createdAt } = req.body
        const data = {
            idUserChat :userid ,textChat: text , createdAt
        }
        let idchat=null;
        
        const time =  moment(createdAt).format("YYYY-MM-DD hh:mm:ss");
        const timeVN = moment(time).add(7, ' hour');
       console.log(time)
    
        const TH1 =   await db.tableIdUserIdChat.findOne({ where: { idUser: userid , idUserChat :userChat  } });
        if(TH1 !=null){
             idchat = TH1.id
        }
        const TH2 =   await db.tableIdUserIdChat.findOne({ where: { idUser: userChat , idUserChat :userid  } });
   
        if(TH2 !=null){
             idchat = TH2.id
             
        }
        if(idchat === null){ 
       const createTableChat = await db.tableIdUserIdChat.create({
            idUser:userid,
            idUserChat:userChat
        })
        
        idchat = createTableChat.id
    }

       await db.tableChat.create({
        idRowUserChat:idchat,
        textChat:text,
        idUserChat:userid,
        createdAt:time
        })
      
        return  res.send({ data  });
    } catch (error) {
        throw boom.boomify(error);  
    }
   
}

const getMessage  = async(req,res)=>{
    const {id , idchat} = req.params
    try {
       const TH1 = await db.tableIdUserIdChat.findOne({ where: { idUser: id , idUserChat :idchat  } });

       if(TH1 !=null){
         const data =   await db.tableChat.findAll({
               where:{
                idRowUserChat  : TH1.id
               }
           })
       return res.send(data)
   }

   const TH2 = await db.tableIdUserIdChat.findOne({ where: { idUser: idchat, idUserChat :id  } });

   if(TH2 !=null){
     const data =   await db.tableChat.findAll({
           where:{
            idRowUserChat  : TH2.id
           }
       })
   return res.send(data)
}

    if (TH2 === null && TH1===null){
        return res.send(null)
    }



    } catch (error) {
        throw boom.boomify(error);
    }
}

module.exports = {

    postMessage,
    getMessage



}