import { Sequelize } from 'sequelize'
import {
    DB_DEV_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_TEST_NAME,
    NODE_ENV,
} from '../config.js'

const DB_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : DB_DEV_NAME

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false,
    },
})

export default sequelize