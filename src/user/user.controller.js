import UserService from "./user.service.js";


export const getUser = async (req, res) => {
  try {
    // const userService = new UserService();

    // const result = await userService.getUser();

    const result = await new UserService().getUser();

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

export const createUser = async (req, res) => {
  // const { username, password, firstname, lastname } = req.body;
  // let sql = `INSERT INTO users (username, password, firstname, lastname) VALUES ('${username}', '${password}', '${firstname}', '${lastname}')`;

  //วิธีที่2ดีสุด
  // const user = {
  //   username: req.body.username,
  //   password: req.body.password,
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  // };

  const user = req.body;

  try {
    // const userService = new UserService();

    // const [result] = await userService.createUser(user);

    const result = await new UserService().getUser();


    if (result.insertId) {
      res.status(200).send({
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


export const editUser = async (req, res) => {
  {
    const { username, firstname } = req.body;

    try {
      // const userService = new UserService();
      // const result = await userService.editUser(username, firstname);
      const result = await new UserService().getUser();


      if (result.affectedRows) {
        return res.status(200).send({
          status: "success",
          code: 1,
          message: "",
          cause: "",
          result,
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

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // const userService = new UserService();
    // const result = await userService.deleteUser(id);

    const result = await new UserService().getUser();

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

export const getUserID = async (req, res) => {
  try {
    const userService = new UserService();

    // const { id } = req.params;

    // const result = await userService.getUserID(id);
    const result = await new UserService().getUser();

    if (result.length) {
      return res.status(200).send({
        status: "success",
        code: 1,
        message: "",
        cause: "",
        result: result,
      });
    }
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




//affectedRows   post patch delete

//get  dleate    palam 

//insert id       post