import { Request, Response } from "express";
import { User } from "../models";
import { IUser } from "../interfaces";
import { tokenize } from "../middleware";

class UserController {
  private handleError(res: Response, error: any): void {
    if (error.code === 11000) {
      res.status(400).json({ error: "E-mail já está em uso" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { mail, password, role } = req.body as IUser;
    try {
      const newUser = await User.create({ mail, password, role });
      res.status(201).json({ id: newUser._id, mail: newUser.mail });
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async list(_req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find({}, null, { sort: { mail: 1 } });
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    try {
      const user = await User.findByIdAndDelete(id);
      if (user) {
        res.json({ message: "Usuário deletado com sucesso" });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateMail(req: Request, res: Response): Promise<void> {
    const { id, mail } = req.body as { id: string; mail: string };
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { mail },
        { new: true, runValidators: true }
      );
      if (user) {
        res.json({ id: user._id, mail: user.mail });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  public async updatePassword(req: Request, res: Response): Promise<void> {
    const { id, password } = req.body as { id: string; password: string };
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { password },
        { new: true, runValidators: true }
      );
      if (user) {
        res.json({ message: "Senha atualizada com sucesso" });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { mail, password } = req.body as { mail: string; password: string };
    try {
      const user = await User.findOne({ mail, password }).select("+password");
      if (user) {
        res.json({ token: tokenize({ id: user._id }) });
      } else {
        res.status(401).json({ error: "Credenciais inválidas" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateRole(req: Request, res: Response): Promise<void> {
    const { id, role } = req.body as { id: string; role: "user" | "adm" };
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true, runValidators: true }
      );
      if (user) {
        res.json({ id: user._id, role: user.role });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
