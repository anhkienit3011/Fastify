import React, { useState,  useEffect , useRef } from "react";
import "./chatContent.scss";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { io } from "socket.io-client";
export default function ChatContent () {
  const [textChat , setTextChat] = useState(null)
  const socket = useRef();


  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
          scrollToBottom();
        }
      })
      scrollToBottom();
    },[]);

    useEffect(() => {
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {

        // setArrivalMessage({
        //   idChat:,
        //   text: data.setTextChat,
        //   createdAt: Date.now(),
        // });

      });
    }, []);
   
  
  const CreateTexTChat = async(e)=>{
    e.preventDefault();
    const dataChat = {
          userid : user.id,
          text: textChat,
          createdAt: Date.now(),
    }

    socket.current.emit("sendDataClient",dataChat);
    socketRef.current.on('sendDataServer', dataGot => {
     setMessages
    }) 

    try {
      const res = await axios.post("/messages", dataChat);
      setMessages([...messages, res.data]);
      setTextChat("");
    } catch (err) {
      console.log(err);
    }



  }

    const onChangeGetTextChat = (e)=>{
      setTextChat(e.target.value)
    }


    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>Tim Hover</p>
            </div>
          </div>

         
        </div>
        <div className="content__body">
          <div className="chat__items">
            {/* {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })} */}
            <div ref={messagesEndRef} />
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
            <button className="btnSendMsg" id="sendMsgBtn" onClick = {CreateTexTChat}>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  
}