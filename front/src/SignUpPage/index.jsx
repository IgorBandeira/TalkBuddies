import { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUpPage = (props) => {
  const [username, setUsername] = useState("");
  const [secret, setSecret] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
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

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const onSignup = async (e) => {
    e.preventDefault();

    if (!validatePassword(secret)) {
      setError(
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra, um número e um caractere especial."
      );
      return;
    }

    try {
      const authResponse = await axios.post(
        "https://api.chatengine.io/accounts/login/",
        {
          email: process.env.REACT_APP_EMAIL,
          password: process.env.REACT_APP_PASSWORD,
        }
      );

      const token = authResponse.data.token;
      const headers = {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("username", username);
      formData.append("secret", secret);
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("avatar", avatar);

      const signUpResponse = await axios.post(
        `https://api.chatengine.io/projects/${process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}/people/`,
        formData,
        { headers }
      );

      console.log("SignUp Response:", signUpResponse.data);

      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message === "This username is taken.") {
          setError("E-mail já utilizado");
        } else {
          setError(error.response.data.message);
        }
        console.log(JSON.stringify(error.response.data));
      } else {
        setError("Erro desconhecido ao processar a solicitação.");
        console.error("Erro:", error);
      }
    }
  };

  return (
    <div className="signup-page bg-gradient-to-b from-purple-950 to-blue-400 flex justify-center items-center h-screen">
      <div className="mt-0" style={isMobile ? { marginTop: "-2%" } : {}}>
        {!isMobile ? (
          <img
            src="/assets/Talk_Buddies.png"
            alt="Talk Buddies"
            className="mt-0 mx-auto w-40 m-4 mb-0"
          />
        ) : null}

        <div className="card  rounded-lg p-8">
          <form onSubmit={onSignup} className="mt-0">
            <input
              type="email"
              name="username"
              placeholder="E-mail"
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`${
                isMobile ? "text-xs" : ""
              } mt-0 px-4 py-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="secret"
                placeholder="Senha"
                onChange={(e) => setSecret(e.target.value)}
                required
                className={`${
                  isMobile ? "text-xs" : ""
                } mt-4 px-4 py-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <input
              type="text"
              name="first_name"
              placeholder="Nome"
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={`${
                isMobile ? "text-xs" : ""
              } mt-4 px-4 py-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Sobrenome"
              onChange={(e) => setLastName(e.target.value)}
              required
              className={`${
                isMobile ? "text-xs" : ""
              } mt-4 px-4 py-2 block w-full rounded border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50`}
            />
            <div
              className={`${
                isMobile ? "text-xs" : ""
              } profile-picture-label mt-4 text-sm text-center text-gray-800`}
            >
              Foto de perfil
            </div>

            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
              className={`${isMobile ? "text-xs" : ""} mt-2 text-sm`}
            />
            {error && (
              <p
                className={`${
                  isMobile ? "text-xs" : ""
                } text-center text-red-900 text-sm font-bold mt-2`}
                style={isMobile ? { marginBottom: "-2%" } : {}}
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              style={isMobile ? { marginBottom: "-5%" } : {}}
              className={`${
                isMobile ? "text-xs" : ""
              } mt-4 mb-0 mx-auto bg-indigo-500 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 block`}
            >
              CADASTRAR
            </button>
          </form>
        </div>
        <div
          className={`${
            isMobile ? "text-xs" : ""
          } signup-link text-center mt-0`}
        >
          <p>
            Possui conta?{" "}
            <a href="/" className="text-gray-600 hover:underline">
              Entre
            </a>
          </p>
          <p className="text-xs text-blue-900">TalkBuddies © 2024</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
