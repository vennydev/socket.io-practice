import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", username, room);
      socket.on("chat_list", (chat_list) => {
        chat_list.forEach(msg_obj => {
          msg_obj.msg.forEach(num => {
            if(num.room === room){
              console.log('이 방에 불러올 메시지가 있습니다.');
            }
          })
      });
        
      });
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>된다된다 채팅</h3>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="방 이름을 입력해주세요."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>채팅 입장</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
          setShowChat={setShowChat}
        />
      )}
    </div>
  );
}

export default App;
