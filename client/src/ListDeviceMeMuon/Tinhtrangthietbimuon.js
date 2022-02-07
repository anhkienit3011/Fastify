import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import Slibar from "../slibar/slibar.js";
import "./ttdevice.scss";
import Header from "../Header/Header"
function Tinhtrangthietbimuon() {
  const token = Cookies.get("cookielogin");
  const [listdata ,setListData] = useState(null)
  useEffect(async () => {
    await axios.get("http://localhost:5000/api/showdeviceyou", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data)
        setListData(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
       
      });
  }, []);

  return (
    <div className="ListDeviceTT">
      <Slibar />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
      <div className="main-content">
      <Header/>

        <div className="listdeviceCheck">
          <table>
            <tr>
              <th>STT</th>
              <th>Name Device</th>
              <th>Image</th>
              <th>Number Devices </th>
              <th>Thời gian mượn</th>
               <th>Thời gian trả</th>
               <th>Trạng Thái   </th>
            </tr>
{
    listdata  === null ? "Chưa có dữ liệu":listdata.map((data1 ,index)=>{
        return( 
            <tr key={data1.id}>
   <td>{index}</td>
   <td>{data1.Device.namedevice}</td>
   <td><img src={"http://localhost:5000/src/uploads/"+data1.Device.imgdevice}  alt="" className="imgavatar"/></td>
   <td>{data1.numberm}</td>

   <th>{(data1.createdAt).slice(0, 10)}</th>
   <th>{(data1.datetra).slice(0, 10)}</th>
   <th>{ (data1.trangthai === 2)?"Bị từ chối":((data1.trangthai === 1)?"Đồng ý":"Chưa duyệt" )}</th>
   </tr>     
          

        )
    })
}


          </table>
        </div>
      </div>
    </div>
  );
}
export default Tinhtrangthietbimuon;
