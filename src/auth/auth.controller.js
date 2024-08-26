import AuthService from "./auth.service.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await new AuthService().login(username, password);
    if (user) {
      const token = jwt.sign(user, config.app.jwtkey, {
        expiresIn: "1h",
      });

      return res.status(200).send({
        status: "success",
        code: 1,
        message: "",
        cause: "",
        user,
        token,
      });
    }

    res.status(401).send({
      status: "fail",
      code: 0,
      message: "unauthorized", // ถ้าไม่มีข้อมูลหรือ syntax ผิดจะไม่แสดงอะออกมา แต่ ถ้า error จะแสดงอะออกมา
      cause: "username หรือ password ไม่ถูกต้อง",
      result: {},
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      code: 0,
      message: error.message, // ถ้าไม่มีข้อมูลหรือ syntax ผิดจะไม่แสดงอะออกมา แต่ ถ้า error จะแสดงอะออกมา
      cause: "",
      result: "",
    });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await new AuthService().profile(id);
    if (user) {
      return res.status(200).send({
        status: "success",
        code: 1,
        message: "-",
        cause: "-",
        result: user,
      });
    }

    res.status(401).send({
      status: "fail",
      code: 0,
      message: "unauthorized", // ถ้าไม่มีข้อมูลหรือ syntax ผิดจะไม่แสดงอะออกมา แต่ ถ้า error จะแสดงอะออกมา
      cause: "",
      result: {},
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      code: 0,
      message: error.message, // ถ้าไม่มีข้อมูลหรือ syntax ผิดจะไม่แสดงอะออกมา แต่ ถ้า error จะแสดงอะออกมา
      cause: "",
      result: "",
    });
  }
};
