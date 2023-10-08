import express from 'express';
const router = express.Router();

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';
import { createEmployee, deleteEmployeeId, getEmployee, getEmployeeByCompanyId, getEmployes, updateByEmployeeIdAndCompanyId } from '../controllers/employeeController.js';

router.use(isAuthenticatedUser);

router.route('/employes').get(getEmployes);
router.route('/employes/:id').get(getEmployee);
router.route('/companies/:company_id/employees').post(createEmployee);
router.route('/companies/:company_id/employees/:employee_id').put(updateByEmployeeIdAndCompanyId)
router.route('/employes/:id').delete(deleteEmployeeId)
router.route('/companies/:id/employees').get(getEmployeeByCompanyId)

export default router;