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
  const [message , setMessage] = useState([])
  const [contentUserChat , setcontentUserChat] = useState(false)
  const [arrivalMessage, setArrivalMessage] = useState([]);
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
     if(message === null){
       setMessage(arrivalMessage)
     }else{
        setMessage( [...message, arrivalMessage]) }
    }, [arrivalMessage ,contentUserChat]);

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
      if(setMessage === []){
        setMessage(res.data.data)
      }else{
      setMessage([...message, res.data.data]);}
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
                      <span>Online</span>
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

            {  message?.length > 0 &&  message?.map((item, index) => {
              if(item?.idUserChat ===userLogin?.id ){
                return (
                  
                  <ChatItem
                  userChat={1}
                    key={index}
                    msg={item?.textChat}
                    avatar={userLogin?.avatar}
                    time = {item?.createdAt}
                  />
                );
              }else{
                return (
                  <ChatItem
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

                <img src="https://cdn.tgdd.vn/hoi-dap/929605/cach-tat-tu-dong-luu-anh-tren-messenger-100.jpg" alt="messenger" />

        </div>

          }

      </div>


    );
  
}























////

// import "./messenger.css";
// import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { io } from "socket.io-client";

// export default function Messenger() {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socket = useRef();
//   const { user } = useContext(AuthContext);
//   const scrollRef = useRef();

//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers(
//         user.followings.filter((f) => users.some((u) => u.userId === f))
//       );
//     });
//   }, [user]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/conversations/" + user._id);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user._id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     socket.current.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post("/messages", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <Topbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <input placeholder="Search for friends" className="chatMenuInput" />
//             {conversations.map((c) => (
//               <div onClick={() => setCurrentChat(c)}>
//                 <Conversation conversation={c} currentUser={user} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m) => (
//                     <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === user._id} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={onlineUsers}
//               currentId={user._id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }