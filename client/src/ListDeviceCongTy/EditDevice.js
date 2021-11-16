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
import './listdevice.css'
function EditDevice() {

   

    const [baseImage , setBaseImage] =useState({
        img:null
      })
      const targetupload = useRef(null)
      const handleUpload  = (e)=>{
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            setBaseImage({img:reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
       }

   
    
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
            
            <div className="editDevice">

            <Form>
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Name Device</Form.Label>
    <Form.Control type="text" placeholder="Name for Device" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicNumberDevice">
    <Form.Label>NumBer Device</Form.Label>
    <Form.Control type="text" placeholder="number device ..." />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicPriceDevice">
    <Form.Label>Price Device</Form.Label>
    <Form.Control type="text" placeholder="Price Device" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">

    <Form.Label>Ảnh User Cũ</Form.Label>
    <br />
     <img src="" alt="" width="200"  height="200"/>
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicPassword">
      
      <Form.Label> Ảnh Mới</Form.Label>
      <br />

      <div className="imguseredit" onClick={()=>targetupload.current.click()} > {baseImage.img ===null ? '': <img src={baseImage.img}  width="200" height="200"/>} </div> 
   <input ref={targetupload}  type="file"  onChange={(e)=>handleUpload(e)} />
    </Form.Group>


    



    <Button variant="primary">Edit Device</Button>

    <Link to="/listdevice" > <Button variant="secondary">
  Come Back
  </Button> </Link>

</Form>




                </div>
                </div>
                </div>

)}

export default EditDevice