import registerservice from './register.service.js';
import jwt from "jsonwebtoken";
import config from "../config.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import md5 from 'md5';

export const postregister = async (req, res) => {
    const { firstname, lastname, phone ,s_id} = req.body;
    try {
        const postregister = await new registerservice().postregister(firstname, lastname, phone, s_id);
        if (postregister.insertId) {
          return res.status(200).send({
            status: "success",
            code: 1,
            message: "-",
            cause: "-",
            phone: "",
            result: postregister,
          });
        }
    
     
      } catch (error) {
        res.status(500).send({
          status: "fail",
          code: 0,
          message: error.message, // ถ้าไม่มีข้อมูลหรือ syntax ผิดจะไม่แสดงอะออกมา แต่ ถ้า error จะแสดงอะออกมา
          cause: "",
          phone: "",
          result: "",
        });
      }
}


export const postuser = async (req, res) => {
    const user = {
      users: req.body.users,
      password: md5(req.body.password)
    }
    // console.log(user)
    
    
    try {
        const postusers = await new registerservice().area(user);
        if (postusers.insertId) {
          return res.status(200).send({
            status: "success",
            code: 1,
            message: "-",
            cause: "-",
            result: postusers,
          });
        }
      } catch (error) {
        res.status(500).send({
          status: "fail",
          code: 0,
          message: error.message, // ถ้าไม่มีข้อมูลหรือ syntax ผิดจะไม่แสดงอะออกมา แต่ ถ้า error จะแสดงอะออกมา
          cause: "",
          result: "",
        });
      }

}



export const editregister = async (req, res) => {
  {
    const users = req.body;
    console.log("test");
    console.log(users);
    try {
      const result = await  new registerservice().editregister(users);

      if (result.affectedRows) {
        return res.status(200).send({
          status: "success",
          code: 1,
          message: "",
          cause: "",
          result: result,
        });
      }
      res.status(500).send({
        status: "fail",
        code: 0,
        message: "",
        cause: "",
        result: "",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "fail",
        code: 0,
        message: error.message,
        cause: "",
        result: "",
      });
    }
  }
};



export const loginmember = async (req, res) => {
  const { users,password } = req.body;
  const passwordhard = md5(password)
  try {
      const user = await new registerservice().loginmember(users, passwordhard);
      if (user) {

        const token = jwt.sign(user, config.app.jwtkey, {
          expiresIn: "1h",
        });

        return res.status(200).send({
          status: "success",
          code: 1,
          message: "-",
          cause: "-",
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
        result: ""
      });
    }
}




export const getmember = async (req, res) => {
  const { id } = req.user;
  try {
    const result = await new registerservice().getmember(id);
    if (result.length) {
      return res.status(200).send({
        status: "success",
        code: 1,
        message: "",
        cause: "",
        result: result,
      });
    }
    res.status(200).send({
      status: "success",
      code: 0,
      message: "",
      cause: "",
      result: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      code: 0,
      message: error.message, // ถ้าไม่มีข้อมูลหรือ syntax ผิดจะไม่แสดงอะออกมา แต่ ถ้า error จะแสดงอะออกมา
      cause: "",
      result: "",
    });
  }
};



export const editsign_in = async (req, res) => {
  {
    const users = req.body;
    // console.log("signin");
    console.log(users);
    try {
      const result = await  new registerservice().editsign_in(users);
      if (result.affectedRows) {
        return res.status(200).send({
          status: "success",
          code: 1,
          message: "",
          cause: "",
          result: result,
        });
      }
      res.status(500).send({
        status: "fail",
        code: 0,
        message: "",
        cause: "",
        result: "",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "fail",
        code: 0,
        message: error.message,
        cause: "",
        result: "",
      });
    }
  }
};


export const getfood_recipes = async (req, res) => {
  try {

    const user = req.params;
    const result = await new registerservice().getfood_recipes(user);

    if (result.length) {
      return res.status(200).send({
        status: "success",
        code: 1,
        message: "",
        cause: "",
        result: result,
      });
    }
    res.status(200).send({
      status: "success",
      code: 0,
      message: "",
      cause: "",
      result: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      code: 0,
      message: error.message, // ถ้าไม่มีข้อมูลหรือ syntax ผิดจะไม่แสดงอะออกมา แต่ ถ้า error จะแสดงอะออกมา
      cause: "",
      result: "",
    });
  }
};



export const editrecipes = async (req, res) => {
  // const { id } = req.params;
  const recipes = req.body;
  
  let img
  if (req.files) {
    img = req.files.food_picture;
  }
  // console.log(req.files.food_picture);

  
  try {
    if (img) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
  
    const uploadsDir = path.join(__dirname,"../../../../test/front/assets/uploads/food_recipes");
      
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
  
    sampleFile = img;
    console.log(sampleFile.name);
  
    uploadPath = path.join(uploadsDir, sampleFile.name);
  
    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    recipes.food_picture = sampleFile.name;

    const result = await new registerservice().editrecipes(recipes);
    if (result.affectedRows) {
      return res.status(200).send({
        status: "success",
        code: 1,
        message: "",
        cause: "",
        result,
        uploadsDir
      });
    }
  } else {
    const result = await new registerservice().editrecipes(recipes);
    if (result.affectedRows) {
      return res.status(200).send({
        status: "success",
        code: 1,
        message: "",
        cause: "",
        result
      });
    }
  }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      code: 0,
      message: error.message,
      cause: "",
      result: "",
    });
  }
};


export const createrecipes = async (req, res) => {

  const {name, recipes, food_type,sign_id} = req.body;
  
  const img = req.files.food_picture;

  
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
  
    const uploadsDir = path.join(__dirname,"../../../../test/front/assets/uploads/food_recipes");
  
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
  
    sampleFile = img;
    console.log(sampleFile.name);
  
    uploadPath = path.join(uploadsDir, sampleFile.name);
  
    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    const result = await new registerservice().createrecipes(name, recipes, food_type,sampleFile.name,sign_id);
    if (result.insertId) {
      return res.status(200).send({
        status: "success",
        code: 1,
        message: "",
        cause: "",
        result,
        uploadsDir
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      code: 0,
      message: error.message,
      cause: "",
      result: "",
    });
  }
};


export const deletefood_recipes = async (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  try {

    const result = await new registerservice().deletefood_recipes(id);

    if (result.affectedRows) {
      return res.status(200).send({
        status: "success",
        code: 1,
        message: "",
        cause: "",
        result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "fail",
      code: 0,
      message: error.message,
      cause: "",
      result: "",
    });
  }
};