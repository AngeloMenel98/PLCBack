import { check } from "express-validator";
import validationMsg from "../constants/validationMessages";
import { Router } from "express";
import { machineController } from "../controllers";

const router = Router();

router.post(
  "/addMachine",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Nombre de Usuario")),
    check("ipAddress")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("IP Address")),
    check("port")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Puerto")),
    check("insertedAt")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Insertado")),
    check("updatedAt")
      .not()
      .isEmpty()
      .withMessage(validationMsg.VALUE_IS_REQUIRED("Actualizado")),
  ],
  machineController.add.bind(machineController)
);

export default router;
