const MESSAGEREGISTER = {
    NAME:"Tên có độ dài từ 8 đến 30 kí tự",
    EMAIL:"Chưa đúng định dạng email",
    PASSWORD:"Mật khẩu phải từ 8 đến 20 kí tự",
    ROLE:"Không được fetch quyền",
    AVATAR:"Thiếu ảnh cá nhân"
 
  };

  const MESSAGECREATEDEVICE ={
    NAMEDEVICE:"Tên có độ dài từ 5 đến 100 kí tự",
    IMAGEDEVICE:"Chưa có ảnh",
    QUANTITYDEVICE:"Tổng thiết bị của công ty phải lớn hơn 1",
    TIENDEVICE:"Tiền thiết bị phải lớn hơn 1  "
 }


 const MESSAGEDEVICEMUON= {
  TIMEMUONDEVICE:"Không đúng định dạng thời gian ",
  NUMBERDEVICEM :"Thiết bị mượn phải lớn hơn 1",
  ID:"Id chưa đúng định dạng"
 }

  module.exports = {
    MESSAGEREGISTER,
    MESSAGECREATEDEVICE,
    MESSAGEDEVICEMUON
  };
  