import { MachineRec } from "../entity";

import { MachineRecRepository } from "../repository";

export class MachineRecService {
  constructor() {}

  async create(machineRecs: MachineRec[]) {
    const saveMachineRec = await MachineRecRepository.saveMachineRecs(
      machineRecs
    );

    return saveMachineRec;
  }
}
