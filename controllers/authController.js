import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import { handleHttpError } from "../utils/handleError.js";
import { encrypt, compare } from "../utils/handlePasword.js";

dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await encrypt(password);

    const existingUserByEmail = await userModel.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "El email ya está registrado, viejo tonto" });
    }

    const existingUserByName = await userModel.findOne({ where: { name } });
    if (existingUserByName) {
      return res.status(409).json({ message: "El nombre ya está en uso" });
    }
    const newUser = {
      name,
      email,
      password: passwordHash,

    };
    await userModel.create(newUser);

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};
/* import bcrypt from 'bcrypt';

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el email ya está registrado
    const existingUserByEmail = await userModel.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(409).json({ message: "El email ya está registrado, viejo tonto" });
    }

    // Verificar si el nombre ya está en uso
    const existingUserByName = await userModel.findOne({ where: { name } });
    if (existingUserByName) {
      return res.status(409).json({ message: "El nombre ya está en uso" });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario con la contraseña hasheada
    const newUser = {
      name,
      email,
      password: hashedPassword, // Guardar la contraseña hasheada
    };

    await userModel.create(newUser);

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};
 */

export const loginController = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const loginPassword = req.body.password;
  

    const user = await userModel.findOne({ where: { email: userEmail } });
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }
const passwordHashed = user.password;
const checkPassword = await compare(loginPassword, passwordHashed);
    if (!checkPassword) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    const sessionData = {
      user: user,
    };

    res.send({ sessionData });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};
/* export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    // Comparar la contraseña ingresada con la guardada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return;
    }

    const sessionData = {
      user: user,
    };

    res.send({ sessionData });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};
 */