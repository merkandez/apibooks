import { DataTypes } from 'sequelize';
import connection_db from '../database/connectionDb.js';

const bookModel = connection_db.define(
  'Book',
  {
    // Los atributos del modelo se definen aquí.
    bookTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
      // permitirNull por defecto es verdadero.
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      // permitirNull por defecto es verdadero.
    },
  },
  {
    TimeStamps: false, // Otras opciones de modelo irían aquí.
  }
);

export default bookModel;
// en script poner --silent o --verbose
