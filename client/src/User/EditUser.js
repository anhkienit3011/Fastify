import React ,{useState ,useEffect ,useRef} from 'react'
import { Button ,Form  ,Row ,Col } from "react-bootstrap";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slibar from '../slibar/slibar.js'
import './edituser.css'

function EditUser() {
  const [editUser , setEditUser] = useState({
    ten:'',
    password:'',
    role:'',
    avatar:''
}); 
let history = useHistory();

const Laydata = (e) =>{
  var target = e.target;
  var name = target.name;
  var value =  target.value;
  setEditUser({ ...editUser  , [name]: value})
  
}


const {id} =  useParams();
    const [ avatar ,setAvatar ] =  useState(null)
    const targetupload = useRef(null)
    const handleUpload  = (e)=>{
     const reader = new FileReader();
     reader.onload = () =>{
       if(reader.readyState === 2){
         setAvatar( reader.result)
       }
     }
     reader.readAsDataURL(e.target.files[0])
    }
    

    useEffect(async()=>{
    
      await axios.get( `http://localhost:5000/api/edituser/${id}`  ).then((res)=>{
        console.log(editUser)
          setEditUser({
              ten :res.data.payload.name,
              role:res.data.payload.role,
              password:'',
              avatar:res.data.payload.avatar
          })  
    }).catch(err=>{
      
    })
    },[id])
  

    const SendEditUser = async(event)=>{
      event.preventDefault();
      let edituserdata ={};
      if((editUser.password).length <1 && avatar ===null){
        edituserdata = {
          ten :editUser.ten,
          role:editUser.role,
          

        }
      }else if ( (editUser.password).length >0 && avatar ===null){
        edituserdata = {
          ten :editUser.ten,
          role:editUser.role,
          password:editUser.password,
       
        }
      }else if ( (editUser.password).length <1 && avatar !=null){
        edituserdata= {
          ten :editUser.ten,
          role:editUser.role,
          avatar:avatar,

         
        }
      }else{
        edituserdata = {
          ten :editUser.ten,
          role:editUser.role,
          avatar:avatar,
          password:editUser.password,

        }
      }
      const config = {
        'Content-Type': 'application/json',
      }
   
      await axios.put(`http://localhost:5000/api/updateuser/${id}`  ,edituserdata,{config}).then((res)=>{
    
        toast.success(res.data.payload)
        setEditUser({
          ten:'',
          password:'',
          role:'',
          avatar:''
      }); 
     
      setTimeout(function(){
        history.push("/listuser");  }, 1000);
          
      }).catch(err=>{


 if(err.response.data.message ==="tenerror"){
  return  toast.error(err.response.data.payload)
  }

  if(err.response.data.message ==="passworderror"){
    return  toast.error(err.response.data.payload)
    }
      })
    }
    

return ( 
<div className="ListUser">
<ToastContainer
position="top-right"
autoClose={1000}
closeOnClick/>
<Slibar/>

   <div className="main-content">
        <header>
            <div className="social-icons">
                <span className="ti-bell"></span>
                <div></div>
            </div>
        </header>
        
        <div className="editUser">
        <Form>
  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Tên User</Form.Label>
    <Form.Control type="text" placeholder="Name for user"  name="ten" value={editUser.ten}  onChange={Laydata} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>




  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label> Password New </Form.Label>
    <Form.Control type="password" placeholder="Password" name="password" value={editUser.password}  onChange={Laydata} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">

    <Form.Label>Ảnh User Cũ</Form.Label>
    <br />
     <img src={"http://localhost:5000/src/uploads/"+editUser.avatar} alt="" width="200"  height="200"/>
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicPassword">
      
      <Form.Label> Ảnh Mới</Form.Label>
      <br />

      <div className="imguseredit" onClick={()=>targetupload.current.click()} style={{backgroundImage: avatar}}> {avatar ===null ? '': <img src={avatar}  width="200" height="200"/>} </div> 
   <input ref={targetupload}  type="file"  onChange={(e)=>handleUpload(e)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Quyền</Form.Label>
    <br />
  <select name="role"  value={editUser.role}  onChange={Laydata} >

  <option value="" disabled selected hidden>Chọn quyền</option>
  <option value="User">User</option>
  <option value="Admin">Admin</option>
</select>
</Form.Group>
    



    <Button variant="primary" onClick={SendEditUser}>Edit User</Button>

    <Link to="/listuser" > <Button variant="secondary">
  Come Back
  </Button> </Link>

</Form>




        </div>


</div>
</div>



)}

export default EditUser