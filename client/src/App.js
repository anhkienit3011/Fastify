import React  from 'react'
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login/Login.js'
import ListUser from './User/ListUser'
import EditUser from './User/EditUser.js';
import ListDeviceMuon from './ListDeviceMuon/ListDeviceMuon'
import ListDevice from './ListDeviceCongTy/ListDevice'
import EditDevice  from './ListDeviceCongTy/EditDevice.js';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import ListDeviceChoDuyet from './ListDeviceChoPheDuyet/ListDeviceChoDuyet'
import Tinhtrangthietbimuon from './ListDeviceMeMuon/Tinhtrangthietbimuon'
import  TraThietBi from './ListDeviceTra/TraThietBi'
import nhomthietbi from './nhomthietbi/nhomthietbi.js';
import DanhsachThietBiDangMuon from "./Danhsachthietbidangmuon/DanhSachThietBiDangMuon"
import Chat from "./UserChat/Chat"
function App() {
  return (
    <div className="App">
  <Router>
    <Switch>  
    <Route path="/login"  exact component={Login} />
    <Route path="/listuser"  exact component={ListUser} />
    <Route path="/edituser/:id"  exact component={EditUser} />
    <Route path="/listdevice"  exact component={ListDevice} />
    <Route path="/editdevice"  exact component={EditDevice} />
   
    <Route path="/listdevicemuon"  exact component={ListDeviceMuon} />

    <Route path="/listdevicechopheduyet"  exact component={ListDeviceChoDuyet} />
    <Route path="/nhomthietbi"  exact component={nhomthietbi} />
    <Route path="/tinhtrangthietbicuaban"  exact component={Tinhtrangthietbimuon} />
    <Route path="/trathietbi"  exact component={TraThietBi} />

    <Route path ="/chat" exact component ={Chat} />
    <Route path="/listdevicecdangmuon"  exact component={DanhsachThietBiDangMuon} />

    </Switch>
  </Router> 
    </div>
  );
}

export default App;
