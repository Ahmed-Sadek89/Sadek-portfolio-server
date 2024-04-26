"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_routes_1 = __importDefault(require("./google.routes"));
const facebook_routes_1 = __importDefault(require("./facebook.routes"));
const github_routes_1 = __importDefault(require("./github.routes"));
const Visitors_controllers_1 = require("../controllers/Visitors.controllers");
const checkAuth_guard_1 = require("../guards/checkAuth.guard");
const router = (0, express_1.default)();
const visitorController = new Visitors_controllers_1.VisitorController();
// default OAuth2
router.get("/login/success", visitorController.getLoginSuccess);
router.get("/login/failed", visitorController.getLoginFailed);
router.get("/logout", visitorController.getLogout);
// google strategy
router.use("/google", google_routes_1.default);
// github strategy
router.use("/github", github_routes_1.default);
// facebook strategy
router.use("/facebook", facebook_routes_1.default);
// other main routes related to CRUD and JOIN
router.use(checkAuth_guard_1.checkAuth);
router.get("/:id", visitorController.getById);
router.get("/", visitorController.getAll);
router.get("/messages/:id", visitorController.getMessagesByVisitorId);
router.get("/notes/:id", visitorController.getnotesByVisitorId);
router.delete("/:id", visitorController.deleteById);
router.delete("/", visitorController.deleteAll);
exports.default = router;
