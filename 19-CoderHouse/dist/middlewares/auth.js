"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isLoggedInPage = exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, done) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ msg: 'Unathorized' });
    done();
};
exports.isLoggedIn = isLoggedIn;
const isLoggedInPage = (req, res, done) => {
    if (!req.isAuthenticated())
        return res.redirect('/login');
    done();
};
exports.isLoggedInPage = isLoggedInPage;
const isAdmin = (req, res, done) => {
    if (!req.isAuthenticated())
        return res.status(401).json({ msg: 'Unathorized' });
    if (req.user.role != 'admin')
        return res.status(401).json({ msg: 'Unathorized - Admin Only' });
    done();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.js.map