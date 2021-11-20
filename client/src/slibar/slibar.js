import React ,{ useState  } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import { Button ,Form  ,Row ,Col} from "react-bootstrap";
import './slibar.css'
function Slibar() {
    

return( 
<div className="dasboard">

    <input type="checkbox" id="sidebar-toggle"/>
    <div className="sidebar">
        <div className="sidebar-header">
            <h3 className="brand">
                <span className="ti-unlink"></span> 
                <span> KMA</span>
            </h3> 
            <label for="sidebar-toggle" className="ti-menu-alt"></label>
        </div>
        
        <div className="sidebar-menu">
            <ul>
                <li>
                <Link to="/listuser">
                        <span className="ti-home"></span>
                        <span>Danh sách User</span>
                    </Link>
                </li>
                <li>
                <Link to="/listdevice">
                        <span className="ti-face-smile"></span>
                        <span>Danh Sách Thiết Bị Công Ty</span>
                        </Link>
                </li>
                

                <li>
                <Link to="/listdevicemuon">
                        <span className="ti-agenda"></span>
                        <span>Danh sách thiết bị mượn</span>
                    </Link>
                </li>
                <li>
                <Link to="/listdevicechopheduyet">
                      <span className="ti-clipboard"></span>
                        <span>Danh Sách Thiết Bị Chờ Duyệt</span>
                        </Link>
                </li>


              
                <li>
                    <a href="">
                        <span className="ti-clipboard"></span>
                        <span>Leaves</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <span className="ti-folder"></span>
                        <span>Projects</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <span className="ti-time"></span>
                        <span>Timesheet</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <span className="ti-book"></span>
                        <span>Contacts</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <span className="ti-settings"></span>
                        <span>Account</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    
    
 


        </div>    
    )}
    export default Slibar