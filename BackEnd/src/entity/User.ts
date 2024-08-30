import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { compareHash, hashValue } from "../helpers/bCrypt.helper";
import { IsEnum } from "class-validator";
import { Machine } from "./Machine";
import { Request } from "./Request";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column()
  isDeleted: boolean;

  @OneToMany(() => Machine, (machine) => machine.user)
  machines: Machine[];

  // Relación con las solicitudes hechas por el usuario
  @OneToMany(() => Request, (request) => request.user)
  sentRequests: Request[];

  // Relación con las solicitudes que el administrador gestiona
  @OneToMany(() => Request, (request) => request.admin)
  receivedRequests: Request[];

  async hashPassword(password: string): Promise<string> {
    return (this.password = hashValue(password));
  }

  compareHashPass(password: string) {
    return compareHash(password, this.password);
  }
}
