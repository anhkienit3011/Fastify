import React ,{ useState  } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import Cookies from 'js-cookie'
import { Button ,Form  ,Row ,Col} from "react-bootstrap";
import './login.css'
function Login() {
    
  const [login , setlogin] = useState({
    email:'',
    password:''
}); 


const Laydata = (e) =>{
  var target = e.target;
  var name = target.name;
  var value =  target.value;
  setlogin({ ...login , [name]: value})
  
}
const  senddata =async(event)=>{
  event.preventDefault();
  const config = {
      'Content-Type': 'application/json',
    }
  
    await axios.post("http://localhost:5000/api/login" ,  login ,{config}).then((res)=>{
      const data =  JSON.parse(res.data.message)
      localStorage.setItem("role",data.role)
      localStorage.setItem("name",data.name)
      localStorage.setItem("avatar",data.avatar)
      Cookies.set('cookielogin', data.msg)
      window.location.href  = "/listdevicemuon"
    }).catch(err=>{
      console.log(err.response.data)
       if( err.response.data.message ==="usererr"){
     return   toast.error("Tài khoản không đúng ")
       }  else{ 
         JSON.parse(err.response.data.message).map(data=>{
        toast.error(data.message)
      })
      }
    })

 
    

}



    return (
      <div className="blocklogin"> 
        <div className="container">
        <ToastContainer
      position="top-right"
      autoClose={1000}
      closeOnClick/>
      
          <div className="row">
          <div className="col-lg-4 col-md-4">
              </div>
            <div className="col-lg-4 col-md-4 formlogin">

 <Form  className="formdata" onSubmit={senddata}>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    <Form.Label>Email You</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" name ="email" value={setlogin.email} onChange={Laydata} />
  </Form.Group>
 <Form.Group  className="mb-3" controlId="formPlaintextPassword" >
      <Form.Label >  Password  </Form.Label>
     
        <Form.Control type="password" placeholder="Password" name="password"   value={setlogin.password} onChange={Laydata}/>
     
    </Form.Group>

    <Button variant="primary" type="submit">Đăng nhập </Button>
</Form>




                </div>

                <div className="col-lg-4 col-md-4">
              </div>

                </div>
                </div>
                </div>
            
)}
export default Login