import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";
import { MachineRecService } from "../services";
import { MachineRec } from "../entity";

export class MachineRecController {
  private machineRecService: MachineRecService;
  constructor() {
    this.machineRecService = new MachineRecService();
  }

  async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array().map((error) => ({
            message: error.msg,
          })),
        });
      }
      const machineRecs = req.body;

      const machRecs: MachineRec[] = await this.machineRecService.create(
        machineRecs
      );

      res.status(201).json(machRecs);
    } catch (e) {
      console.error("Error creating records:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new MachineRecController();
