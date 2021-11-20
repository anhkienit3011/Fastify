


const boom = require("boom");
const db = require('./../models/index')
const fs = require('fs')
const moment = require ("moment") ;
const Op = require('Sequelize').Op;
const BaseService = require('./service')
const sequelize = require('sequelize');


const createdevice = async(req,res)=>{
   
    const {   device_name , device_quantity , giadevice ,imagedevice } =req.body
  
    let base64Image = imagedevice.split(';base64,').pop();
    const time =  Date.now() +".png"
    fs.writeFileSync(`./src/uploads/${time}`, base64Image, {encoding: 'base64'}, function(err) {
      console.log('File created');
  });
    try{
      await db.Device.create({
        namedevice:device_name,
        quantitydevice:device_quantity,
        imgdevice :time ,
        soluongconlai:device_quantity,
        tienthietbi :giadevice
    })
   
    return  res.code(201).send({
        msg:"Tạo thiết bị thành công",
     
      });
  
    }catch (err) {
       throw boom.boomify(err);
     }
    }


  const listdevice = async(req,res)=>{
  
    try {
     
      const listdata =   await db.Device.findAll({ });
  
      return  res.code(200).send({
        msg:listdata,
      });
  
    } catch (error) {
      throw boom.boomify(err);
    }
  }
  
  const deletedevice =async(req,res)=>{


    try{
     const id = req.params.id
     const data =  await db.Device.findOne({ where: { id } });
    //  if(devicechoduyet.length  >0  || deviceduyet.length >0) {
   
    // return  res.code(400).send({
    //    msg:"Vẫn còn người mượn thiết bị nên không thể xóa được",
     
    //  });
    // }
   
     await db.Device.destroy({
       where: {
          id: id
       }
    }) 
    const image ="./src/uploads/" +data.imgdevice
   
    fs.unlinkSync((image), err => {
     if (err) throw err;
   });
    return  res.code(201).send({
     msg:"Xóa thiết bị thành công",
   
   });
    }catch (err) {
    
     throw boom.boomify(err);
   }
   
   }

   const listdevicemdevice = async(req,res)=>{

    try {
      const listdata =   await db.Device.findAll({
  
        where:{
          quantitydevice:{ [Op.gt]: 0,  } 
        }
  
       });
  
      return  res.code(200).send({
        msg:listdata,
      });
  
    } catch (error) {
      throw boom.boomify(err);
    }
  }


  const devicem = async(req , res)=>{
  
    try{
      const {id , numberm ,timetra } = req.body
      const email =  req.user.email
      const informationUser =  await db.User.findOne({ where: {email } });
      const iduser = informationUser.id
  
     const datemuon = moment(timetra).format("YYYY-MM-DD")
  
   if( datemuon.slice(0,4) < (new Date().getFullYear())  )
   return  res.code(500).send(BaseService.ERROR( "Thời gian trả phải lớn hơn thời gian hiện tại " ,"errtime"));
  
  
  if((datemuon.slice(0,4) == (new Date().getFullYear()))  && ( datemuon.slice(5,7) == (new Date().getMonth()+1))  && ( datemuon.slice(8,10) < new Date().getDate()) ){
    return  res.code(500).send(BaseService.ERROR( "Thời gian trả phải lớn  hơn  thời gian hiện tại " ,"errtime"));
     
   }else if((datemuon.slice(0,4) == (new Date().getFullYear()))  && ( datemuon.slice(5,7) < (new Date().getMonth() +1)) )  {
    return  res.code(500).send(BaseService.ERROR( "Thời gian trả phải lớn  hơn thời gian hiện tại " ,"errtime"));
  }
  
      const data =  await db.Device.findOne({ where: { id:id } });
      const numbermaxdevice = data.quantitydevice
      if(   numberm >    numbermaxdevice)
        return  res.code(500).send(BaseService.ERROR( "Tổng thiết bị bạn mượn phải nhỏ hơn hoặc bằng thiết bị hiện có của công ty ","errnumber"))
  
      await db.DeviceMuon.create({
        USERid:iduser,
        numberm:numberm,
        DeviceId:id,
        datetra: datemuon
       })
     
       const quantitydeviceconlai = data.quantitydevice - numberm
       
       await db.Device.update({
  
        soluongconlai: quantitydeviceconlai
    },
    { where: { id} } )
  
  
    return  res.send(BaseService.SUCCESS( null ,"Mượn thành công"));
  
    }catch (err) {
       throw boom.boomify(err);
     }
  }
     module.exports = {
        createdevice,
        listdevice,
        deletedevice,
        listdevicemdevice,
        devicem
      };