"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.puerto = void 0;
const server_1 = __importDefault(require("./services/server"));
const database_1 = require("./services/database");
const minimist_1 = __importDefault(require("minimist"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const numCPUs = os_1.default.cpus().length;
const optionalArgsObject = {
    alias: {
        //Para pasar un alias a los argumentos que nos envian
        h: 'help',
        v: 'version',
        x: 'mialiasPersonalizado',
        m: 'message',
    },
    default: {
        //Si no nos envian el argumento, se setea por default
        port: process.env.PORT || '8080',
        cluster: false,
    },
};
const args = (0, minimist_1.default)(process.argv, optionalArgsObject);
exports.puerto = args.port;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        //initKnex();
        yield (0, database_1.initMongoDB)();
        const httpServer = server_1.default.listen(exports.puerto, () => console.log('Server up en puerto', exports.puerto));
        httpServer.on('error', (err) => console.log('ERROR (posiblemente puerto ocupado)', err));
    });
}
if (cluster_1.default.isPrimary && args.cluster) {
    console.log('MODO CLUSTER!');
    console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
        cluster_1.default.fork();
    });
}
else {
    console.log('salida normal');
    init();
}
//# sourceMappingURL=index.js.map