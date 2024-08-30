import { In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Machine, MachineRec } from "../entity";

export const MachineRecRepository = AppDataSource.getRepository(
  MachineRec
).extend({
  async saveMachineRecs(machineRecs: any[]) {
    return this.manager.transaction(async (transactionalEntityManager) => {
      const savedMachineRecs = [];

      // Extraer todos los machineIds únicos
      const machineIds = Array.from(
        new Set(machineRecs.map((rec) => rec.machineId))
      );

      // Buscar todas las máquinas necesarias en una sola consulta
      const machines = await transactionalEntityManager
        .getRepository(Machine)
        .findBy({ id: In(machineIds) }); // Usa el operador 'In' para buscar múltiples IDs

      // Crear un mapa para acceder rápidamente a las máquinas por ID
      const machineMap = new Map(
        machines.map((machine) => [machine.id, machine])
      );

      for (const machineRec of machineRecs) {
        const machine = machineMap.get(machineRec.machineId);

        if (!machine) {
          throw new Error(`Machine with ID ${machineRec.machineId} not found`);
        }

        const machineRecToSave = {
          register: machineRec.register,
          value: machineRec.value,
          insertedAt: new Date(parseInt(machineRec.insertedAt) * 1000),
          machine: machine,
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
