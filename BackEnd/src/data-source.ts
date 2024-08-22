import "reflect-metadata";
import { DataSource } from "typeorm";
import { MachineRec } from "./entity/MachineRec";
import { Machine } from "./entity/Machine";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 6543,
  username: "angelo",
  password: "M4rv3lvsDC",
  database: "plc_sensors",
  synchronize: true,
  logging: false,
  entities: [MachineRec, Machine],
  migrations: [],
  subscribers: [],
});
