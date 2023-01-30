export function listaRandom(cant: number) {
    const nums: number[] = [];
    for (let i = 0; i < cant; i++) {
        nums.push(Math.floor(Math.random() * (1000 - 1 + 1) + 1));
    }
    return nums
}

process.on('message', (data: { msg: string; cant: number; }) => {
    if (data.msg == 'random') {
        const sum = listaRandom(data.cant);
        
        if (typeof process.send === 'function') { //si no pongo el condicional, TS me tira un error.
            process.send(sum);
        }
    }

});