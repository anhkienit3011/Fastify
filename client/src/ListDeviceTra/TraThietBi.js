import React ,{useState ,useEffect ,useRef} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Cookies from 'js-cookie'
import Slibar from '../slibar/slibar.js'
import { Button ,Table ,Modal ,Form } from "react-bootstrap";
import moment from 'moment';
function TraThietBi() {
     
   

return ( 
<div className="ListUser">
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
        
        <div className="listdevicemuon">
        <table>
        <h2>Danh sách các thiết bị công ty có mượn được</h2>

<tr>
    <th>STT</th>
    <th>Name Device</th>
    <th>Image</th>
    <th>Number  Devices </th>
    <th>Price Device (VNĐ)</th>
    <th>Mượn thiết bị</th>
  </tr>
   <tr>
       <td>Manh</td>
       <td></td>
       <td></td>
       <td></td>
       <td></td>
   </tr>


</table>
        </div>



        </div>

        </div>
    )}
export default TraThietBi