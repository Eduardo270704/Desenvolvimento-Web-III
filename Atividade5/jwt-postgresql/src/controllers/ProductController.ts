import { Request, Response } from "express";
import { Product } from "../models";
import { IProduct } from "../interfaces";

class ProductController {
  private handleError(res: Response, error: any): void {
    if (error.code === 11000) {
      res.status(400).json({ error: "Nome já está cadastrado" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }

  private async handleNotFound(res: Response): Promise<void> {
    res.status(404).json({ error: "Produto não encontrado" });
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { name, category } = req.body as IProduct;
    try {
      const newProduct = await Product.create({ name, category });
      res.status(201).json({ id: newProduct._id, name: newProduct.name });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async list(_: Request, res: Response): Promise<void> {
    try {
      const products = await Product.find({})
        .select("name category")
        .populate("category", "name")
        .sort({ name: 1 });

      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return this.handleNotFound(res);
      }
      res.json({ message: "Produto deletado com sucesso" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id, name, category } = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: { name, category } },
        { new: true, runValidators: true }
      );
      if (!updatedProduct) {
        return this.handleNotFound(res);
      }
      res.json(updatedProduct);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }
}

export default new ProductController();
