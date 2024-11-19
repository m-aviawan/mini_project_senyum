import mySqlConnection from "@/connection/mysql2";
import { promisify } from "util";

const query = promisify(mySqlConnection).bind(mySqlConnection)