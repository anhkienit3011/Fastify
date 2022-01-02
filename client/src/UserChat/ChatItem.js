import React  ,{useState}from 'react';
import Avatar from './chatList/Avatar';
import moment from "moment";
const ChatItem = (props) => {

    const { avatar , msg ,userChat ,time} = props
    const [viewchat,setviewchat] = useState(false)
    return (
        <div
        onClick ={()=>setviewchat(!viewchat)}
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${userChat ===0 ?`other` : ""}`}
      >
        <div className="chat__item__content">
          <p className="chat__msg">{msg}</p>
          <div className="chat__meta">
           
         {viewchat ? <span style={{color:"while"}}>{ moment(time).format("YYYY-MM-DD hh:mm")}</span>  :''}  
          </div>
        </div>
        <Avatar  image={avatar} />
      </div>
    );
}

export default ChatItem;
