import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

/* normalmente
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
*/

// this is needed because in developmwnt we don't want restart
// the sever with every change, but we want to make we don´t
// create a new connection to the DB with every chage either.

if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient();
}else{
    if (!global.__db) {
        global.__db = new PrismaClient();
    }
    db = global.__db;
}

export { db };