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
import './listdevicechoduyet.css'
function ListDeviceChoDuyet() {
      

  const [listData , setListData] = useState(null)
  const [show, setShow] = useState(false);
  const [id ,setId] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [render,setRender]= useState(false);


  useEffect(async()=>{
      
    await axios.get("http://localhost:5000/api/listdevicechoduyet").then((res)=>{

      setListData(res.data.msg)
      console.log(res.data.msg)
  }).catch(err=>{

   

  })
  },[render])


  const handleShowdy  = (e)=>{
    setId(e)
  }

  const  handleDelete  =(e)=>{
    setId(e)
    setShow(true);
  }

  const handleDeleteDevice = async()=>{

    await axios.delete(`http://localhost:5000/api/deletelistdevicechoduyet/${id}`).then((res)=>{
   toast.success(res.data.msg)
   setRender(true)
  }).catch(err=>{

   

  })

  }
  
  return(
<div className="ListDeviceChoDuyet">
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
    <th>Email</th>
    <th>Tên thiết bị</th>
    <th>Số lượng mượn </th>
    <th>Ảnh thiết bị</th>

    <th>Thời gian trả</th>
    <th>Thời gian mượn</th>
    <th>Phê  duyệt</th>
    <th>Từ chối</th>
  </tr>
  {listData ===null ? "Loadding...." : listData.map((data1 ,index)=>{
     return( 

     <tr key={data1.id}>
       <td>{index}</td>
       <td>{data1.email}</td>
        <td>{data1.Device.namedevice}</td>
        <td>{data1.numberm}</td>
       
        <td > <img src={"http://localhost:5000/src/uploads/"+data1.Device.imgdevice}  alt="" className="imgpicture"/></td>
        <td > {( data1.datetra).slice(0, 10)}  </td>
        <td > {( data1.createdAt).slice(0, 10)}  </td>
        <td  > <Button onClick={()=>handleShowdy(data1.id)}>Đồng ý </Button>  </td>
        <td  > <Button onClick={()=>handleDelete(data1.id)} >Từ chối </Button>  </td>
    
  
  </tr>     ) })
}


</table>
        </div>



        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Không đồng ý cho mượn</Modal.Title>
        </Modal.Header>
        <Modal.Body> Bạn có chắc không đồng ý cho mượn không !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteDevice}>
            Đồng Ý
          </Button>
        </Modal.Footer>
      </Modal>

 

    </div>
  )

       

  }

     

export default ListDeviceChoDuyet