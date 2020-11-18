import { Sequelize } from 'sequelize';

const conn = new Sequelize(
  `${process.env.DB_DRIVER}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
);

export default conn;
