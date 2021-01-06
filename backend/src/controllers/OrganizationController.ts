import db from "../database/connection";
import { Request, Response } from "express";

class OrganizationController {
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    try {
      await db("organizations")
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
    const organization = await db("organizations").where("id", organization_id);
    const organizationItem = organization.map(item => {
      return {
        ...item,
        image_url: `http://192.168.0.12:3333/uploads/${item.image}`
      };
    });
    return response.json(organizationItem);
  }

  async index(request: Request, response: Response) {
    const organizationId = await db("organizations");

    const serializedOrganizationItem = organizationId.map(item => {
      return {
        ...item,
        image_url: `http://192.168.0.12:3333/uploads/${item.image}`
      };
    });
    return response.json(serializedOrganizationItem);
  }
  async create(request: Request, response: Response) {
    const { name } = request.body;
    const trx = await db.transaction();
    try {
      const organization = {
        name,
        image: request.file.filename
      };
      await trx("organizations").insert(organization);
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
export default OrganizationController;
