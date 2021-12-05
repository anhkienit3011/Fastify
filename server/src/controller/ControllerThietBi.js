


const boom = require("boom");
const db = require('./../models/index')
const fs = require('fs')
const moment = require ("moment") ;
const Op = require('Sequelize').Op;
const BaseService = require('./service')
const sequelize = require('sequelize');


const createnhomthietbi  = async(req,res)=>{
  try {
    const {  nhomdevice,thoigianmuontoidata } = req.body

    const data = await db.Nhomthietbi.findOne({ where:{Name : nhomdevice }})
  
    const numberthang = Number(thoigianmuontoidata)
    if(nhomdevice.length <5){
      return res.status(400).send({msg:"Tên nhóm thiết bị phải lớn hơn 5 kí tự"})
    }
    if(numberthang <1 ||numberthang >12){
      return res.status(400).send({msg:"Thời gian mượn nhóm thiết bị  nhỏ nhất là 1 thàng và nhiều nhất là 12 tháng"})
    }

    if(data){
      return res.status(400).send({msg:"Tên nhóm thiết bị đã tồn tại trong hệ thống"})
    }

    await db.Nhomthietbi.create({
      Name: nhomdevice,
      timetoida: thoigianmuontoidata
    })
   return res.send({msg:"Tạo nhóm thiết bị thành công"})
  } catch (error) {
    throw boom.boomify(error);
  }
}

const getnhomthietbi = async(req,res)=>{
  try {
    const data =await  db.Nhomthietbi.findAll({})
    return res.send(data)
  } catch (error) {
    throw boom.boomify(error);
  }
}

const deletenhomthietbi =  async(req,res)=>{
  try {
    const {id} = req.params
    await  db.Nhomthietbi.destroy({where :{id :id }})
    return res.send({msg:"Xóa Thành Công Nhóm Thiết Bị"});
  } catch (error) {
    throw boom.boomify(error);
  }
}

const getEditNhomThietBi = async(req,res)=>{
  try {
    const {id} = req.params
    const data = await  db.Nhomthietbi.findOne({where :{id :id }})
    return res.send(data);

  } catch (error) {
    throw boom.boomify(error);
  }
}


const updateNhomThietBi = async(req,res)=>{

  try {
    const {id} =req.params
    const {Name , timetoida} = req.body
    const time = Number(timetoida)
    await  db.Nhomthietbi.update(
    { Name:Name,
      timetoida:time},
      {where :{id :id }})
    return res.send({msg:"Sua thanh cong nhom thiet bi"});

  } catch (error) {
    throw boom.boomify(error);
  }

}

const searchNhom = async(req,res)=>{
  const data  = await db.Nhomthietbi.findAll({
    where:{
      Name:{ 
        [Op.like]:`%${req.body.nameseach}%`
      }
    }
})
return res.send({listNhom:data})
}
const createdevice = async(req,res)=>{
   
    const { device_name , device_quantity , giadevice ,imagedevice ,idnhoma} =req.body
    if(idnhoma ===0){
      return  res.code(500).send(BaseService.ERROR("Vui lòng chọn nhóm thiết bị","msgnhom"));
    }
   
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
        tienthietbi :giadevice,
        NhomthietbiId :idnhoma
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
     
      const listdata =   await db.Device.findAll();

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
          soluongconlai:{ [Op.gt]: 0,  } 
        }
  
       });
  
      return  res.code(200).send({
        msg:listdata,
      });
  
    } catch (error) {
      throw boom.boomify(err);
    }
  }
  
  const searchDevicemuon = async(req,res)=>{
    const {nameseach , nhom}  = req.body
    const numbernhom = Number(nhom)
    let data = null
    if(numbernhom === 0){ 
     data  = await db.Device.findAll({
      where:{
        namedevice:{ 
          [Op.like]:`%${nameseach}%`
        },
        soluongconlai:{
          [Op.gt]: 0
        }
      }
    })
  } else{
    data  = await db.Device.findAll({
      where:{
        namedevice:{ 
          [Op.like]:`%${nameseach}%`
        },
        soluongconlai:{
          [Op.gt]: 0
        },
       NhomthietbiId:{ 
          [Op.eq]:numbernhom
        }
      }
    })
  }
    return res.send({listDevice:data})
  }

  const searchDevicechoduyet = async(req,res)=>{
    const {nameseach , nhom}  = req.body
    const numbernhom = Number(nhom)
    let data = null
    if(numbernhom === 0){ 
     data  = await db.DeviceMuon.findAll({

      include: [{
        model: db.Device,
        where:{
          namedevice:{ 
            [Op.like]:`%${nameseach}%`
          },
         
        },
       
      }]

    })
  } else{
    data  = await db.DeviceMuon.findAll({
      include: [{
        model: db.Device,
        where:{
          namedevice:{ 
            [Op.like]:`%${nameseach}%`
          },
          NhomthietbiId:{ 
            [Op.eq]:numbernhom
          }
        }
          
      }]
    })
  }
    return res.send({listDevice:data})
  }



  const devicem = async(req , res)=>{
  
    try{
      const {id , numberm ,timetra } = req.body
      const email =  req.user.email
 
     
     const datemuon = moment(timetra).format("YYYY-MM-DD")
     const timeMax = await db.Device.findOne({  where:{id} ,
   include: [{
      model:db.Nhomthietbi,
      attributes:["timetoida"]
  }],
})  

     const momentmax = moment().add(timeMax.Nhomthietbi.timetoida, 'months');
     const formatdate = momentmax.format("YYYY-MM-DD")
   
     const times =(new Date(formatdate)).getTime()
      const timestra  =   (new Date(timetra)).getTime()
     if(times < timestra){
      return  res.code(500).send(BaseService.ERROR( ` Thiết bị này bạn có thể mượn tối đa ${timeMax.Nhomthietbi.timetoida}  tháng ` ,"errtimemuon"));
  
     }

  
   if( datemuon.slice(0,4) < (new Date().getFullYear())  )
   return  res.code(500).send(BaseService.ERROR( "Thời gian trả phải lớn hơn thời gian hiện tại " ,"errtime"));
  
  
  if((datemuon.slice(0,4) == (new Date().getFullYear()))  && ( datemuon.slice(5,7) == (new Date().getMonth()+1))  && ( datemuon.slice(8,10) < new Date().getDate()) ){
    return  res.code(500).send(BaseService.ERROR( "Thời gian trả phải lớn  hơn  thời gian hiện tại " ,"errtime"));
     
   }else if((datemuon.slice(0,4) == (new Date().getFullYear()))  && ( datemuon.slice(5,7) < (new Date().getMonth() +1)) )  {
    return  res.code(500).send(BaseService.ERROR( "Thời gian trả phải lớn  hơn thời gian hiện tại " ,"errtime"));
  }
  
      const data =  await db.Device.findOne({ where: { id:id } });
      const numbermaxdevice = data.soluongconlai
      if(   numberm >    numbermaxdevice)
        return  res.code(500).send(BaseService.ERROR( "Tổng thiết bị bạn mượn phải nhỏ hơn hoặc bằng thiết bị hiện có của công ty ","errnumber"))
  
      await db.DeviceMuon.create({
        email:email,
        numberm:numberm,
        DeviceId:id,
        datetra: datemuon,
        trangthai:0
       })
     
       const quantitydeviceconlai = data.soluongconlai - numberm
       
       await db.Device.update({
  
        soluongconlai: quantitydeviceconlai
    },
    { where: { id} } )
  
  
    return  res.send(BaseService.SUCCESS( null ,"Mượn thành công"));
  
    }catch (err) {
       throw boom.boomify(err);
     }
  }


  const listdevicechekduyet  = async(req,res)=>{
   
    try {
      const listdata =   await db.DeviceMuon.findAll(
    { 
      where:{
        trangthai: {
          [Op.eq]:0
          
        } ,
      },
       include: [{
        model:db.Device,
        attributes:["imgdevice" ,"namedevice"]
    }],
    
    });
     
      return  res.code(200).send({
     
        msg:listdata,
      });
  
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  const searchDevice = async(req,res)=>{
    const {nameseach , nhom}  = req.body
    const numbernhom = Number(nhom)
    let data = null
    if(numbernhom === 0){ 
     data  = await db.Device.findAll({
      where:{
        namedevice:{ 
          [Op.like]:`%${nameseach}%`
        }
      }
    })
  } else{
    data  = await db.Device.findAll({
      where:{
        namedevice:{ 
          [Op.like]:`%${nameseach}%`
        },
       NhomthietbiId:{ 
          [Op.eq]:numbernhom
        }
      }
    })
  }
    return res.send({listDevice:data})

  }

  const huydevicechoduyet = async(req,res)=>{
try {
  const id = req.params.id
  const datamuon = await  db.DeviceMuon.findOne({where:{id}})
  const datam =datamuon.numberm
  const idhuy = datamuon.DeviceId 
  const datadevice= await db.Device.findOne({where:{id:idhuy}})

  await db.Device.update({
    soluongconlai: (datadevice.soluongconlai + datam)},{where: { id:idhuy} 
  })
  
   await db.DeviceMuon.update( {trangthai:2 } ,{where: { id } });
   return res.send({msg:"Từ chối thành công "})
  
} catch (error) {
  
}
  }

  const dydevicechoduyet= async(req,res)=>{
    try {
      const id = req.params.id
       await db.DeviceMuon.update( {trangthai:1 } ,{where: { id } });
       return res.send({msg:"Duyệt thành công "})
      
    } catch (error) {
      
    }
      }


      const showtinhtrangthietbicuaban= async(req,res)=>{
        try {
          const email =  req.user.email
          const data =    await db.DeviceMuon.findAll( {where: { email} ,
            include: [{
              model:db.Device,
              attributes:["imgdevice" ,"namedevice"]
          }],
           });
          
          return res.send( data )
        } catch (error) {
          
        }
          }

      const listdevicedangmuon  = async(req,res)=>{

        try {

          const data =  await db.DeviceMuon.findAll({
           where:{
            trangthai:{
              [Op.eq]: 2
            }
           },
            include: [{
            model:db.Device,
            attributes:["imgdevice" ,"namedevice","tienthietbi"]
        }],
           });
          
          return res.send( data )
          
        } catch (error) {
          
        }
        
      }


     module.exports = {
        createdevice,
        listdevice,
        deletedevice,
        listdevicemdevice,
        devicem,
        listdevicechekduyet,
        huydevicechoduyet,
        dydevicechoduyet,
        showtinhtrangthietbicuaban,
        createnhomthietbi,
        getnhomthietbi,
        deletenhomthietbi,
        getEditNhomThietBi,
        updateNhomThietBi,
        searchNhom,
        searchDevice,
        searchDevicemuon,
        searchDevicechoduyet,
        listdevicedangmuon
      };