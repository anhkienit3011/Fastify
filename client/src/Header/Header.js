import './headercss.scss'
import Cookies from 'js-cookie'
const HeaderWeb  = ()=>{
    const name = localStorage.getItem("name")
    const avatar = localStorage.getItem("avatar")
  
 
     return(
 <header>
            <h3 className="congty">Công ty công nghệ số Việt Nam</h3>
            <div className="ttuser">
            <img className="avatar" src={`http://localhost:5000/src/uploads/`+avatar}  alt="imgerr"/>
             <p className="nameuser">{name}   </p>
            
            </div>
         </header>
     )
 }
 
 export default HeaderWeb