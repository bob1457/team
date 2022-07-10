// import dotenv from 'dotenv';

// dotenv.config();

export const private_key = Buffer.from("process.env.JWT_SECRET", "base64").toString('ascii');

