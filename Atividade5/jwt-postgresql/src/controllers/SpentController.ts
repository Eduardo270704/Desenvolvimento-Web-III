import { Request, Response } from "express";
import { Spent } from "../models";

class SpentController {
  private handleError(res: Response, error: any): void {
    res.status(500).json({ error: error.message });
  }

  private async handleNotFound(res: Response): Promise<void> {
    res.status(404).json({ message: "Registro inexistente" });
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { product, datetime, value } = req.body;
    const { id: user } = res.locals;
    try {
      const response = await Spent.create({ user, product, datetime, value });
      res.status(201).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    try {
      const spents = await Spent.find({})
        .select("product user datetime value")
        .populate("product", "name")
        .populate("user", "mail")
        .lean()
        .sort({ datetime: -1 });

      const response = spents.map((spent: any) => ({
        id: spent._id,
        productName: spent.product.name,
        userMail: spent.user.mail,
        datetime: spent.datetime,
        value: spent.value,
      }));

      res.json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    try {
      const response = await Spent.findByIdAndDelete(id);
      if (!response) {
        return this.handleNotFound(res);
      }
      res.json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id, user, product, datetime, value } = req.body;
    try {
      const response = await Spent.findByIdAndUpdate(
        id,
        { user, product, datetime, value },
        { new: true, runValidators: true }
      );
      if (!response) {
        return this.handleNotFound(res);
      }
      res.json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }
}

export default new SpentController();
