import { DataSource } from "typeorm";
import { MyLogger } from "../config/logger.js";
import bookEntity from "./entity/book.entity.js";
const connection = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "xiaomi6x",
  database: "english",
  logging: true,
  synchronize:true,
  logger: new MyLogger(),
  entities: [bookEntity],
});
export default connection