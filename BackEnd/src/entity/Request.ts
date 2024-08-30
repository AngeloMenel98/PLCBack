import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Request {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Relación con el usuario que hace la solicitud
  @ManyToOne(() => User, (user) => user.sentRequests)
  user: User;

  // Relación con el administrador que gestiona la solicitud
  @ManyToOne(() => User, (admin) => admin.receivedRequests)
  admin: User;

  @Column()
  machineName: string;

  @Column({ default: false })
  isAccepted: boolean;

  @Column("timestamp with time zone")
  insertedAt: string;
}
