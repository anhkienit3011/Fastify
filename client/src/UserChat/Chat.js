import React, {useState}  from 'react'
import './Chat.scss'
import Slibar from '../slibar/slibar'
import InputEmoji from "react-input-emoji";

export default function Chat(){

  const [text, setText] = useState("");

  const handleOnEnter = (text) => {
    console.log("enter", text);
  }

  return (  
<>
  <Slibar/>
  <div className="container leftchat">
    <div className="row">
      <section className="discussions">
        
        <scrollbars>
        <div className="discussion search">
          <div className="searchbar">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="Search..."></input>
          </div>
        </div>

        <div className="discussion message-active">
          <div className="photo" >
            <div className="online"></div>
          </div>
          <div className="desc-contact">
            <p className="name">Thu</p>
            <p className="message">Chat with me!!</p>
          </div>
          <div className="timer">12 sec</div>
        </div>

        <div className="discussion">
          <div className="photo" >
            <div className="online"></div>
          </div>
          <div className="desc-contact">
            <p className="name">Cuong</p>
            <p className="message">Chat with me!!!</p>
          </div>
          <div className="timer">3 min</div>
        </div>
        </scrollbars>

      </section>
      <section className="chat">
        <scrollbars>
        <div className="header-chat">
          <i className="icon fa fa-user-o" aria-hidden="true"></i>
          <p className="name">Thu</p>
        </div>
        <div className="messages-chat">
          <div className="message">
            <div className="photo" >
              <div className="online"></div>
            </div>
            <p className="text"> Hi, how are you ? </p>
          </div>
          <div className="message text-only">
            <p className="text"> Chat with me!!</p>
          </div>
          <p className="time"> 14h58</p>
           <div className="response">
              <p className="text"> chat with me!!</p>
            </div>
        </div>
        <div className="footer-chat">

        <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      placeholder="Type a message"
    />
    
          <i className="icon fa fa-picture-o clickable"><input type="file"></input></i>
          <button className="btn btn-lg btn-block">gửi<i className="fa fa-paper-plane clickable" aria-hidden="true"></i></button>
        </div>
        </scrollbars>
      </section>
    </div>
  </div>
</>

)}
  
    