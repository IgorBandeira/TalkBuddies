import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ChatsPage from "./ChatsPage";

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<SignUpPage onAuth={(user) => setUser(user)} />}
        />
        <Route
          path="/"
          element={<LoginPage onAuth={(user) => setUser(user)} />}
        />
        <Route path="/chats" element={<ChatsPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
