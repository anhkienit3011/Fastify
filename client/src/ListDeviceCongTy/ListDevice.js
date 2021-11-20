import React ,{useState ,useEffect ,useRef} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slibar from '../slibar/slibar.js'
import { Button ,Table ,Modal ,Form } from "react-bootstrap";
import './listdevice.css'
function ListDevice() {
  const [id,setid] = useState(false);
    const [show, setShow] = useState(false);
    const [deletetb,  setdeletetb] = useState(false);
    const [showcreatedevice ,setshowcreatedevice]  = useState(false);
    const targetupload = useRef(null)
    const [listdevice , setlistdivice] =useState(null)
    const [baseImage , setBaseImage] =useState({
        img:null
      })
    const [value_device , setvalue_device] = useState({
        device_name :'',
        device_quantity:'',
        giadevice:''
    })  
    const getdatadevice = (e)=>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setvalue_device({ ...value_device ,[name] : value })
        
    }
  
      const handleUpload  = (e)=>{
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            setBaseImage({img:reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
       }
    const handleShow  = (e)=>{
      setid(e)
        setShow(true)
      }


      const handleClose = () => setShow(false);
      const handleCreateDevice = ()=>{
        setshowcreatedevice(true)
      }
     
      const handleCloseCreate = ()=>{
        setshowcreatedevice(false)
      }
      useEffect(async()=>{
      
        await axios.get("http://localhost:5000/api/listdevice").then((res)=>{

       setlistdivice(res.data.msg)    
      }).catch(err=>{

       
   
      })
      },[deletetb,showcreatedevice])

      const deletedevice = async()=>{

        await axios.delete(`http://localhost:5000/api/deletedevice/${id}` ).then((res)=>{
                  
            toast.success(res.data.msg)
            setShow(false)
            setdeletetb(!deletetb)
           }).catch(err=>{
           
          
           })
    }
      const  sendData = async(e)=>{
        e.preventDefault();
        const config = {
          'Content-Type': "application/json",
          }
       const dataDevice ={
         device_name:value_device.device_name,
         device_quantity:Number(value_device.device_quantity),
         imagedevice:baseImage.img,
         giadevice:Number(value_device.giadevice)
       }
      
        await axios.post("http://localhost:5000/api/createdevice" ,dataDevice ,config).then((res)=>{
     
         setvalue_device({
          device_name :'',
          device_quantity:'',
          giadevice:''
      })  
      setBaseImage({
        img:''
      })
  
        toast.success(res.data.msg)
        setshowcreatedevice(false)
          
      }).catch(err=>{
        console.log( JSON.parse(err.response.data.message))
        JSON.parse(err.response.data.message).map(data=>{
          toast.error(data.message)
        })
      })

      }

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
        <Button className="buttoncreatedevice" onClick={()=>handleCreateDevice()} > Add Device  <span><i class="fa fa-plus" aria-hidden="true"></i></span></Button>
  <tr>
    <th>STT</th>
    <th>Name Device</th>
    <th>Image</th>
    <th>Number  Devices</th>
    <th>Number  Devices Còn Lại</th>
    <th>Price Device (VNĐ)</th>
    <th>Edit Device</th>
    <th>Delete Device</th>
  </tr>
  {listdevice ===null ? "Loadding...." : listdevice.map((data1 ,index)=>{
     return( 

     <tr key={data1.id}>
    <td>{index}</td>
    <td>{data1.namedevice}</td>
    <td><img src={"http://localhost:5000/src/uploads/"+data1.imgdevice}  alt="" className="imgavatar"/></td>
    <td>{(data1.quantitydevice).toLocaleString()}</td>
    <td>{(data1.soluongconlai).toLocaleString()}</td>

    
    <td>{(data1.tienthietbi).toLocaleString()}</td>
    <td>  <Link to="/editdevice" >   <i className="fa fa-pencil" aria-hidden="true"> </i> </Link></td>
    <td><i class="fa fa-trash" aria-hidden="true" onClick={()=>handleShow(data1.id)}></i></td> 
  </tr>     ) })
}
</table>
        </div>



        </div>

        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa thiết bị  này không  ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deletedevice }>
          Delete
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={showcreatedevice} onHide={handleCloseCreate} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Device </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicNamethietbi">
    <Form.Label>Tên thiết bị </Form.Label>
    <Form.Control type="text" placeholder="Tên thiết bị " name="device_name" value={value_device.device_name} onChange={getdatadevice}/>
   
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicSoluong">
    <Form.Label>Số Lượng </Form.Label>
    <Form.Control type="number" placeholder="So luong"  min="1" name="device_quantity" value={value_device.device_quantity}  onChange={getdatadevice}/>
   
  </Form.Group>
  
  <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Ảnh Thiết Bị </Form.Label>
    <br />
  <div className="imguser" onClick={()=>targetupload.current.click()} > {baseImage.img ===null ? '': <img src={baseImage.img}  width="100" height="100"/>} </div> 
   <input ref={targetupload}  type="file"  onChange={(e)=>handleUpload(e)} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Giá thiết bị </Form.Label>
    <br/>
    <input type="number" name="giadevice" min="1" placeholder="VNĐ"  onChange={getdatadevice} value={value_device.giadevice}/> VNĐ
    <br />
    
  </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
          <Button variant="primary" onClick={sendData}>
        Đồng ý 
          </Button>
        </Modal.Footer>
      </Modal>



</div>

    )}
     

    export default ListDevice