import { AppDataSource } from "../data-source";
import { MachineRec } from "../entity/MachineRec";

export const MachineRecRepository = AppDataSource.getRepository(
  MachineRec
).extend({
  async saveMachineRecs(machineRecs: MachineRec[]) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      const savedMachineRecs = [];

      for (const machineRec of machineRecs) {
        const machineRecToSave = {
          ...machineRec,
          insertedAt: new Date(parseInt(machineRec.insertedAt) * 1000),
        };

        const savedRec = await transactionalEntityManager
          .getRepository(MachineRec)
          .save(machineRecToSave);
        savedMachineRecs.push(savedRec);
      }

      return savedMachineRecs;
    });
  },
});
