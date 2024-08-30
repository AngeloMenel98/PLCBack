import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import { UserService } from "../services";
import { User, UserRole } from "../entity/User";
import { isServiceCodeError, isUserServiceError } from "../errors/errors";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async logIn(req: Request, res: Response) {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(401).json({
          error: errs.array().map((e) => ({
            msg: e.msg,
          })),
        });
      }

      const { username, password } = req.body;

      const user = await this.userService.logIn(username, password);

      const response = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(response, secretKey);

      const tokenJSON = {
        token: token,
      };

      res.status(201).json(tokenJSON);
    } catch (e) {
      console.error("Error Loggin In", e);

      if (isUserServiceError(e)) {
        return res.status(400).json({ error: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(401).json({
          error: errs.array().map((e) => ({
            msg: e.msg,
          })),
        });
      }

      const { username, email, password } = req.body;

      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.hashPassword(password);
      newUser.isDeleted = false;
      newUser.role = UserRole.USER;

      const user = await this.userService.create(newUser);

      const response = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      res.status(201).json(response);
    } catch (e: unknown) {
      console.error("Error creating user:", e);

      if (isUserServiceError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(401).json({
          errors: errs.array().map((e) => ({
            msg: e.msg,
          })),
        });
      }

      const { userId, password } = req.body;

      const user = await this.userService.findById(userId);

      const updatedUser = new User();
      updatedUser.username = user.username;
      updatedUser.email = user.email;
      updatedUser.hashPassword(password);
      updatedUser.role = UserRole.USER;

      const resUser = await this.userService.update(updatedUser);

      const response = {
        id: resUser.id,
        username: resUser.username,
        email: resUser.email,
      };

      res.status(201).json(response);
    } catch (e) {
      console.error("Error updating user:", e);

      if (isServiceCodeError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const errs = validationResult(req);
      if (!errs.isEmpty()) {
        return res.status(401).json({
          errors: errs.array().map((e) => ({
            msg: e.msg,
          })),
        });
      }

      const { userId } = req.body;
      const user = await this.userService.findById(userId);

      const resp = await this.userService.delete(user);
      const response = {
        id: resp.id,
        username: resp.username,
        email: resp.email,
      };
      res.status(201).json(response);
    } catch (e) {
      console.error(e);
      if (isUserServiceError(e)) {
        return res.status(400).json({ errors: [{ msg: e.message }] });
      }

      res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
    }
  }
}

export default new UserController();
