import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Machine } from "./Machine";

@Entity()
export class MachineRec {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer")
  register: number;

  @Column("float")
  value: number;

  @Column("timestamp with time zone")
  insertedAt: string;

  @ManyToOne(() => Machine, (machine) => machine.machineRecs)
  machine: Machine;
}
