import { check } from "express-validator";
import validationMsg from "../constants/validationMessages";
import { userController } from "../controllers";
import { Router } from "express";

const router = Router();

const PASSWORD_LENGTH = 8;

router.post(
  "/login",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Nombre de Usuario")),
    check("password")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Contraseña")),
  ],
  userController.logIn.bind(userController)
);

router.post(
  "/addUser",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Nombre de Usuario")),
    check("email")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Email")),
    check("password")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Contraseña"))
      .isLength({ min: PASSWORD_LENGTH })
      .withMessage(validationMsg.PASSWORD_LENGTH_RESTRICTION(PASSWORD_LENGTH)),
  ],
  userController.create.bind(userController)
);

export default router;
