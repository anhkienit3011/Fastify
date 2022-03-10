import React ,{ useState ,useRef ,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import { Button ,Modal ,Form ,Col} from "react-bootstrap";
import Slibar from '../slibar/slibar'
import './listuser.css'
import Header from './../Header/Header'
import { useHistory } from "react-router-dom";
function ListUser() {

  const token = Cookies.get("cookielogin");
  let history = useHistory();
     const [idDelete ,setIdDelete]=useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [deletetb,setdeletetb]= useState(false);
    const [listUser , setListUser] = useState(null);
    const [showcreateuser ,setshowcreateuser]= useState(false);
    const [nameseach , setnamesearch]= useState(false);
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
        await axios.get("http://localhost:5000/api/listuser" , { headers: { Authorization: `Bearer ${token}` }} ).then((res)=>{
       
            setListUser(res.data.payload)    
           }).catch(err=>{   
            if(err.response.data.message ==="erroruser"){
              return  history.push("/login") ;
             }
            if( err.response.data.message === "errorrole" ){
            
             return  history.push("/login") ;
              }
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
          await axios.post("http://localhost:5000/api/register" ,  dataregister ,{headers: {Authorization: `Bearer ${token}`} }).then((res)=>{
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
            if(err.response.data.message ==="erroruser"){
              return  history.push("/login") ;
             }
            if( err.response.data.message === "errorrole" ){
            
             return  history.push("/login") ;
              }
            if(err.response.data.message ==="emailerror"){
            return  toast.error(err.response.data.payload)
            }else { 
            JSON.parse(err.response.data.message).map(data=>{
              toast.error(data.message)
            })
          }
          })
        
        
      }

     
      const handleSearchUser = async()=>{
        const data = {
          nameseach:nameseach
        }
        await axios.post("http://localhost:5000/api/searchuser",  data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setListUser(res.data.listUser)
        })
        .catch((err) => {
          if(err.response.data.message ==="erroruser"){
            return  history.push("/login") ;
           }
          if( err.response.data.message === "errorrole" ){
          
           return  history.push("/login") ;
            }
        });
      }

      const deleteUser = async()=>{
       
      await axios.delete(`http://localhost:5000/api/deleteuser/${idDelete}`,{headers: {Authorization: `Bearer ${token}`} }).then((res)=>{
  
              toast.success(res.data.payload)
              setShow(false)
              setdeletetb(!deletetb)
             }).catch(err=>{
              if(err.response.data.message ==="erroruser"){
                return  history.push("/login") ;
               }
              if( err.response.data.message === "errorrole" ){
              
               return  history.push("/login") ;
                }
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
      <Header/>
        
        <div className="contextlinklistuser">

        <table>
          <div className="formSearch">
        <Button className="buttoncreateuser" onClick={()=>handleCreateUser()} >Thêm tài khoản <span><i className="fa fa-plus" aria-hidden="true"></i></span></Button>
        <Col xs={5} className="inputsearch">
                      <Form.Control placeholder="Tìm kiếm thành viên theo tên" onChange = {(e)=>setnamesearch(e.target.value)} />
                    </Col>
                    
                    <button type="button" className="btn btn-success buttonsearch" onClick={()=>handleSearchUser()}>
                    <svg width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                        </svg>
                    </button>
                    </div>
  <tr>
    <th>STT</th>
    <th>Tên tài khoản  </th>
    <th>Email</th>
    <th>Ảnh đại diện</th>
    <th>Quyền tài khoản </th>
    <th>Sửa thông tin tài khoản</th>
    <th>Xóa tài khoản </th>
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