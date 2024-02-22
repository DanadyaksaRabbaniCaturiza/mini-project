/** @format */
import { Response, Request, NextFunction } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma, secretKey } from "..";
import { sign, verify } from "jsonwebtoken";

type TUser = {
  email: string;
};

export const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role } = req.body;
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const newUser: Prisma.UserCreateInput = {
        name,
        email,
        password: hashedPassword,
        role,
      };

      const checkUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (checkUser?.id) throw Error("user sudah terdaftar");

      await prisma.user.create({
        data: newUser,
      });
      res.send({
        success: true,
        message: "berhasil register",
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.query;
      const user = await prisma.user.findUnique({
        where: {
          email: String(email),
        },
      });

      if (!user) throw Error("email/password salah");
      const checkPassword = await compare(String(password), user.password);

      const resUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      if (checkPassword) {
        const token = sign(resUser, secretKey, {
          expiresIn: "24hr",
        });

        return res.send({
          success: true,
          result: resUser,
          token,
        });
      }
      throw Error("email/password tidak ditemukan");
    } catch (error) {
      next(error);
    }
  },
  async forgotPass(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, email } = req.body;
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      const userEditPassword: Prisma.UserUpdateInput = {
        password: hashedPassword,
      };
      await prisma.user.update({
        data: userEditPassword,
        where: {
          email: String(email),
        },
      });
      res.send({
        success: true,
        message: "berhasil merubah password",
      });
    } catch (error) {
      next(error);
    }
  },
  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) throw Error("unauthorized");

      const verifyUser = verify(authorization, secretKey) as TUser;
      const checkUser = await prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
        where: {
          email: verifyUser.email,
        },
      });
      if (!checkUser) throw Error("unauthorized 2");

      const token = sign(checkUser, secretKey, {
        expiresIn: "24hr",
      });
      res.send({
        success: true,
        result: checkUser,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};
