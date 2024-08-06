import dotenv from "dotenv";
// Do this first so everything else has the values
dotenv.config();

import "express-async-errors";
import { bootstrap } from "./core/bootstrap";

bootstrap();
