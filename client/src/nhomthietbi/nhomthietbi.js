import React, { useState ,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Form, Modal ,Col} from "react-bootstrap";
import Slibar from "./../slibar/slibar";
import "./nhomdevice.css";
import Header from '../Header/Header'
import { useHistory } from "react-router-dom";
function nhomthietbi() {
  const [showcreatenhom, setshowcreatenhom] = useState(false);
  const [data, setData] = useState({
    nhomdevice: "",
    thoigianmuontoidata: "",
  });
  const token = Cookies.get("cookielogin");
  const [dataUpdate, setdataUpdate] = useState({
    Name: "",
    timetoida: "",
  });
  const [show, setShow] = useState(false);
  const [editNhom , seteditNhom]= useState(false);
  const handleClose = () => setShow(false);
  const [listdata ,setListData] = useState(null)
  const [calllist ,setCallist]  =useState(false)
  const [nameseach , setnamesearch]= useState(false);
  const history = useHistory();
  const [id ,setId]  =useState(false)
  const changeData = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setData({ ...data, [name]: value });
  };
  const createnhomdevice = () => {
    setshowcreatenhom(true);
  };
  const handleCloseCreatenhom = () => {
    setshowcreatenhom(false);
  };

  useEffect(async () => {
    await axios.get("http://localhost:5000/api/getnhomdivice", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
       console.log(res)
        setListData(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
        if( err.response.data.message === "errorrole" ){
        
         return  history.push("/login") ;
          }
      });
  }, [calllist]);





  const sendData = async()=>{
      
    await axios.post("http://localhost:5000/api/createnhomthietbi",data , {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setCallist(!calllist)
        toast.success(res.data.msg)
        setshowcreatenhom(false)
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
        if( err.response.data.message === "errorrole" ){
        
         return  history.push("/login") ;
          }
      });
    
  }

  const deleteNhomThietBi = async ()=>{
    await axios.delete(`http://localhost:5000/api/deletenhomthietbi/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => { 
        toast.success(res.data.msg)
        setCallist(!calllist)
        setShow(false)
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
        if( err.response.data.message === "errorrole" ){
        
         return  history.push("/login") ;
          }
      });

  }

  const deletenhom = async (id)=>{
      setId(id)
      setShow(true)
  }

  const handeEdit  = async(e)=>{
    seteditNhom(true)
    setId(e)
    await axios.get(`http://localhost:5000/api/editnhomthietbi/${e}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => { 
      setdataUpdate({
        Name:res.data.Name,
        timetoida:res.data.timetoida
      })
    
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
      if(err.response.data.message ==="erroruser"){
        return  history.push("/login") ;
       }
      if( err.response.data.message === "errorrole" ){
      
       return  history.push("/login") ;
        }
    });
    

  }
  const handleCloseEditnhom = ()=>{
    seteditNhom(false)
  }
  const changeDataUpdate = (e)=>{
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setdataUpdate({ ...dataUpdate, [name]: value });
  
  }
  const sendDataEdit  = async()=>{
    const data = {
      timetoida:dataUpdate.timetoida,
      Name:dataUpdate.Name
    }
    await axios.put(`http://localhost:5000/api/updatenhomthietbi/${id}`,data , {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => { 
      setCallist(!calllist)
      toast.success(res.data.msg)
      seteditNhom(false)
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
      if(err.response.data.message ==="erroruser"){
        return  history.push("/login") ;
       }
      if( err.response.data.message === "errorrole" ){
      
       return  history.push("/login") ;
        }
    });
  }

  const handleSearchUser = async()=>{
    const data = {
      nameseach:nameseach
    }
    await axios.post("http://localhost:5000/api/searchnhom",  data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setListData(res.data.listNhom)
    })
    .catch((err) => {
      toast.error(err.response.data.msg);
      if(err.response.data.message ==="erroruser"){
        return  history.push("/login") ;
       }
      if( err.response.data.message === "errorrole" ){
      
       return  history.push("/login") ;
        }
    });
  }

  return (
    <div className="ListNhom">
      <Slibar />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
         
         <Header/>
      <div className="nhomdevice ">
        <div className = "formSearch">
        <Button className="btnnhomthietbi" onClick={createnhomdevice}>
          Thêm nhóm thiết bị 
          <span  className="iconnhom">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </span>
          </Button>

          <Col xs={5} className="inputsearch ">
                      <Form.Control placeholder="Tìm kiếm nhóm thiết bị" onChange = {(e)=>setnamesearch(e.target.value)} />
                    </Col>
                    
                    <button type="button" className="btn btn-success buttonsearch" onClick={()=>handleSearchUser()}>
                    <svg width="15px" height="15px">
                            <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                        </svg>
                    </button>
                    </div>
       
        <table>
          <tr>
            <th>STT</th>
            <th>Tên Nhóm Thiết Bị</th>
            <th> Thời gian mượn tối đa </th>
            <th>Sửa nhóm</th>
            <th>Xóa nhóm</th>
          </tr>
          {listdata ===null ? "Loadding...." : listdata.map((data1 ,index)=>{
     return(
          <tr>
            <td>{index}</td>
            <td>{data1.Name}</td>
            <td>{ data1.timetoida  } (Tháng)</td>
            <td>  <i className="fa fa-pencil" aria-hidden="true" onClick={()=>handeEdit(data1.id)}>  </i>
            </td>
            <td>  <i class="fa fa-trash" aria-hidden="true" onClick={()=>deletenhom(data1.id)}></i>  </td>
            </tr>     ) })
}
        </table>
      </div>

      <Modal
        show={showcreatenhom}
        onHide={handleCloseCreatenhom}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Nhóm Thiết Bị</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicNamethietbi">
            <Form.Label>Tên nhóm thiết bị </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên thiết bị "
              value={data.nhomdevice}
              name="nhomdevice"
              onChange={changeData}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSoluong">
            <Form.Label>
              Thời gian mượn tối đa của nhóm thiết bị (Tháng)
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Số tháng mượn tối đa"
              min="1"
              max="12"
              value={data.thoigianmuontoidata}
              name="thoigianmuontoidata"
              onChange={changeData}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick = {handleCloseCreatenhom}>Close</Button>
          <Button variant="primary" onClick= {sendData}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa nhóm thiết bị  này không  ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteNhomThietBi }>
          Delete
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal
        show={editNhom}
        onHide={handleCloseEditnhom}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa Nhóm Thiết Bị</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicNamethietbi">
            <Form.Label>Tên nhóm thiết bị </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên thiết bị "
              value={dataUpdate.Name}
              name="Name"
              onChange={changeDataUpdate}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSoluong">
            <Form.Label>
              Thời gian mượn tối đa của nhóm thiết bị (Tháng)
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Số tháng mượn tối đa"
              min="1"
              max="12"
              value={dataUpdate.timetoida}
              name="timetoida"
              onChange={changeDataUpdate}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditnhom}>Close</Button>
          <Button variant="primary" onClick= {sendDataEdit}>Đồng ý</Button>
        </Modal.Footer>
      </Modal>


</div>
  );
}

export default nhomthietbi;
