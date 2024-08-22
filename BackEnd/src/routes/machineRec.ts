import { body, check } from "express-validator";
import validationMsg from "../constants/validationMessages";
import { Router } from "express";
import { machineRecController } from "../controllers";

const router = Router();

router.post("/saveReg", [
  body().isArray().withMessage("Debe ser un array de registros."),
  body("*.machineId")
    .not()
    .isEmpty()
    .withMessage(validationMsg.VALUE_IS_REQUIRED("machineId")),
  body("*.register")
    .not()
    .isEmpty()
    .withMessage(validationMsg.VALUE_IS_REQUIRED("registro")),
  body("*.value")
    .not()
    .isEmpty()
    .withMessage(validationMsg.VALUE_IS_REQUIRED("valor")),
  body("*.insertedAt")
    .not()
    .isEmpty()
    .withMessage(validationMsg.VALUE_IS_REQUIRED("insertado")),
  machineRecController.create.bind(machineRecController),
]);

export default router;
