"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
require("dotenv/config");
const logger_config_1 = require("./config/logger.config");
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const routers_1 = __importDefault(require("./routers"));
const process_correlation_id_1 = require("./middlewares/process-correlation-id");
require("./services/cache");
const app = (0, express_1.default)();
const options = { customCssUrl: '/public/swagger-ui.css', customSiteTitle: "Blog API - Swagger" };
app.use([(0, body_parser_1.json)(), (0, body_parser_1.urlencoded)({ extended: false }), (0, cors_1.default)()]);
app.use(process_correlation_id_1.processCorrelationId);
if (process.env.ENVIRONMENT != "TEST") {
    app.use((0, logger_config_1.successLogger)());
}
(0, routers_1.default)(app);
if (process.env.ENVIRONMENT != "TEST") {
    app.use((0, logger_config_1.errorLogger)());
}
app.use(error_handler_1.default);
app.use(express_1.default.static('public'));
app.use('/', swagger_ui_express_1.default.serve);
app.get('/', swagger_ui_express_1.default.setup(swagger_json_1.default, options));
exports.default = app;
