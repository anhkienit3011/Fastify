import React ,{ useState ,useRef ,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import { Button ,Modal ,Form} from "react-bootstrap";
import Slibar from '../slibar/slibar'
import './listuser.css'

function ListUser() {


     const [idDelete ,setIdDelete]=useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [deletetb,setdeletetb]= useState(false);
    const [listUser , setListUser] = useState(null);
    const [showcreateuser ,setshowcreateuser]= useState(false);
    const [register , setregister] = useState({
        ten:'',
        email:'',
        password:'',
        role:''
    }); 
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
     
    const Laydata = (e) =>{
        var target = e.target;
        var name = target.name;
        var value =  target.value;
        setregister({ ...register , [name]: value})
        
      }

      const handleCloseCreateUser = ()=>{
        setshowcreateuser(false)
      }

      const handleCreateUser = ()=>{
        setshowcreateuser(true)
      }

      const handleShow  = (e)=>{
        setIdDelete(e)
        setShow(true)
      }
      
      const getListUser = async()=>{
        await axios.get("http://localhost:5000/api/listuser" ).then((res)=>{
       
            setListUser(res.data.payload)    
           }).catch(err=>{   
      })
    }

      useEffect( ()=>{
        getListUser();
    },[deletetb,showcreateuser])

      const CreateUser  = async(event)=>{ 
        event.preventDefault();
        const config = {
            'Content-Type': 'application/json',
          }
        const dataregister = {
          ten:register.ten,
          email:register.email,
          password:register.password,
          role:register.role,
          avatar:avatar
        }
          await axios.post("http://localhost:5000/api/register" ,  dataregister ,{config}).then((res)=>{
            toast.success(res.data.payload)
            setregister({
              ten:'',
              email:'',
              password:'',
              role:null
          }); 
          setAvatar(null) 
          setshowcreateuser(false)

          }).catch(err=>{

            if(err.response.data.message ==="emailerror"){
            return  toast.error(err.response.data.payload)
            }else { 
            JSON.parse(err.response.data.message).map(data=>{
              toast.error(data.message)
            })
          }
          })
        
        
      }



      const deleteUser = async()=>{
       
      await axios.delete(`http://localhost:5000/api/deleteuser/${idDelete}`).then((res)=>{
  
              toast.success(res.data.payload)
              setShow(false)
              setdeletetb(!deletetb)
             }).catch(err=>{
               
             })
    }
      
    return( 
<div className="ListUser">
<ToastContainer
position="top-right"
autoClose={3000}
closeOnClick/>
<Slibar/>

   <div className="main-content">
 
        <header>
            <div className="social-icons">
                <span className="ti-bell"></span>
                <div></div>
            </div>
        </header>
        
        <div className="contextlinklistuser">
<h2>Danh sách user của công ty</h2>

        <table>
        <Button className="buttoncreateuser" onClick={()=>handleCreateUser()} > Add User  <span><i className="fa fa-plus" aria-hidden="true"></i></span></Button>
  <tr>
    <th>STT</th>
    <th>Tên User</th>
    <th>Email</th>
    <th>Image</th>
    <th>Role</th>
    <th>Edit User</th>
    <th>Delete User</th>
  </tr>

  {listUser ===null ? "Loadding...." : listUser.map((data1 ,index)=>{
        return( 
        <tr key={data1.id}>

        <td>{index}</td>
        <td>{data1.name}</td>
        <td>{data1.email}</td>
        <td><img src={"http://localhost:5000/src/uploads/"+data1.avatar}  alt="" className="imgavatar"/></td>
        <td>{data1.role}</td>
    <td>  <Link to={`/edituser/${data1.id}`}>   <i className="fa fa-pencil" aria-hidden="true"> </i> </Link></td>
    <td><i className="fa fa-trash" aria-hidden="true" onClick={()=>handleShow(data1.id)}></i></td>
  </tr>
   ) })
}

</table>

        </div>
    
    </div>


    
<Modal show={showcreateuser} onHide={handleCloseCreateUser} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Tên User </Form.Label>
    <Form.Control type="text" placeholder="Name ...." name="ten" value={setregister.ten} onChange={Laydata}/>
  </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Email </Form.Label>
    <Form.Control type="email" placeholder="Email ...." name="email" value={setregister.email} onChange={Laydata} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Password</Form.Label>
    <Form.Control type="Password" placeholder="Password ...." name="password" value={setregister.password} onChange={Laydata} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Ảnh đại diện</Form.Label>
    <br />
  <div className="imguser" onClick={()=>targetupload.current.click()} style={{backgroundImage: avatar}}> {avatar ===null ? '': <img src={avatar}  width="100" height="100"/>} </div> 
   <input ref={targetupload}  type="file"  onChange={(e)=>handleUpload(e)} />
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicimage">
    <Form.Label>Quyền</Form.Label>
    <br />
  <select name="role" onChange={Laydata} >

  <option value="" disabled selected hidden>Chọn quyền</option>
  <option value="User">User</option>
  <option value="Admin">Admin</option>
</select>
</Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateUser}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateUser}>
       Create
          </Button>
        </Modal.Footer>
      </Modal>
  

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa user này không  ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"   onClick={deleteUser}>
          Delete
          </Button>
        </Modal.Footer>
      </Modal>





</div>
    )}
export default ListUser