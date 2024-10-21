import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import { handleHttpError } from "../utils/handleError.js";
dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
      password,
    };
    await userModel.create(newUser);

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const loginController = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const loginPassword = req.body.password;

    const user = await userModel.findOne({ where: { email: userEmail } });
    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return;
    }

    if (loginPassword !== user.password) {
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