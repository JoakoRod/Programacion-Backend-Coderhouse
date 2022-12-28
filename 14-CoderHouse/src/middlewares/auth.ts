import { Response, NextFunction } from "express";

export const isLoggedIn = (req: any, res: Response, done: NextFunction) => {
  if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Unathorized' });
  done();
};

export const isLoggedInPage = (req: any, res: Response, done: NextFunction) => {
  if (!req.isAuthenticated()) return res.redirect('/login');
  done();
};

export const isAdmin = (req: any, res: Response, done: NextFunction) => {
  if (req.user.role != 'admin') return res.status(401).json({ msg: 'Unathorized - Admin Only' });
  done();
};