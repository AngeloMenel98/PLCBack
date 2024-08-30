import { AppDataSource } from "../data-source";
import { Machine } from "../entity";

export const MachineRepository = AppDataSource.getRepository(Machine).extend(
  {}
);
