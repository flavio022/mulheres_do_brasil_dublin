import db from "../database/connection";
import { Request, Response } from "express";

class DemographicController {
  async index(request: Request, response: Response) {
    const demographic = await db("demographic");

    const demographicItems = demographic.map(item => {
      return {
        ...item
      };
    });
    return response.json(demographicItems);
  }
  async create(request: Request, response: Response) {
    const { genre, country, state, old, profession } = request.body;

    const trx = await db.transaction();
    try {
      const demographic = {
        genre,
        country,
        state,
        old,
        profession
      };
      await trx("demographic").insert(demographic);
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
export default DemographicController;
