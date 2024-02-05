import express, { Request, Response } from "express";
import cors from "cors";
import axios, { AxiosError } from "axios";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const dotenv = require("dotenv");
dotenv.config();

const upload = multer({ dest: "uploads/" });

let chatEngineToken = "";

app.post("/signup", upload.single("avatar"), async (req, res) => {
  const { username, secret, first_name, last_name, avatar } = req.body;

  try {
    if (chatEngineToken === "") {
      return res
        .status(401)
        .json({ message: "Unauthorized: Please login first" });
    }

    const headers = {
      Authorization: `Token ${chatEngineToken}`,
    };

    const formData = new FormData();
    formData.append("username", username);
    formData.append("secret", secret);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("avatar", avatar);

    const response = await axios.post(
      `https://api.chatengine.io/projects/${process.env.CHAT_ENGINE_PROJECT_ID}/people/`,
      formData,
      { headers }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return res
        .status(axiosError.response.status)
        .json(axiosError.response.data);
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { username, secret } = req.body as { username: string; secret: string };

  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e: any) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
