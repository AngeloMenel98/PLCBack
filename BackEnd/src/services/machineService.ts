import { Machine } from "../entity";
import { MachineRepository } from "../repository";

export class MachineService {
  constructor() {}

  async add(machine: Machine) {
    const saveMachine = await MachineRepository.save(machine);

    return saveMachine;
  }
}
