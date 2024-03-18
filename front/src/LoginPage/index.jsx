import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";

const LoginPage = (props) => {
  const [secret, setSecret] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerHeight < 574);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("https://talk-buddies-server.vercel.app/login", {
        username,
        secret,
      })
      .then((r) => {
        props.onAuth({ ...r.data, secret });
        navigate("/chats");
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.data.detail ===
            "Authentication credentials were not provided."
        ) {
          setError("E-mail ou senha incorretos.");
        }
        console.log(JSON.stringify(e.response.data));
      });
  };

  return (
    <div className="login-page bg-gradient-to-b from-purple-950 to-blue-400 flex justify-center items-center h-screen">
      <div className={`${isMobile ? "mt-24" : "mt-32"}`}>
        <img
          src="/assets/Talk_Buddies.png"
          alt="Talk Buddies"
          className={`${
            isMobile ? "mt-4 w-48" : "mt-24 w-60"
          } absolute top-0  m-4`}
        />

        <div className="card  rounded-lg p-8">
          <form
            onSubmit={onLogin}
            className={`${isMobile ? "mt-12" : "mt-16"}`}
          >
            <input
              type="email"
              name="username"
              placeholder="E-mail"
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`${
                isMobile ? "text-xs" : ""
              } mt-4 px-4 py-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
            />
            <div className="flex items-center mt-4">
              <input
                type={showPassword ? "text" : "password"}
                name="secret"
                placeholder="Senha"
                onChange={(e) => setSecret(e.target.value)}
                required
                className={`${
                  isMobile ? "text-xs" : ""
                } px-4 py-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              type="submit"
              style={isMobile ? { marginBottom: "-10%" } : {}}
              className={`${
                isMobile ? "text-xs" : ""
              } mt-4 mb-0 mx-auto bg-indigo-500 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 block`}
            >
              ENTRAR
            </button>
          </form>
        </div>
        {error && (
          <p
            className={`${
              isMobile ? "text-xs" : ""
            } text-center text-red-900 text-sm font-bold mb-2`}
          >
            {error}
          </p>
        )}
        <div
          className={`${
            isMobile ? "text-xs" : ""
          } signup-link text-center mt-0 text-sm`}
        >
          <p>
            Não tem conta?{" "}
            <a href="/signup" className="text-gray-600 hover:underline">
              Cadastre-se
            </a>
          </p>
          <p className="text-xs text-blue-900">TalkBuddies © 2024</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
