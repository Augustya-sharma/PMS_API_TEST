import {Router} from "express";
import dashboardColor from "../models/DashboardColor";
import {validations,updateValidations} from "../controllers/launchcalendarvalidationsController";

const router = Router()


router.get('/ConfirmValidations',validations )
router.post('/updateValidations/:id',updateValidations )
export default router