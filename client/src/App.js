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

    <Route path="/listdevicechopheduyet"  exact component={EditDevice} />
    </Switch>
  </Router> 
    </div>
  );
}

export default App;
