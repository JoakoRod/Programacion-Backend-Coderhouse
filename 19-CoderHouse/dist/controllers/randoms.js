"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaRandom = void 0;
function listaRandom(cant) {
    const nums = [];
    for (let i = 0; i < cant; i++) {
        nums.push(Math.floor(Math.random() * (1000 - 1 + 1) + 1));
    }
    return nums;
}
exports.listaRandom = listaRandom;
process.on('message', (data) => {
    if (data.msg == 'random') {
        const sum = listaRandom(data.cant);
        if (typeof process.send === 'function') { //si no pongo el condicional, TS me tira un error.
            process.send(sum);
        }
    }
});
//# sourceMappingURL=randoms.js.map