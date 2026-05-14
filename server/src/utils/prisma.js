// / import "dotenv/config";
// import {PrismaPg} from '@prisma/adapter-pg';
// import {PrismaClient} from '../generated/prisma/client.mts';

// const connectionString = `${process.env.DIRECT_URL}?sslmode=require`;

// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });

// export default prisma;
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.mts";

const base = process.env.DATABASE_URL;
const connectionString = base.includes("sslmode=") ? base : `${base}?sslmode=require`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default prisma;