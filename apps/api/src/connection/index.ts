import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()


// const pool = new Pool({
//     connectionString: `${process.env.DIRECT_URL}`,
//     ssl: {
//       rejectUnauthorized: false,  // Untuk menghindari masalah SSL
//     },
//     user: 'postgres',  // Biasanya 'postgres', jika menggunakan Service Role Key
//     password: SUPABASE_SERVICE_ROLE_KEY, // Gunakan Service Role Key untuk akses penuh
//     database: 'postgres',  // Biasanya database utama Supabase adalah 'postgres'
//     port: 5432, 
// });

// module.exports = {
//   query: (text: string, params: string) => pool.query(text, params)
// };


const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

export default prisma;
