import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./App.css";

function Chat({ socket, username, room, setShowChat }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [author, setAuthor] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      // 접속한 방 이름, 유저이름, 작성한 메시지, 시간을 담은 data 객체
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      // 소켓 명령어와 함께 메시지 데이터를 보낸다
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
  socket.on(
    "receive_message",
    (messageData) => {
      setMessageList((list) => [...list, messageData]);
    });}
    ,[socket]
  );

  const leaveRoom = () => {
    console.log("leave!");
    setShowChat(false);
    socket.emit("leave_room", room ,messageList);
  };

  
  console.log(messageList);

  useEffect(() => {
    socket.on("welcome_msg", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>실시간 채팅</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          <h5 style={{ color: "green" }}>{room}번 방으로 </h5>
          <h4 style={{ color: "green" }}>{username}님이 입장하셨습니다</h4>
          
          {messageList.map((messageContent, idx) => {
            return (
              <div
                key={idx}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="내용을 입력해주세요."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      {/* <button onClick={leaveRoom}>방 나가기</button> */}
    </div>
  );
}

export default Chat;