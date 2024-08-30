import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { isServiceCodeError } from "../errors/errors";
import { MachineService } from "../services";
import { Machine } from "../entity";

export class MachineController {
  private machineService: MachineService;
  constructor() {
    this.machineService = new MachineService();
  }

  async add(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            message: error.msg,
          })),
        });
      }
      const machine = req.body;

      const resMach: Machine = await this.machineService.add(machine);

      res.status(201).json(resMach);
    } catch (e) {
      console.error("Error creating records:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new MachineController();
