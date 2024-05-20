import { Request, Response } from "express";
import Category from "../models";

class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const response = await Category.create({ name });
    return res.send(response);
  }
  catch(error: any) {
    res.send{( message: error.message )};
  }
}

export default new CategoryController();
