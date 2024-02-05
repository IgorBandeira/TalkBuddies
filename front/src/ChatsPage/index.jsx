import { PrettyChatWindow } from "react-chat-engine-pretty";
import Navbar from "../components/Navbar";
import "../index.css";

const ChatsPage = (props) => {
  return (
    <>
      <Navbar />
      <div style={{ height: "100vh", width: "100vw" }}>
        <PrettyChatWindow
          projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
          username={props.user.username}
          secret={props.user.secret}
          style={{ height: "50%" }}
        />
      </div>
    </>
  );
};

export default ChatsPage;
