import React ,{useState ,useEffect ,useRef} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Cookies from 'js-cookie'
import Slibar from '../slibar/slibar.js'
import './listdevicemuon.css'
import { Button ,Table ,Modal ,Form } from "react-bootstrap";
import moment from 'moment';
function ListDeviceMuon() {
     
   
    const [show1, setShow1] = useState(false);
    const [valuem , setvaluem] =useState(1)
    const [datetra ,setdatetra  ] = useState(false);
    const handleClose1 = () => setShow1(false);
    const getTimemuon = (e)=>{
      const TimeChange = moment(e).format('YYYY-MM-DD');
       setdatetra(TimeChange)
       
      }
      const setdatadevicem =(e)=>{
        setvaluem(e.target.value)
      }
      const handleShow1 = (id1 ,quantitym) =>{
      
        setShow1(true)
       
       }

      const Sendnumberdevicem = async()=>{ }

return ( 
<div className="ListUser">
<Slibar/>

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
    <th>Number Of Remaining Devices</th>
    <th>Borrow Equipment</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Mạnh Cường</td>
    <td>muadongyeuthuong3x@gmail.com</td>
    <td>gmail.com</td>
    <td> <Button onClick={()=>handleShow1( )}>Borrow</Button>   </td> 
  
  </tr>

</table>
        </div>



        </div>

        <Modal show={show1} onHide={handleClose1} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Mượn Thiết Bị</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group>
        <Form.Label>Số Lượng Mượn : </Form.Label>
        <Form.Control type="number" placeholder="So luong muon" value={valuem} min="1" name="device_quantity_m" onChange={setdatadevicem}/>
     </Form.Group>
     <Form.Group>
    <Form.Label>Thời Gian Trả :   </Form.Label>
      
    <DatePicker value={datetra} onChange={getTimemuon} />
      
       </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={Sendnumberdevicem}>
         Save
          </Button>
        </Modal.Footer>
      </Modal>


        </div>
    )}
export default ListDeviceMuon