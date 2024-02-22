/** @format */
import { Response, Request, NextFunction } from "express";
import { prisma } from "..";
import { Prisma } from "@prisma/client";
import { ReqUser } from "../middleware/auth-middleware";

export const eventController = {
  async addEvent(req: ReqUser, res: Response, next: NextFunction) {
    try {
      const { image_url, name, description, date, location, price, type } =
        req.body;
      const newEvent: Prisma.EventCreateInput = {
        image_url,
        name,
        description,
        date,
        location,
        price,
        type,
        // User: {
        //   connect: {
        //     id: req.user?.id,
        //   },
        // },
      };
      await prisma.event.create({
        data: newEvent,
      });
      res.send({
        success: true,
        message: "event berhasil ditambahkan",
      });
    } catch (error) {
      next(error);
    }
  },
  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      const events = await prisma.event.findMany({
        include: {
          User: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        where: {
          name: {
            contains: String(name),
          },
        },
      });

      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      // console.log(req.params);

      const events = await prisma.event.findUnique({
        // include: {
        //   User: {
        //     select: {
        //       id: true,
        //       email: true,
        //       name: true,
        //     },
        //   },
        // },
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        result: events,
      });
    } catch (error) {
      next(error);
    }
  },
  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, image_url, price, description } = req.body;
      const editProduct: Prisma.EventUpdateInput = {
        image_url,
        name,
        price,
        description,
      };

      await prisma.event.update({
        data: editProduct,
        where: {
          id: Number(req.params.id),
        },
      });
      res.send({
        success: true,
        message: "data berhasil diedit",
      });
    } catch (error) {
      next(error);
    }
  },
  // async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await prisma.product.delete({
  //       where: {
  //         id: Number(req.params.id),
  //       },
  //     });
  //     res.send({
  //       success: true,
  //       message: "data berhasil dihapus",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};
