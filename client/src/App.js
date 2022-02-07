import React , {useEffect} from 'react'
import { BrowserRouter as Router , Route , Switch  ,Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListUser from './User/ListUser'
import EditUser from './User/EditUser.js';
import ListDeviceMuon from './ListDeviceMuon/ListDeviceMuon'
import ListDevice from './ListDeviceCongTy/ListDevice'
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import ListDeviceChoDuyet from './ListDeviceChoPheDuyet/ListDeviceChoDuyet'
import Tinhtrangthietbimuon from './ListDeviceMeMuon/Tinhtrangthietbimuon'
import  TraThietBi from './ListDeviceTra/TraThietBi'
import nhomthietbi from './nhomthietbi/nhomthietbi.js';
import DanhsachThietBiDangMuon from "./Danhsachthietbidangmuon/DanhSachThietBiDangMuon"
import ChatList from "./UserChat/chatList/ChatList"
import Chatcongty from "./GroupChat/ChatCongTy"
import  Loginweb from "./login/Loginweb.js"
import Cookies from "js-cookie";
function App() {
  const token = Cookies.get("cookielogin")

  return (
    <div className="App">
  <Router>
    <Switch>  
    <Route path="/login"  exact component={Loginweb} />
    {token ?<>
    <Route path="/listuser"  exact component={ ListUser } />
    <Route path="/edituser/:id"  exact component={EditUser} />
    <Route path="/listdevice"  exact component={ListDevice} />
    <Route path="/listdevicemuon"  exact component={ListDeviceMuon} />

    <Route path="/listdevicechopheduyet"  exact component={ListDeviceChoDuyet} />
    <Route path="/nhomthietbi"  exact component={nhomthietbi} />
    <Route path="/tinhtrangthietbicuaban"  exact component={Tinhtrangthietbimuon} />
    <Route path="/trathietbi"  exact component={TraThietBi} />

    <Route path ="/chat" exact component ={ChatList} />
    <Route path="/listdevicecdangmuon"  exact component={DanhsachThietBiDangMuon} />

    <Route path="/nhomchatcongty"  exact component={Chatcongty} /> </> : <Redirect to="/login" />}

 
    </Switch>
  </Router> 
    </div>
  );
}

export default App;
