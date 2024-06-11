import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const secret = process.env.JWT_SECRET || "";

const tokenize = (object: any) => jwt.sign(object, secret);

const validateAccess = (req: Request, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) {
    res.status(401).send({ error: "Efetue o login para continua" });
  } else {
    try {
      const [, token] = authorization.split(" ");
      const decoded = <any>jwt.verify(token, secret);
      if (decoded) {
        res.locals = decoded;
        next();
      } else {
        res.status(401).send({ error: "Não autorizado" });
      }
    } catch (e: any) {
      if (e.message === "jwt malformed") {
        res.status(401).send({ error: "Token inválido" });
      } else {
        res.status(401).send({ error: e.message });
      }
    }
  }
};

const checkAdm = (_: Request, res: Response, next: NextFunction) => {
  const { role } = res.locals;
  if (role === "adm") {
    next();
  } else {
    res.status(401).send({ error: "Acesso negado" });
  }
};

export { tokenize, validateAccess, checkAdm };
