import { Router } from "express";
import {
    createEmployee,
    getAllEmployees,
    addTemplateToEmployee,
    addRating,
    appraisal,
    getEmployeeById,
    appraisalStatusFilter,
    updateEmployee,
    acceptReviewer,
    acceptNormalizer,
    acceptAppraisalEmployee,
    rejectedReviewerValues,
    rejectedNormalizerValues,
    reviewerRejection,
    normalizerRejection,
    acceptReviewerRejectedAppraiser,
    acceptNormalizerRejectedAppraiser,
    appraisalStatusAppraiser,
    appraisalStatusReviewer,
    appraisalStatusNormalizer,
    filterByPotential,
    filterByRatings,
    testFilter,
    employeeRejection,
    normalizerAcceptsEmployee,
    normalizerRejectsEmployee,
    employeeRejectionSave,
    employeeUpdateMany

} from "../controllers/employee/employeeController";
import {advancedResults} from "../middleware/advancedResults";
import {Employee} from "../models";

const router = Router()
// @ts-ignore
router.route('/employee-filter').get(advancedResults(Employee), testFilter)
router.get('/zzzzzz', employeeUpdateMany)
router.get('/appraiser-status/:status', appraisalStatusAppraiser)
router.get('/reviewer-status/:status', appraisalStatusReviewer)
router.get('/normalizer-status/:status', appraisalStatusNormalizer)
router.patch('/reject-normalizer-values/:id',rejectedNormalizerValues )
 router.patch('/accept-reviewer', acceptReviewer)
router.patch('/accept-normalizer', acceptNormalizer)
router.patch('/reject-reviewer-values/:id', rejectedReviewerValues)
router.patch('/appraiser-accept-reviewer/:id', acceptReviewerRejectedAppraiser)
router.patch('/appraiser-accept-normalizer/:id', acceptNormalizerRejectedAppraiser)
router.patch('/normalizer-accept-employee/:id', normalizerAcceptsEmployee)
router.patch('/normalizer-reject-employee/:id', normalizerRejectsEmployee)
router.patch('/employee-reject-save/:id', employeeRejectionSave)

router.get('/filter/:status', getAllEmployees)

router.get('/:id', getEmployeeById)
// router.get('/filter/:status', appraisalStatusFilter)
router.post('/', createEmployee)
router.patch('/template/:id', addTemplateToEmployee)
router.get('/rating', addRating)
router.patch('/appraisal/:id', appraisal)
router.patch('/reviewer-rejection/:id', reviewerRejection)
router.patch('/normalizer-rejection/:id', normalizerRejection)
router.patch('/employee-rejection/:id', employeeRejection)
router.patch('/:id', updateEmployee)
router.get('/filter/potential/:status', filterByPotential)
router.get('/filter/:gt/:lt', filterByRatings)





router.patch('/accept-appraisal/:id', acceptAppraisalEmployee)





export default router
