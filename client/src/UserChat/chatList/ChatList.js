import React, { useEffect   ,useState , useRef } from "react";
import "./chatList.scss";
import Cookies from 'js-cookie'
import axios from 'axios'
import Avatar from "./Avatar"
import Slibar from "../../slibar/slibar";
import Header from "../../Header/Header"
import { io } from "socket.io-client";
import moment from "moment";
import ChatItem  from "../ChatItem";
import { useHistory } from "react-router-dom";
export default  function ChatList(){

  const [listUser , setListUser] = useState(false)
  const token =  Cookies.get('cookielogin')
  const [userLogin , setUserLogin] = useState(null)
  const [textChat , setTextChat] = useState('')
  const socket = useRef();
  const [message , setMessage] = useState('')
  const [contentUserChat , setcontentUserChat] = useState(false)
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const history = useHistory()

  useEffect(() => {
   informationUserLogin()
   getListUser() 
  
  },[]);


  
  const getListUser = async()=>{
    await axios.get("http://localhost:5000/api/listusercongty", {headers: {Authorization: `Bearer ${token}` }}).then((res)=>{
       setListUser(res.data.payload)
     
       }).catch(err=>{   
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
      
  })
}

  const informationUserLogin = async ()=>{
    await axios.get("http://localhost:5000/api/informationUserLogin", {headers: {Authorization: `Bearer ${token}` }}).then((res)=>{
      setUserLogin(res.data)
      console.log(userLogin)
       }).catch(err=>{   
        if(err.response.data.message ==="erroruser"){
          return  history.push("/login") ;
         }
       
  })
  }
  
  const getDataUserChat = (item)=>{
   setcontentUserChat(item)
  }


 

    useEffect(() => {
      socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        idUserChat: data.senderId,
        textChat: data.text,
        createdAt: data.createdAt,
      });


    });
    }, []);


    useEffect(() => {
      setMessage( [...message, arrivalMessage])
       
    }, [arrivalMessage, contentUserChat]);


  
 


    useEffect(() => {
      const getMessagesUerChat = async () => {
        try {
          if (contentUserChat !=false){

          
          const res = await axios.get("http://localhost:5000/api/messagechat/"+userLogin.id +"/"+contentUserChat.id , {headers: {Authorization: `Bearer ${token}`} });
          setMessage(res.data); }
        } catch (err) {
          if(err.response.data.message ==="erroruser"){
            return  history.push("/login") ;
           }
        }
      };
      getMessagesUerChat();

     

    }, [contentUserChat]);
   
  
  const CreateTexTChat = async(e)=>{
    e.preventDefault();
    let timechat = moment.utc(new Date())
    const dataChat = {
          userid : userLogin.id,
          userChat: contentUserChat.id,
          text: textChat,
          createdAt: new Date(),
    }

    socket.current.emit("sendMessage",{
      senderId: userLogin.id,
      receiverId:contentUserChat.id,
      text: textChat,
      createdAt: new Date(),
    });

    
    try {
      const res = await axios.post("http://localhost:5000/api/messages", dataChat , {headers: {Authorization: `Bearer ${token}`} });
     // setMessages([...messages, res.data]);
      setTextChat("");
    } catch (err) {
      if(err.response.data.message ==="erroruser"){
        return  history.push("/login") ;
       }
    
    }
  }

    const onChangeGetTextChat = (e)=>{
      setTextChat(e.target.value)
    }

    useEffect(()=>{
      if(userLogin !== null){
      
        socket.current.emit("addUser", userLogin.id);
        socket.current.on("getUsers", (users) => {
         console.log(users)
        });

      }

    },[userLogin])

    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    return (

      <div className="main__chatbody">


<Slibar/>

         
<Header/>
  
      <div className="main__chatlist">
       
        <div className="chatlist__heading">
          <h2>Chats</h2>
          
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>

        <div className="chatlist__items">
              {  listUser?.length > 0   &&  listUser.map((item, index) => {
                if(item?.id === userLogin?.id){
                  return 
                }else{ 
                   return (
                    <div style ={{display:"flex"}} onClick = {()=>getDataUserChat(item)} key={index}>
                    <Avatar
                      image={
                        (item.avatar) ? item.avatar : "http://placehold.it/80x80"
                      }
                    />
                    <div className="userMeta">
                      <p>{item.name}</p>
                      <span className="activeTime">32 mins ago</span>
                    </div>
                  </div>
                   )
                    }
          })}
        </div>
      </div>
  
  {/* chat content */}


{ contentUserChat !=false ?

  <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image= {contentUserChat?.avatar?contentUserChat.avatar :null }
              />
              <p> {contentUserChat.name}</p>
            </div>
          </div>

         
        </div>
        <div className="content__body" >
          <div className="chat__items" >

            {  message?.length > 2  &&  message?.map((item, index) => {
              if(item?.idUserChat ===userLogin?.id ){
                return (
                  
                  <ChatItem
                   
                    key={index}
                    msg={item?.textChat}
                    avatar={userLogin?.avatar}
                    time = {item?.createdAt}
                  />
                );
              }else{
                return (
                  <ChatItem
                    animationDelay={index + 2}
                    key={index}
                    msg={item?.textChat}
                    avatar={contentUserChat?.avatar}
                    userChat = {0}
                    time = {item?.createdAt}
                  />
                );
              }
     
            })}
               <div  ref={scrollRef}/>

            
          
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange = {onChangeGetTextChat}
              value={textChat}
            />

            { textChat && textChat.length >1?
                        <button className="btnSendMsg" id="sendMsgBtn" onClick = {CreateTexTChat}>
              <i className="fa fa-paper-plane"></i>
            </button> :  null
}

          </div>
        </div>
      </div> : <div>

                   MessengerChat

        </div>

          }

      </div>


    );
  
}