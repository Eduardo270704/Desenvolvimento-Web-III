import { Request, Response } from "express";
import Category from "../models/Category";
import { ErrorResponse, ICategory } from "../interfaces";

class CategoryController {
  private handleError(res: Response, error: any): void {
    if (error.code === 11000) {
      res.status(400).json({ message: `O nome já está em uso` });
    } else if (error.errors?.name) {
      res.status(400).json({ message: error.errors.name.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }

  public async create(
    req: Request<any, any, ICategory>,
    res: Response<ICategory | ErrorResponse>
  ): Promise<void> {
    const { name } = req.body;
    try {
      const response = await Category.create({ name });
      res.status(201).json(response);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async list(
    _req: Request,
    res: Response<ICategory[] | ErrorResponse>
  ): Promise<void> {
    try {
      const categories = await Category.find({}).sort({ name: 1 });
      res.status(200).json(categories);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async update(
    req: Request<any, any, Partial<ICategory>>,
    res: Response<ICategory | { message: string }>
  ): Promise<void> {
    const { id, name } = req.body;
    try {
      const response = await Category.findByIdAndUpdate(
        id,
        { name },
        {
          new: true,
          runValidators: true,
        }
      );
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Registro inexistente" });
      }
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async delete(
    req: Request<{ id: string }>,
    res: Response<ICategory | { message: string }>
  ): Promise<void> {
    const { id } = req.params;
    try {
      const response = await Category.findByIdAndDelete(id);
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Registro inexistente" });
      }
    } catch (error: any) {
      this.handleError(res, error);
    }
  }
}

export default new CategoryController();
