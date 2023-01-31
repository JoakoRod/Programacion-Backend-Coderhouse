"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import path from 'path';
const randoms_1 = require("../../controllers/randoms");
//const scriptPath = path.resolve(__dirname, '../../controllers/randoms.ts');
const router = (0, express_1.Router)();
router.get('/randoms', (req, res, next) => {
    //const arrayNums = fork(scriptPath);
    const cant = req.query.cant || 100; //100.000.000 es mucho
    const arrayNums = (0, randoms_1.listaRandom)(Number(cant));
    /* arrayNums.send({ msg: 'random', cant: cant });
    arrayNums.on('message', array => {
        res.json(array);
    }) */
    res.json(arrayNums);
});
exports.default = router;
//# sourceMappingURL=randoms.js.map