import pkg from 'pg';
const { Client } = pkg;

import 'dotenv/config';

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

client.connect((err) => {
  if (err) {
    console.error('Failed to connect:', err);
    throw err;
  }
  console.log("Connected to PostgreSQL successfully!");
});

export default client;


// import { Sequelize } from 'sequelize-typescript';
// import 'dotenv/config';
// import User from '../models/userModel.js';
// import TasksModel from '../models/tasksModel.js';

// const sequelize = new Sequelize({
//     name: process.env.POSTGRES_DB,  // Changed from 'database' to 'name'
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     host: process.env.POSTGRES_HOST,
//     port: Number(process.env.POSTGRES_PORT),
//     dialect: 'postgres',
//     models: [User, TasksModel],
//     logging: console.log
// });

// export default sequelize;




// import { Sequelize }  from 'sequelize-typescript';
// import 'dotenv/config';
// import User from '../models/userModel.js';
// import TasksModel from '../models/tasksModel.js';
// // Import the model



// const sequelize = new Sequelize({
//     database: process.env.POSTGRES_DB,
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     host: process.env.POSTGRES_HOST,
//     port: Number(process.env.POSTGRES_PORT),
//     dialect: 'postgres',
//     models: [User, TasksModel], 
//     logging: console.log,  
// });

// export default sequelize;


