import React ,{ useState ,useEffect } from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './slibar.css'
function Slibar() {
    const [rolecheck,setrolecheck] =  useState("User");
    useEffect(() => {
      const roleuser  =  localStorage.getItem("role")
      setrolecheck(roleuser)
    }, []);
    
    const logout = ()=>{
        localStorage.removeItem("name")
        localStorage.removeItem("avatar")
        localStorage.removeItem("role")
        Cookies.remove("cookielogin")
    }

return( 
<div className="dasboard">

    <input type="checkbox" id="sidebar-toggle"/>
    <div className="sidebar">
        <div className="sidebar-header">
            <h3 className="brand">
                <span className="ti-unlink"></span> 
                <span> KMA</span>
            </h3> 
            {/* <label for="sidebar-toggle" className="ti-menu-alt"></label> */}
        </div>
        
        <div className="sidebar-menu">
            <ul>
             {(rolecheck ==="Admin")&&<li  >
                <Link to="/listuser">
                        <span className="ti-home"></span>
                        <span>Danh sách User</span>
                    </Link>
                </li> }

                {(rolecheck ==="Admin")&&  <li >
                <Link to="/nhomthietbi">
                        <span className="ti-face-smile"></span>
                        <span>Nhóm thiết bị công ty</span>
                        </Link>
                </li> }

                {(rolecheck ==="Admin")&&  <li >
                <Link to="/listdevice">
                        <span className="ti-face-smile"></span>
                        <span>Danh sách thiết bị công ty</span>
                        </Link>
                </li> }
                

                <li >
                <Link to="/listdevicemuon">
                        <span className="ti-agenda"></span>
                        <span>Danh sách thiết  mượn</span>
                    </Link>
                </li>
                {(rolecheck ==="Admin")&&  <li >
                <Link to="/listdevicechopheduyet">
                      <span className="ti-clipboard"></span>
                        <span>Danh Sách Thiết  Chờ Duyệt</span>
                        </Link>
                </li> }

                {(rolecheck ==="Admin")&&    <li >
                <Link to="/listdevicecdangmuon">
                      <span className="ti-clipboard"></span>
                        <span>Danh Sách Thiết  Đang Mượn</span>
                        </Link>
                </li> }


              
                <li >
                <Link to= "/tinhtrangthietbicuaban">
                   
                        <span className="ti-clipboard"></span>
                        <span>Trạng Thái Thiết Bị Của Bạn</span>
                        </Link>
                </li>

              

              <li>
                <Link to= "/chat">
                   
                   <span className="ti-clipboard"></span>
                   <span>Chat</span>
                   </Link>
           </li>
              
                <li  onClick ={logout}>
                <Link to= "/login">
                        <span className="ti-folder"></span>
                        <span>LogOut</span>
                    
            </Link>
                </li>
              
            </ul>
        </div>
    </div>
    
    
 


        </div>    
    )}
    export default Slibar