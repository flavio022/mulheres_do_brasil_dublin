import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import OrganizationController from "./controllers/OrganizationController";
import SessionLocaleController from "./controllers/SessionLocaleControlle";
import DemographicController from "./controllers/DemographicController";

const routes = Router();
const uploads = multer(multerConfig);

const organizationController = new OrganizationController();
const sessionLocaleController = new SessionLocaleController();

const demographicController = new DemographicController();

routes.post(
  "/organization",
  uploads.single("image"),
  organizationController.create
);
routes.get("/organization", organizationController.index);
routes.post(
  "/organization",
  uploads.single("image"),
  organizationController.create
);
routes.get("/organizations/:organization_id", organizationController.show);
routes.delete("/organizations/:id", organizationController.delete);

routes.post(
  "/sessionLocale",
  uploads.single("image"),
  sessionLocaleController.create
);
routes.get("/sessionLocale", sessionLocaleController.index);
routes.get("/sessionLocale/:organization_id", sessionLocaleController.show);
routes.delete("/sessionLocale/:id", sessionLocaleController.delete);

routes.post("/demographic", demographicController.create);
routes.get("/demographic", demographicController.index);

export default routes;
