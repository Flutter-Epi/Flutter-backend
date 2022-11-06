// import LoginController from "./auth/loginController";
// import RegisterController from "./auth/registerController";
// import UserController from "./userController";
const LoginController = require("./auth/loginController");
const RegisterController = require("./auth/registerController");
const UserController = require("./userController");

// export { LoginController };
// export { RegisterController };
// export { UserController };
module.exports = { LoginController, RegisterController, UserController };