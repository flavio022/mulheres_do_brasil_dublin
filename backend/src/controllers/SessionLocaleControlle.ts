import db from "../database/connection";
import { Request, Response } from "express";

class SessionLocaleController {
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    try {
      await db("sessionLocale")
        .where("id", id)
        .del();
      return response.status(200).send();
    } catch (err) {
      return response.status(400).json({
        error: "Unexpected error while created new class"
      });
    }
  }
  async show(request: Request, response: Response) {
    const { organization_id } = request.params;
    const sessionItems = await db("sessionLocale").where(
      "organization_id",
      organization_id
    );
    const serializedSessionItem = sessionItems.map(item => {
      return {
        ...item,
        image_url: `http://192.168.0.12:3333/uploads/${item.image}`
      };
    });
    return response.json(serializedSessionItem);
  }
  async index(request: Request, response: Response) {
    const organizationId = await db("sessionLocale");

    const serializedSessionItem = organizationId.map(item => {
      return {
        ...item,
        image_url: `http://192.168.0.12:3333/uploads/${item.image}`
      };
    });
    return response.json(serializedSessionItem);
  }
  async create(request: Request, response: Response) {
    const {
      name,
      tel,
      email,
      value,
      description,
      organization_id
    } = request.body;
    const trx = await db.transaction();

    try {
      const sessionsItems = {
        name,
        tel,
        email,
        value,
        description,
        image: request.file.filename,
        organization_id
      };

      await trx("sessionLocale").insert(sessionsItems);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while created new class"
      });
    }
  }
}
export default SessionLocaleController;
