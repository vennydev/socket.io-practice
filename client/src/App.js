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
      console.log("채팅방 입장!");
      // 소켓명령어(소켓을 설정한 담당자가 설정한 변수명)와 방이름(데이터)을 보낸다
      socket.emit("join_room", room);
      // chat을 보여주기 위한 상태 관리. false-> true로 상태값 변경
      setShowChat(true);
    }
  };

  console.log(`username : ${username}`);
  console.log(`room : ${room}`);
  console.log(`showChat : ${showChat}`);

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
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
