import {neon} from "@neondatabase/serverless"
import dotenv from "dotenv"

dotenv.config();

const { PGHOST ,PGDATABASE ,PGUSER ,PGPASSWORD}=process.env;

export const sql =neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);

// postgresql://neondb_owner:npg_FBvmtu1xpKL5@ep-jolly-waterfall-b1o14ski-pooler.c-5.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
