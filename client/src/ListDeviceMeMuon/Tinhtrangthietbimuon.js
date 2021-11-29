import React ,{useState ,useEffect ,useRef} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slibar from '../slibar/slibar.js'
import './ttdevice.css'
import { Button ,Table ,Modal ,Form } from "react-bootstrap";

function Tinhtrangthietbimuon() {
     
    const token =  Cookies.get('cookielogin')
    

return ( 
<div className="ListDeviceTT">
<Slibar/>
<ToastContainer
position="top-right"
autoClose={3000}
closeOnClick/>
   <div className="main-content">
        <header>
            <div className="social-icons">
                <span className="ti-bell"></span>
                <div></div>
            </div>
        </header>
        
        <div className="listdeviceCheck">
        <table>
  

<tr>
    <th>STT</th>
    <th>Name Device</th>
    <th>Image</th>
    <th>Number  Devices </th>
    <th>Price Device (VNĐ)</th>
    <th>Mượn thiết bị</th>
  </tr>
 

</table>
        </div>



        </div>



   

        </div>
    )}
export default Tinhtrangthietbimuon