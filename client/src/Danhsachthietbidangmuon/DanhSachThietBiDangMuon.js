import React ,{useState ,useEffect ,useRef} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Cookies from 'js-cookie'
import Slibar from '../slibar/slibar.js'
import Header from '../Header/Header'
import { Button ,Col ,Modal ,Form } from "react-bootstrap";
import './danhsachm.scss'
import moment from 'moment';
function DanhsachThietBiDangMuon() {
  const [nameseach , setnamesearch]= useState('');
    const token =  Cookies.get('cookielogin')
    const [show1, setShow1] = useState(false);
    const [listNhom , setListNhom]  = useState(null)
    const [valuem , setvaluem] =useState(1)
    const [datetra ,setdatetra  ] = useState(false);
    const [listdevice , setlistdivice] =useState(null)
    const [calllist ,setcalllist ] =useState(false);
    const [id,setid] = useState(false);
    const [nhom ,setNhom] = useState(0)
    const handleClose1 = () => setShow1(false);
    const [numbertra, setnumbertra] = useState(0)
    const [numbermat , setnumbermat] = useState(0)
    const [numbermuontiep , setnumbermuontiep] = useState(0)
    const [numberBEmuon , setnumberBEmuon]= useState(0)
    const [datemuontiep ,setdatemuontiep] = useState(false)
    const [timeMuon, setTimeMuon] = useState(false)
    const [timeTra, setTimeTra] = useState(false)
    const [tienthietbi ,setTienthietbi]  = useState(false)
    const history = useHistory()
    const getTimeMuon = (e)=>{
     
      if(new Date(timeTra).getTime() < new Date(moment(e).format('YYYY-MM-DD')).getTime() && timeTra !=false  ){
        
        toast.error("Thời gian trả phải lớn hơn hoặc bằng thời gian mượn");
      }else{
        const TimeChange = moment(e).format('YYYY-MM-DD');
        setTimeMuon(TimeChange)
      }
     
      }
    
      const getTimeTra = (e)=>{
     
        if(new Date(timeMuon).getTime() > new Date(moment(e).format('YYYY-MM-DD')).getTime() && timeMuon !=false){
         
          toast.error("Thời gian trả phải lớn hơn hoặc bằng thời gian mượn");
        }else{
          const TimeChange = moment(e).format('YYYY-MM-DD');
          setTimeTra(TimeChange)
        }
      }
      

     const getTimemuontiep = (e)=>{
      const TimeChange = moment(e).format('YYYY-MM-DD');
      setdatemuontiep(TimeChange)
       
      }

      const handleShow1 = (id1 ,number , gia) =>{
        setTienthietbi(gia)
        setShow1(true)
        setid(id1)
        setnumberBEmuon(number)
       }
      
       useEffect(async()=>{
      
        await axios.get("http://localhost:5000/api/listdevicedangmuon" , {headers: {Authorization: `Bearer ${token}`} }).then((res)=>{
       setlistdivice(res.data)    
      }).catch(err=>{
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
        if( err.response.data.message === "errorrole" ){
        
         return  history.push("/login") ;
          }
       
   
      })
      await axios.get("http://localhost:5000/api/getnhomdivice", {headers: {Authorization: `Bearer ${token}` }} , {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setListNhom(res.data);
      })
      .catch((err) => {
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
        if( err.response.data.message === "errorrole" ){
        
         return  history.push("/login") ;
          }
        toast.error(err.response.data.msg);
      });
      },[calllist])
    

      const Sendnumberdevicem = async()=>{
         
       const data = {
         id:id,
         numbertra : Number(numbertra),
         numbermat:Number(numbermat),
         numbermuontiep:Number(numbermuontiep),
        datemuontiep :datemuontiep
       }

        const config = {
          'Content-Type': 'application/json',
        }
        await axios.post("http://localhost:5000/api/trathietbi" , data , {headers: {Authorization: `Bearer ${token}` }} ,config  ).then((res)=>{
          setcalllist(!calllist)
          setShow1(false)
          setnumbermat(0)
          setnumbermuontiep(0)
          setnumbertra(0)
          setdatemuontiep(false)

          toast.success(res.data.message)
        }).catch(err=>{
          if(err.response.data.message ==="erroruser"){
            return  history.push("/login") ;
           }
          if( err.response.data.message === "errorrole" ){
          
           return  history.push("/login") ;
            }
        toast.error(err.response.data.msg)
          

         
        })
       }


       const handleSearchDevice = async()=>{
        const data = {
          nameseach:nameseach,
          timeTra:timeTra,
          timeMuon:timeMuon
        }
        await axios.post("http://localhost:5000/api/searchthietbimuonthanhcong",data , {headers: {Authorization: `Bearer ${token}` }}).then((res)=>{
        setlistdivice(res.data.listDevice)
        }).catch(err=>{
          if(err.response.data.message ==="erroruser"){
            return  history.push("/login") ;
           }
          if( err.response.data.message === "errorrole" ){
          
           return  history.push("/login") ;
            }
        
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
         
         <Header/>
        
        <div className="listdevicemuon">
        <table>
        <div className = "formSearchMuon ">
        <Col xs={2} className="inputsearch  marginToplist">
                      <Form.Control placeholder="Tìm kiếm thiết bị" onChange = {(e)=>setnamesearch(e.target.value)} />
                     
                    </Col>
                   
                    {/* <select name="" id="" className="selectnhom marginToplist" onChange = {(e)=>setNhom(e.target.value)}>
                        <option value="0">Tất cả nhóm</option>
                         {listNhom === null ?"data ..": listNhom.map((nhom ,index)=>{return(
     <option value={nhom.id} key={index}>{nhom.Name}</option>
   )})} 
                      </select>  */}
                     
                    <div style={{marginTop:"7px" , marginLeft:"50px", display:"flex"}}> 
                      <Form.Group>
        <Form.Label >Ngày Mượn : </Form.Label>
         
    <DatePicker value={timeMuon} onChange={getTimeMuon} />
     </Form.Group>


     <Form.Group>
        <Form.Label  >Ngày Trả : </Form.Label>
   
        <DatePicker value={timeTra} onChange={getTimeTra} />
     </Form.Group>
     </div>


                    <button type="button" className="btn btn-success buttonsearch marginToplist" onClick={()=>handleSearchDevice()}>
                    <svg width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                        </svg>
                    </button>
        </div>

<tr>
    <th>STT</th>
    <th>Email</th>
    <th>Tên thiết bị</th>
    <th>Ảnh</th>
    <th> Số lượng mượn </th>
    <th>Giá thiết bị (VNĐ)</th>
    <th>Ngày Duyệt</th>
    <th>Ngày Trả</th>
    <th>Trả Thiết Bị</th>
  </tr>
  {listdevice ===null ? "Loadding...." : listdevice.map((data1 ,index)=>{
     return( 
     <tr key={data1.id}>
    <td>{index}</td>
    <td>{data1.User.email}</td>
    <td>{data1.Device.namedevice}</td>
    <td><img src={"http://localhost:5000/src/uploads/"+data1.Device.imgdevice}  alt="" className="imgavatar"/></td>
    <td>{data1.numberm}</td>
    <td>{(data1.Device.tienthietbi).toLocaleString()}</td>
    <td > {( data1.createdAt).slice(0, 10)}  </td>
    <td > {( data1.datetra).slice(0, 10)}  </td>
    <td> <Button onClick={()=>handleShow1(data1.id  , data1.numberm , data1.Device.tienthietbi)}>Trả Thiết Bị</Button> </td>
  
  </tr>     ) })
}


</table>
        </div>



        </div>

        <Modal show={show1} onHide={handleClose1} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title> Trả thiết bị</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group>
        <Form.Label>Số lượng trả : </Form.Label>
        <Form.Control type="number" placeholder="So luong muon" value={numbertra} min="0" onChange={(e)=>setnumbertra(e.target.value)  }/>
     </Form.Group>

     <Form.Group>
        <Form.Label>Số lượng mất : </Form.Label>
        <Form.Control type="number" placeholder="So luong muon" value={numbermat}  min="0"  onChange={(e)=>setnumbermat(e.target.value)}/>
     </Form.Group>
   
   {numbermat>0 ? <Form.Group>
        <Form.Label>Số Tiền Phải Đền  : </Form.Label>
        <Form.Control type="number"  value={(numbermat*tienthietbi)} disabled /> VNĐ
     </Form.Group> : null
   }
    

     <Form.Group>
        <Form.Label>Số lượng mượn tiếp : </Form.Label>
        <Form.Control type="number" placeholder="So luong muon" value={numbermuontiep} min="0"  onChange={(e)=>setnumbermuontiep(e.target.value)}/>
     </Form.Group>
     { numbermuontiep >0 ?
     <Form.Group>
      
       <Form.Label>Thời Gian Mượn Tiếp :   </Form.Label>
       <DatePicker value={datemuontiep} onChange={getTimemuontiep}  /> 
      
       </Form.Group> : ""   }

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
export default DanhsachThietBiDangMuon