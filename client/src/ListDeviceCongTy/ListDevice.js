import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Slibar from "../slibar/slibar.js";
import { Button, Modal, Form, Col } from "react-bootstrap";
import "./listdevice.scss";
import Header from "../Header/Header";
function ListDevice() {
  const [id, setid] = useState(false);
  const [show, setShow] = useState(false);
  const [deletetb, setdeletetb] = useState(false);
  const [showcreatedevice, setshowcreatedevice] = useState(false);
  const [showeditedevice, setshoweditdevice] = useState(false);
  const targetupload = useRef(null);
  const [listdevice, setlistdivice] = useState(null);
  const [listNhom, setListNhom] = useState(null);
  const [nhom, setNhom] = useState(0);
  const [idedit , setidEdit] = useState(false)
  const [baseImage, setBaseImage] = useState({
    img: null,
  });
  const [nameseach, setnamesearch] = useState("");
  const token = Cookies.get("cookielogin");
  const [value_device, setvalue_device] = useState({
    device_name: "",
    device_quantity: 1,
    giadevice: "",
    idnhom: "",
  });

  const [value_deviceedit, setvalue_deviceedit] = useState({
    device_nameedit: "",
    device_quantityedit: "",
    giadeviceedit: "",
    imagedeviceedit:"",
    namenhomedit:""
  });

  const getdatadevice = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setvalue_device({ ...value_device, [name]: value });
  };
  
  const getdatadeviceedit = (e)=>{
    var target = e.target;
    var name = target.name;
    var value = target.value;
    setvalue_deviceedit({ ...value_deviceedit, [name]: value });
  }
  const handleCloseEdit = ()=>{
    setshoweditdevice(false)
    setBaseImage(false)
  }
  const handleUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBaseImage({ img: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleShow = (e) => {
    setid(e);
    setShow(true);
  };

  const handleShowEdit = async(e) => {
    setidEdit(e)
    setshoweditdevice(true);
    await axios
      .get(`http://localhost:5000/api/geteditdevice/${e} `, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
      setvalue_deviceedit({
        device_nameedit:res.data.data.namedevice,
        device_quantityedit:res.data.data.quantitydevice,
        imagedeviceedit : res.data.data.imgdevice,
        namenhomedit:res.data.data.NhomthietbiId,
        giadeviceedit:res.data.data.tienthietbi
      })
      })
      .catch((err) => {
        if (err.response.data.message === "erroruser") {
          return history.push("/login");
        }
        if (err.response.data.message === "errorrole") {
          return history.push("/login");
        }
      });
  };

  const handleClose = () => setShow(false);
  const handleCreateDevice = () => {
    setshowcreatedevice(true);
  };

  const handleCloseCreate = () => {
    setshowcreatedevice(false);
  };
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/listdevice", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setlistdivice(res.data.msg);
      })
      .catch((err) => {
        if (err.response.data.message === "erroruser") {
          return history.push("/login");
        }
        if (err.response.data.message === "errorrole") {
          return history.push("/login");
        }
      });

    await axios
      .get(
        "http://localhost:5000/api/getnhomdivice",
        { headers: { Authorization: `Bearer ${token}` } },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setListNhom(res.data);
      })
      .catch((err) => {
        if (err.response.data.message === "erroruser") {
          return history.push("/login");
        }
        if (err.response.data.message === "errorrole") {
          return history.push("/login");
        }
      });
  }, [deletetb, showcreatedevice]);

  const deletedevice = async () => {
    await axios
      .delete(`http://localhost:5000/api/deletedevice/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast.success(res.data.msg);
        setShow(false);
        setdeletetb(!deletetb);
      })
      .catch((err) => {
        if (err.response.data.message === "erroruser") {
          return history.push("/login");
        }
        if (err.response.data.message === "errorrole") {
          return history.push("/login");
        }
      });
  };
  const sendData = async (e) => {
    e.preventDefault();
    const config = {
      "Content-Type": "application/json",
    };
    const dataDevicecode = {
      idnhoma: Number(value_device.idnhom),
      device_name: value_device.device_name,
      device_quantity: Number(value_device.device_quantity),
      imagedevice: baseImage.img,
      giadevice: Number(value_device.giadevice),
    };
    await axios
      .post("http://localhost:5000/api/createdevice", dataDevicecode, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setvalue_device({
          device_name: "",
          device_quantity: "",
          giadevice: "",
          idnhom: "",
        });
        setBaseImage({
          img: false,
        });

        toast.success(res.data.msg);
        setshowcreatedevice(false);
      })
      .catch((err) => {
        if (err.response.data.message === "msgnhom") {
          return toast.error(err.response.data.payload);
        }
        if (err.response.data.message === "erroruser") {
          return history.push("/login");
        }
        if (err.response.data.message === "errorrole") {
          return history.push("/login");
        }
        JSON.parse(err.response.data.message).map((data) => {
          toast.error(data.message);
        });
      });
  };

  const sendDataEdit =async (e) => {
    e.preventDefault();
    const config = {
      "Content-Type": "application/json",
    };
    let dataDevicecode = null
    if(baseImage){
       dataDevicecode = {
        idnhoma: Number(value_deviceedit.namenhomedit),
        device_name: value_deviceedit.device_nameedit,
        device_quantity: Number(value_deviceedit.device_quantityedit),
        imagedevice: baseImage.img,
        giadevice: Number(value_deviceedit.giadeviceedit),
        id : data1.id
      };
    }else{
       dataDevicecode = {
        idnhoma: Number(value_deviceedit.namenhomedit),
        device_name: value_deviceedit.device_nameedit,
        device_quantity: Number(value_deviceedit.device_quantityedit),
        giadevice: Number(value_deviceedit.giadeviceedit),
        id : data1.id
      };
    }
  
    await axios
      .put("http://localhost:5000/api/editedevice", dataDevicecode, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setvalue_device({
          device_name: "",
          device_quantity: "",
          giadevice: "",
          idnhom: "",
        });
        setBaseImage({
          img: false,
        });

        toast.success(res.data.msg);
        setshowcreatedevice(false);
      })
      .catch((err) => {
        if (err.response.data.message === "msgnhom") {
          return toast.error(err.response.data.payload);
        }
        if (err.response.data.message === "erroruser") {
          return history.push("/login");
        }
        if (err.response.data.message === "errorrole") {
          return history.push("/login");
        }
        JSON.parse(err.response.data.message).map((data) => {
          toast.error(data.message);
        });
      });
  };


  const handleSearchDevice = async () => {
    const data = {
      nameseach: nameseach,
      nhom: nhom,
    };
    await axios
      .post("http://localhost:5000/api/searchdevice", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setlistdivice(res.data.listDevice);
      })
      .catch((err) => {
        if (err.response.data.message === "erroruser") {
          return history.push("/login");
        }
        if (err.response.data.message === "errorrole") {
          return history.push("/login");
        }
      });
  };

  return (
    <div className="listdevicemuon">
      <Slibar />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
      <div className="main-content">
        <Header />

        <div className="listdevicemuon">
          <table>
            <div className="formSearch">
              <Button
                className="buttoncreatedevice"
                onClick={() => handleCreateDevice()}
              >
                Thêm thiết bị{" "}
                <span>
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>
              </Button>
              <Col xs={5} className="inputsearch ">
                <Form.Control
                  placeholder="Tìm kiếm thiết bị"
                  onChange={(e) => setnamesearch(e.target.value)}
                />
              </Col>
              <select
                name=""
                id=""
                className="selectnhom"
                onChange={(e) => setNhom(e.target.value)}
              >
                <option value="0">Tất cả nhóm</option>
                {listNhom === null
                  ? "data .."
                  : listNhom.map((nhom, index) => {
                      return (
                        <option value={nhom.id} key={index}>
                          {nhom.Name}
                        </option>
                      );
                    })}
              </select>

              <button
                type="button"
                className="btn btn-success buttonsearch"
                onClick={() => handleSearchDevice()}
              >
                <svg width="15px" height="15px">
                  <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                </svg>
              </button>
            </div>
            <tr>
              <th>STT</th>
              <th>Tên thiết bị</th>
              <th>Ảnh</th>
              <th>Tổng số thiết bị</th>
              <th>Số thiết bị còn lại</th>
              <th>Giá thiết bị (VNĐ)</th>
              <th>Sửa</th>
              <th>Xóa</th>
            </tr>
            {listdevice === null
              ? "Loadding...."
              : listdevice.map((data1, index) => {
                  return (
                    <tr key={data1.id}>
                      <td>{index}</td>
                      <td>{data1.namedevice}</td>
                      <td>
                        <img
                          src={
                            "http://localhost:5000/src/uploads/" +
                            data1.imgdevice
                          }
                          alt=""
                          className="imgavatar"
                        />
                      </td>
                      <td>{data1.quantitydevice.toLocaleString()}</td>
                      <td>{data1.soluongconlai.toLocaleString()}</td>

                      <td>{data1.tienthietbi.toLocaleString()}</td>
                      <td>
                        {" "}
                        <i
                          className="fa fa-pencil"
                          aria-hidden="true"
                          onClick={() => handleShowEdit(data1.id)}
                        >
                          {" "}
                        </i>
                      </td>
                      <td>
                        <i
                          class="fa fa-trash"
                          aria-hidden="true"
                          onClick={() => handleShow(data1.id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
          </table>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa thiết bị này không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deletedevice}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showcreatedevice}
        onHide={handleCloseCreate}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Device </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicNamethietbi">
            <Form.Label>Tên thiết bị </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên thiết bị "
              name="device_name"
              value={value_device.device_name}
              onChange={getdatadevice}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSoluong">
            <Form.Label>Số Lượng </Form.Label>
            <Form.Control
              type="number"
              placeholder="So luong"
              min="1"
              name="device_quantity"
              value={value_device.device_quantity}
              onChange={getdatadevice}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicimage">
            <Form.Label>Ảnh Thiết Bị </Form.Label>
            <br />
            <div
              className="imguser"
              onClick={() => targetupload.current.click()}
            >
              {" "}
              {baseImage.img === null ? (
                ""
              ) : (
                <img src={baseImage.img} width="100" height="100" />
              )}{" "}
            </div>
            <input
              ref={targetupload}
              type="file"
              onChange={(e) => handleUpload(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicimage">
            <Form.Label>Giá thiết bị </Form.Label>
            <br />
            <input
              type="number"
              name="giadevice"
              min="1"
              placeholder="VNĐ"
              onChange={getdatadevice}
              value={value_device.giadevice}
            />{" "}
            VNĐ
            <br />
          </Form.Group>

          <select name="idnhom" onChange={getdatadevice}>
            <option value="0" disabled selected hidden>
              Chọn Nhóm Thiết Bị
            </option>
            {listNhom === null
              ? "data .."
              : listNhom.map((nhom, index) => {
                  return (
                    <option value={nhom.id} key={index}>
                      {nhom.Name}
                    </option>
                  );
                })}
          </select>
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



    {/* editdevice */}

      <Modal
        show={showeditedevice}
        onHide={handleCloseEdit}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Device </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicNamethietbi">
            <Form.Label>Tên thiết bị </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên thiết bị "
              name="device_name"
              value={value_deviceedit.device_nameedit}
              onChange={getdatadeviceedit}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicSoluong">
            <Form.Label> Tổng Số Lượng </Form.Label>
            <Form.Control
              type="number"
              placeholder="So luong"
              min="1"
              name="device_quantity"
              value={value_deviceedit.device_quantityedit}
              onChange={getdatadeviceedit}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicimage">
            <Form.Label>Ảnh Thiết Bị Cũ </Form.Label>
            <br />
            <div
              className="imguser"
            >

                <img  src={"http://localhost:5000/src/uploads/" +value_deviceedit.imagedeviceedit} width="100" height="100" />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicimage">
            <Form.Label>Ảnh Thiết Bị Mới </Form.Label>
            <br />
            <div
              className="imguser"
              onClick={() => targetupload.current.click()}
            >
              {" "}
              {baseImage.img === null ? (
                ""
              ) : (
                <img src={baseImage.img} width="100" height="100" />
              )}{" "}
            </div>
            <input
              ref={targetupload}
              type="file"
              onChange={(e) => handleUpload(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicimage">
            <Form.Label>Giá thiết bị </Form.Label>
            <br />
            <input
              type="number"
              name="giadevice"
              min="1"
              placeholder="VNĐ"
              onChange={getdatadeviceedit}
              value={value_deviceedit.giadeviceedit}
            />{" "}
            VNĐ
            <br />
          </Form.Group>

          <select name="namenhomedit" onChange={getdatadeviceedit} value={value_deviceedit.namenhomedit}>
            {listNhom === null
              ? "data .."
              : listNhom.map((nhom, index) => {
                  return (
                    <option value={nhom.id} key={index}>
                      {nhom.Name}
                    </option>
                  );
                })}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={sendDataEdit}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListDevice;
