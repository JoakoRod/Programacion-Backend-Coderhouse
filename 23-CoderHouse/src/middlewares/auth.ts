import { Context, Next } from 'koa';

export const isLoggedIn = (ctx: Context | any, done: Next) => {
  if (!ctx.isAuthenticated()) return ctx.status(401).json({ msg: 'Unathorized' });
  done();
};

export const isLoggedInPage = (ctx: Context | any, done: Next) => {
  if (!ctx.isAuthenticated()) {
    return ctx.redirect('/login');
  }
  done();
};

export const isAdmin = (ctx: Context | any, done: Next) => {
  if (!ctx.isAuthenticated()) return ctx.status(401).json({ msg: 'Unathorized' });
  if (ctx.user.role != 'admin') return ctx.status(401).json({ msg: 'Unathorized - Admin Only' });
  done();
};