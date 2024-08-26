import jwt from "jsonwebtoken";
import config from "./config.js";

export const validateReq = (req, res, next) => {
  const { username, firstname, lastname, password } = req.body;

  if (!firstname || !lastname || !password || !username) {
    res.status(500).send({
      status: "error",
      code: 0,
      message: "กรอกข้อมูลไม่ครบ  ",
      cause: "unknown",
    });
  }

  if (password.length < 4) {
    res.status(500).send({
      status: "error",
      code: 0,
      message: "รหัสผ่านสั้นเกินไป",
      cause: "unknown",
    });
  }

  next();
};

export const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    // console.log(authHeader);

    if (!authHeader) {
      res.status(401).send({
        message: "unauthorized",
        cause: "authhorization header not found",
      });
      return;
    }

    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhMyIsImZpcnN0bmFtZSI6IkFBQUEiLCJsYXN0bmFtZSI6ImFhYWFhYSIsImlhdCI6MTcxMzk0NTg3NCwiZXhwIjoxNzEzOTQ5NDc0fQ.ynNVy-NHr4PC3Oe3rwXDVNXDyrNej7mpq94tHIkc2b0"

    const [scheme, token] = authHeader.split(" ");

    const payload = jwt.verify(token, config.app.jwtkey);

    if (!payload || scheme !== "Bearer") {
      res.status(401).send({
        message: "unauthorized",
        cause: "invalid token",
      });
      return;
    }

    req.user = payload;
    console.log(payload);
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      res.status(401).send({
        status: "error",
        code: 0,
        message: "unauthorized",
        cause: "expired token",
      });
      return;
    }
    if (error.message === "invalid signature") {
      res.status(401).send({
        status: "error",
        code: 0,
        message: "unauthorized",
        cause: "invalid token",
      });
      return;
    }
    if (error.message === "invalid token") {
      res.status(401).send({
        status: "error",
        code: 0,
        message: "unauthorized",
        cause: "invalid token",
      });
      return;
    }
    res.status(500).send({
      status: "error",
      code: 0,
      message: "interal error",
      cause: "unknown",
    });
  }
};