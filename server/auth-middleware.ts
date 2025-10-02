import { Request, Response, NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    userId: string;
    username: string;
    role: string;
  }
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId) {
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId && req.session.role === "admin") {
    return next();
  }
  res.status(403).json({ error: "Admin access required" });
}

export function getCurrentUser(req: Request) {
  if (req.session && req.session.userId) {
    return {
      userId: req.session.userId,
      username: req.session.username,
      role: req.session.role,
    };
  }
  return null;
}
