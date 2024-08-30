import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { MachineRec } from "./MachineRec";
import { User } from "./User";

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

  @Column("timestamp with time zone")
  insertedAt: string;

  @Column("timestamp with time zone")
  updatedAt: string;

  @OneToMany(() => MachineRec, (machineRec) => machineRec.machine)
  machineRecs: MachineRec[];

  @ManyToOne(() => User, (user) => user.machines)
  user: User;
}
