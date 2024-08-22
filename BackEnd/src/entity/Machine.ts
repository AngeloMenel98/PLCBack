import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MachineRec } from "./MachineRec";

@Entity()
export class Machine {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("character varying")
  name: string;

  @Column("character varying")
  ipAddress: string;

  @Column("integer")
  port: number;

  @OneToMany(() => MachineRec, (machineRec) => machineRec.machine)
  machineRecs: MachineRec[];
}
