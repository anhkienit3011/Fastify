const boom = require("boom");
const db = require("./../models/index");
const fs = require("fs");
const moment = require("moment");
const Op = require("Sequelize").Op;
const BaseService = require("./service");
const sequelize = require("sequelize");

const createnhomthietbi = async(req, res) => {
    try {
        const { nhomdevice, thoigianmuontoidata } = req.body;

        const data = await db.Nhomthietbi.findOne({ where: { Name: nhomdevice } });

        const numberthang = Number(thoigianmuontoidata);
        if (nhomdevice.length < 5) {
            return res
                .status(400)
                .send({ msg: "Tên nhóm thiết bị phải lớn hơn 5 kí tự" });
        }
        if (numberthang < 1 || numberthang > 12) {
            return res.status(400).send({
                msg: "Thời gian mượn nhóm thiết bị  nhỏ nhất là 1 thàng và nhiều nhất là 12 tháng",
            });
        }

        if (data && data.Name === nhomdevice) {
            return res
                .status(400)
                .send({ msg: "Tên nhóm thiết bị đã tồn tại trong hệ thống" });
        }

        await db.Nhomthietbi.create({
            Name: nhomdevice,
            timetoida: thoigianmuontoidata,
        });
        return res.send({ msg: "Tạo nhóm thiết bị thành công" });
    } catch (error) {
        throw boom.boomify(error);
    }
};

const getnhomthietbi = async(req, res) => {
    try {
        const data = await db.Nhomthietbi.findAll({});
        return res.send(data);
    } catch (error) {
        throw boom.boomify(error);
    }
};

const getnhomthietbim = async(req, res) => {
    try {
        const data = await db.Nhomthietbi.findAll({});
        return res.send(data);
    } catch (error) {
        throw boom.boomify(error);
    }
};

const deletenhomthietbi = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await db.Nhomthietbi.findOne({
            where: {
                id
            }
        })
        const deviceconhom = await db.Device.findOne({
            where: {
                NhomthietbiId: data.id
            }
        })
        if (deviceconhom) {
            return res.code(400).send({ msg: "Thiết bị trong nhóm vẫn còn không thể xóa " })
        }
        await db.Nhomthietbi.destroy({ where: { id: id } });
        return res.send({ msg: "Xóa Thành Công Nhóm Thiết Bị" });
    } catch (error) {
        throw boom.boomify(error);
    }
};

const getEditNhomThietBi = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await db.Nhomthietbi.findOne({ where: { id: id } });
        return res.send(data);
    } catch (error) {
        throw boom.boomify(error);
    }
};

const updateNhomThietBi = async(req, res) => {
    try {
        const { id } = req.params;
        const { Name, timetoida } = req.body;
        const time = Number(timetoida);
        const data = await db.Nhomthietbi.findOne({ where: { Name } });
        if (Name.length < 5) {
            return res
                .status(400)
                .send({ msg: "Tên nhóm thiết bị phải lớn hơn 5 kí tự" });
        }
        if (time < 1 || time > 12) {
            return res.status(400).send({
                msg: "Thời gian mượn nhóm thiết bị  nhỏ nhất là 1 thàng và nhiều nhất là 12 tháng",
            });
        }

        if (data.Nhomthietbi === Name && data.id === id) {
            return res
                .status(400)
                .send({ msg: "Tên nhóm thiết bị đã tồn tại trong hệ thống" });
        }
        await db.Nhomthietbi.update({ Name: Name, timetoida: time }, { where: { id: id } });
        return res.send({ msg: "Sua thanh cong nhom thiet bi" });
    } catch (error) {
        throw boom.boomify(error);
    }
};

const searchNhom = async(req, res) => {
    const data = await db.Nhomthietbi.findAll({
        where: {
            Name: {
                [Op.like]: `%${req.body.nameseach}%`,
            },
        },
    });
    return res.send({ listNhom: data });
};
const createdevice = async(req, res) => {
    const { device_name, device_quantity, giadevice, imagedevice, idnhoma } =
    req.body;
    if (idnhoma === 0) {
        return res
            .code(500)
            .send(BaseService.ERROR("Vui lòng chọn nhóm thiết bị", "msgnhom"));
    }

    let base64Image = imagedevice.split(";base64,").pop();
    const time = Date.now() + ".png";
    fs.writeFileSync(
        `./src/uploads/${time}`,
        base64Image, { encoding: "base64" },
        function(err) {
            console.log("File created");
        }
    );
    try {
        await db.Device.create({
            namedevice: device_name,
            quantitydevice: device_quantity,
            imgdevice: time,
            soluongconlai: device_quantity,
            tienthietbi: giadevice,
            NhomthietbiId: idnhoma,
        });

        return res.code(201).send({
            msg: "Tạo thiết bị thành công",
        });
    } catch (err) {
        throw boom.boomify(err);
    }
};

const editedevice = async(req, res) => {

    const { device_name, device_quantity, giadevice, imagedevice, idnhoma, id } =
    req.body;
    const dataedit = await db.Device.findOne({ where:{id}})
  
    if(device_name.length <5 || device_name.length >100){
        return res
        .code(500)
        .send(BaseService.ERROR(`Tên thiết bị có độ dài từ 5 đến 100 kí tự `, "tendevice"));
       }

    if(device_quantity <1){
        return res
        .code(500)
        .send(BaseService.ERROR(`số lượng thiết bị sửa phải lớn hơn 0`, "soluongdevice"));
       }

    if( ( dataedit.quantitydevice - dataedit.soluongconlai) >device_quantity){
        return res
        .code(500)
        .send(BaseService.ERROR(`Không thể sửa nhỏ hơn ${dataedit.quantitydevice - dataedit.soluongconlai} thiết bị đang mượn `, "msgdevice"));
    }
  

   if(giadevice <0){
    return res
    .code(500)
    .send(BaseService.ERROR(`Giá thiết bị phải lớn 1  `, "giadevice"));
   }
   const dataconlai = (dataedit.quantitydevice-device_quantity < 0 ? dataedit.soluongconlai- (dataedit.quantitydevice-device_quantity) : dataedit.soluongconlai + (device_quantity-dataedit.quantitydevice ) )
    try {
        if (idnhoma === 0) {
            return res
                .code(500)
                .send(BaseService.ERROR("Vui lòng chọn nhóm thiết bị", "msgnhom"));
        }
        if (imagedevice === null) {
            await db.Device.update({
                namedevice: device_name,
                quantitydevice: device_quantity,
                soluongconlai: dataconlai,
                tienthietbi: giadevice,
                NhomthietbiId: idnhoma,
            }, { where: { id } });

        } else {
            let base64Image = imagedevice.split(";base64,").pop();
            const time = Date.now() + ".png";
            fs.writeFileSync(
                `./src/uploads/${time}`,
                base64Image, { encoding: "base64" },
                function(err) {
                    console.log("File created");
                }
            );
            
            const imageold= "./src/uploads/" + dataedit.imgdevice;

            fs.unlinkSync(imageold, (err) => {
                if (err) throw err;
            });
            await db.Device.update({
                namedevice: device_name,
                quantitydevice: device_quantity,
                imgdevice: time,
                soluongconlai: dataconlai,
                tienthietbi: giadevice,
                NhomthietbiId: idnhoma,
            }, { where: { id } });
        }




        return res.code(201).send({
            msg: "Sửa thiết bị thành công",
        });
    } catch (err) {
        throw boom.boomify(err);
    }
};

const listdevice = async(req, res) => {
    try {
        const listdata = await db.Device.findAll();

        return res.code(200).send({
            msg: listdata,
        });
    } catch (error) {
        throw boom.boomify(err);
    }
};

const deletedevice = async(req, res) => {
    try {
        const id = req.params.id;
        const datamuon = await db.DeviceMuon.findOne({where:{	DeviceId : id}})
        if(datamuon !=null){
            return res.code(400).send({
                msg: "errordelete",
            });
        }

        const data = await db.Device.findOne({where:{id}})
        await db.Device.destroy({
            where: {
                id: id,
            },
        });
        const image = "./src/uploads/" + data.imgdevice;

        fs.unlinkSync(image, (err) => {
            if (err) throw err;
        });
        return res.code(201).send({
            msg: "Xóa thiết bị thành công",
        });
    } catch (err) {
        throw boom.boomify(err);
    }
};

const getEditDevice = async(req, res) => {
    try {
        const id = req.params.id
        const data = await db.Device.findOne({
            where: { id },
            include: [{
                model: db.Nhomthietbi,
                attributes: ["Name"],
            }]
        });
        return res.code(200).send({ data })

    } catch (error) {
        throw boom.boomify(err);

    }
}

const listdevicemdevice = async(req, res) => {
    try {
        const listdata = await db.Device.findAll({
            where: {
                soluongconlai: {
                    [Op.gt]: 0
                },
            },
        });

        return res.code(200).send({
            msg: listdata,
        });
    } catch (error) {
        throw boom.boomify(err);
    }
};

const searchDevicemuon = async(req, res) => {
    const { nameseach, nhom } = req.body;
    const numbernhom = Number(nhom);
    let data = null;
    if (numbernhom === 0) {
        data = await db.Device.findAll({
            where: {
                namedevice: {
                    [Op.like]: `%${nameseach}%`,
                },
                soluongconlai: {
                    [Op.gt]: 0,
                },
            },
        });
    } else {
        data = await db.Device.findAll({
            where: {
                namedevice: {
                    [Op.like]: `%${nameseach}%`,
                },
                soluongconlai: {
                    [Op.gt]: 0,
                },
                NhomthietbiId: {
                    [Op.eq]: numbernhom,
                },
            },
        });
    }
    return res.send({ listDevice: data });
};

const searchDevicechoduyet = async(req, res) => {
    const { nameseach, nhom } = req.body;
    const numbernhom = Number(nhom);
    let data = null;
    if (numbernhom === 0) {
        data = await db.DeviceMuon.findAll({
            include: [{
                model: db.Device,
                where: {
                    namedevice: {
                        [Op.like]: `%${nameseach}%`,
                    },
                }},
                {
                    model: db.User,
                    
                }
             ],
             where:{
                trangthai: {
                    [Op.eq]: 0,
                },
             }
        });
    } else {
        data = await db.DeviceMuon.findAll({
            include: [
                {
                model: db.Device,
                where: {
                    namedevice: {
                        [Op.like]: `%${nameseach}%`,
                    },
                    NhomthietbiId: {
                        [Op.eq]: numbernhom,
                    },
                },
            }, 
            {
                model: db.User,
                
            }
        ],
        where:{
            trangthai: {
                [Op.eq]: 0,
            }}
        });
    }
    return res.send({ listDevice: data });
};

const devicem = async(req, res) => {
    try {
        const { id, numberm, timetra } = req.body;
        const email = req.user.email;

        const datemuon = moment(timetra).format("YYYY-MM-DD");
        const timeMax = await db.Device.findOne({
            where: { id },
            include: [{
                model: db.Nhomthietbi,
                attributes: ["timetoida"],
            }, ],
        });

        const momentmax = moment().add(timeMax.Nhomthietbi.timetoida, "months");
        const formatdate = momentmax.format("YYYY-MM-DD");

        const times = new Date(formatdate).getTime();
        const timestra = new Date(timetra).getTime();
        if (times < timestra) {
            return res
                .code(500)
                .send(
                    BaseService.ERROR(
                        ` Thiết bị này bạn có thể mượn tối đa ${timeMax.Nhomthietbi.timetoida}  tháng `,
                        "errtimemuon"
                    )
                );
        }

        if (datemuon.slice(0, 4) < new Date().getFullYear())
            return res
                .code(500)
                .send(
                    BaseService.ERROR(
                        "Thời gian trả phải lớn hơn thời gian hiện tại ",
                        "errtime"
                    )
                );

        if (
            datemuon.slice(0, 4) == new Date().getFullYear() &&
            datemuon.slice(5, 7) == new Date().getMonth() + 1 &&
            datemuon.slice(8, 10) < new Date().getDate()
        ) {
            return res
                .code(500)
                .send(
                    BaseService.ERROR(
                        "Thời gian trả phải lớn  hơn  thời gian hiện tại ",
                        "errtime"
                    )
                );
        } else if (
            datemuon.slice(0, 4) == new Date().getFullYear() &&
            datemuon.slice(5, 7) < new Date().getMonth() + 1
        ) {
            return res
                .code(500)
                .send(
                    BaseService.ERROR(
                        "Thời gian trả phải lớn  hơn thời gian hiện tại ",
                        "errtime"
                    )
                );
        }

        const data = await db.Device.findOne({ where: { id: id } });
        const ttUser = await db.User.findOne({
            where: { email:email },
        });
        const numbermaxdevice = data.soluongconlai;
        if (numberm > numbermaxdevice)
            return res
                .code(500)
                .send(
                    BaseService.ERROR(
                        "Tổng thiết bị bạn mượn phải nhỏ hơn hoặc bằng thiết bị hiện có của công ty ",
                        "errnumber"
                    )
                );

        await db.DeviceMuon.create({
            UserId : ttUser.id,
            numberm: numberm,
            DeviceId: id,
            datetra: datemuon,
            trangthai: 0,
        });

        const quantitydeviceconlai = data.soluongconlai - numberm;

        await db.Device.update({
            soluongconlai: quantitydeviceconlai,
        }, { where: { id } });

        return res.send(BaseService.SUCCESS(null, "Mượn thành công"));
    } catch (err) {
        throw boom.boomify(err);
    }
};

const listdevicechekduyet = async(req, res) => {
    try {
        const listdata = await db.DeviceMuon.findAll({
            where: {
                trangthai: {
                    [Op.eq]: 0,
                },
            },
            attributes: ["id" ,"datetra" , "numberm", "trangthai","createdAt"],
            include: [
        {
            model: db.User,
            attributes: ["email"],
        },
        {
            model: db.Device,
            attributes: ["imgdevice", "namedevice"]
        },
         ],
        });
      
        return res.code(200).send({
            msg: listdata,
        });
    } catch (error) {
        throw boom.boomify(error);
    }
};

const searchDevice = async(req, res) => {
    const { nameseach, nhom } = req.body;
    const numbernhom = Number(nhom);
    let data = null;
    if (numbernhom === 0) {
        data = await db.Device.findAll({
            where: {
                namedevice: {
                    [Op.like]: `%${nameseach}%`,
                },
            },
        });
    } else {
        data = await db.Device.findAll({
            where: {
                namedevice: {
                    [Op.like]: `%${nameseach}%`,
                },
                NhomthietbiId: {
                    [Op.eq]: numbernhom,
                },
            },
        });
    }
    return res.send({ listDevice: data });
};

const huydevicechoduyet = async(req, res) => {
    try {
        const id = req.params.id;
        const datamuon = await db.DeviceMuon.findOne({ where: { id } });
        const datam = datamuon.numberm;
        const idhuy = datamuon.DeviceId;
        const datadevice = await db.Device.findOne({ where: { id: idhuy } });

        await db.Device.update({
            soluongconlai: datadevice.soluongconlai + datam,
        }, { where: { id: idhuy } });

        await db.DeviceMuon.update({ trangthai: 2 }, { where: { id } });
        return res.send({ msg: "Từ chối thành công " });
    } catch (error) {}
};

const dydevicechoduyet = async(req, res) => {
    try {
        const id = req.params.id;
        await db.DeviceMuon.update({ trangthai: 1 }, { where: { id } });

        return res.send({ msg: "Duyệt thành công " });
    } catch (error) {}
};

const showtinhtrangthietbicuaban = async(req, res) => {
    try {
        const email = req.user.email;
        const iduser  =  await db.User.findOne({ 
            where: { email },
         })
         const idmuon = iduser.id
        const data = await db.DeviceMuon.findAll({
            where: { UserId :idmuon },
            include: [{
                model: db.Device,
                attributes: ["imgdevice", "namedevice"],
            }, ],
        });

        return res.send(data);
    } catch (error) {}
};

const listdevicedangmuon = async(req, res) => {
    try {
        const data = await db.DeviceMuon.findAll({
            where: {
                trangthai: {
                    [Op.eq]: 1,
                },
            },
            attributes: ["id" ,"datetra" , "numberm", "trangthai","createdAt"],
            include: [
                {
                model: db.Device,
                attributes: ["imgdevice", "namedevice", "tienthietbi"],
            },  {
                model: db.User,
                attributes: ["email"],
            },
         ],
        });

        return res.send(data);
    } catch (error) {}
};

const trathietbi = async(req, res) => {
    const { id, numbertra, numbermat, numbermuontiep, datemuontiep } = req.body;
    try {
        if (numbertra < 0 || numbermat < 0 || numbermuontiep < 0) {
            return res
                .code(400)
                .send({ msg: "Số lượng thiết bị từng loại phải lớn hơn hoặc bằng 0" });
        }
        const datadevicem = await db.DeviceMuon.findOne({ where: { id } });
        const tongmuon = datadevicem.numberm;
        const tongtra = numbermat + numbertra + numbermuontiep;
        if (tongmuon != tongtra) {
            return res
                .code(400)
                .send({
                    msg: `Số lượng trả của bạn không bằng  tổng ${tongmuon} thiết bị mượn ban đầu `,
                });
        }

        if (numbermuontiep > 0) {
            if (datemuontiep === false) {
                return res.code(400).send({ msg: "Bạn cần chọn thời gian mượn tiếp " });
            }
        }

        const datetiep = moment(datemuontiep).format("YYYY-MM-DD");
        const iddevice = datadevicem.DeviceId;
        const timeMax = await db.Device.findOne({
            where: { id: iddevice },
            include: [{
                model: db.Nhomthietbi,
                attributes: ["timetoida"],
            }, ],
        });

        const soluongconlai = timeMax.soluongconlai;
        const hoitra = soluongconlai + numbertra;
        const momentmax = moment().add(timeMax.Nhomthietbi.timetoida, "months");
        const formatdate = momentmax.format("YYYY-MM-DD");
        const datenow = new Date().getTime();
        const times = new Date(formatdate).getTime();
        const timestiep = new Date(datetiep).getTime();
        if (times < timestiep) {
            return res
                .code(400)
                .send({
                    msg: `Thiết bị này bạn có thể mượn tối đa ${timeMax.Nhomthietbi.timetoida}  tháng `,
                });
        }

        if (datenow > timestiep) {
            return res
                .code(400)
                .send({ msg: "Thời gian phải lớn hơn thời gian hiện tại" });
        }

        if (numbertra > 0) {


            await db.Device.update({
                soluongconlai: hoitra
            }, { where: { id: iddevice } });

            if (numbermuontiep == 0) {
                await db.DeviceMuon.destroy({ where: { id } })
            } else {
                await db.DeviceMuon.update({
                    numberm: tongmuon - numbertra,
                    datetra: datemuontiep
                }, {
                    where: { id }
                })
            }
        }
    return res.send(BaseService.SUCCESS(null, "Trả thành công "));
    } catch (error) {}
};

const searchthietbidangmuon = async(req, res) => {
    try {
        const { nameseach  ,timeTra , timeMuon } =req.body
        try {
          let data = null;
          if(timeMuon == false &&  timeTra  !=false){
            data =   await db.DeviceMuon.findAll({
                where: {
                    trangthai: {
                        [Op.eq]: 1,
                    }, 
                      datetra:{
                        [Op.lte]: new Date(timeTra)
                      }

                },
                attributes: ["id" ,"datetra" , "numberm", "trangthai","createdAt"],
                include: [
                    {
                    model: db.Device,
                    where: {
                        namedevice:{ 
                            [Op.like]:`%${nameseach}%`
                          }},
                    attributes: ["imgdevice", "namedevice", "tienthietbi"],
                },  {
                    model: db.User,
                    attributes: ["email"],
                },
             ],
            });
          }else if (timeTra  == false && timeMuon != false){
            data =   await db.DeviceMuon.findAll({
                where: {
                    trangthai: {
                        [Op.eq]: 1,
                    }, 
                    createdAt: {
                        [Op.gte]:new Date(timeMuon)
                        
                      } ,
                },
                attributes: ["id" ,"datetra" , "numberm", "trangthai","createdAt"],
                include: [
                    {
                    model: db.Device,
                    where: {
                        namedevice:{ 
                            [Op.like]:`%${nameseach}%`
                          }},
                    attributes: ["imgdevice", "namedevice", "tienthietbi"],
                },  {
                    model: db.User,
                    attributes: ["email"],
                },
             ],
            });
          }else if (timeTra == false && timeMuon == false){
            data =   await db.DeviceMuon.findAll({
                where: {
                    trangthai: {
                        [Op.eq]: 1,
                    },
                },
                attributes: ["id" ,"datetra" , "numberm", "trangthai","createdAt"],
                include: [
                    {
                    model: db.Device,
                    where: {
                        namedevice:{ 
                            [Op.like]:`%${nameseach}%`
                          }},
                    attributes: ["imgdevice", "namedevice", "tienthietbi"],
                },  {
                    model: db.User,
                    attributes: ["email"],
                },
             ],
            });
          }
          else{
          data =   await db.DeviceMuon.findAll({
                where: {
                    trangthai: {
                        [Op.eq]: 1,
                    }, 
                    createdAt: {
                        [Op.gte]:new Date(timeMuon)
                        
                      } ,
                      datetra:{
                        [Op.lte]: new Date(timeTra)
                      }

                },
                attributes: ["id" ,"datetra" , "numberm", "trangthai","createdAt"],
                include: [
                    {
                    model: db.Device,
                    where: {
                        namedevice:{ 
                            [Op.like]:`%${nameseach}%`
                          }},
                    attributes: ["imgdevice", "namedevice", "tienthietbi"],
                },  {
                    model: db.User,
                    attributes: ["email"],
                },
             ],
            });
          }
          

           console.log(data)
    
            return res.send({listDevice : data});
        } catch (error) {}
    } catch (error) {

    }
}

  const deletenopheduyet = async(req,res)=>{
    try {
        const { id } = req.params;
        await db.DeviceMuon.destroy({
            where: {
                id
            }
        })
        return res.send();
    } catch (error) {
        throw boom.boomify(error);
    }

  }
module.exports = {
    deletenopheduyet,
    createdevice,
    listdevice,
    deletedevice,
    listdevicemdevice,
    devicem,
    getEditDevice,
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
    listdevicedangmuon,
    trathietbi,
    searchthietbidangmuon,
    getnhomthietbim,
    editedevice
};


