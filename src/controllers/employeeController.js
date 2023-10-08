import Employee from '../models/employees.js';
import Company from '../models/companies.js';
import catchAsyncErrors from '../middlewares/catchAsyncError.js';
import sendEmail from '../utils/sendEmail.js';

// Get employe   =>    {{url}}/api/employes
export const getEmployes = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.find();
  res.status(200).json({
    status: 200,
    code: 200,
    data: employee,
    message: 'Success'
  });
});

// Post Employee  => {{url}}/api/companies/:company_id/employees
export const createEmployee = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone_number, jobtitle } = req.body;
  const company_id = req.params.company_id;

  const employee = await Employee.create({
    name,
    email,
    phone_number,
    jobtitle,
    company_id
  });

  const message = `Conratulation for new posision in my company`;

  try {
    await sendEmail({
      email: email,
      subject: 'Kontrak Kerja',
      message
    });
    res.status(201).json({
      status: 201,
      code: 201,
      data: {
        id: employee.id,
        company_id: employee.company_id
      },
      message: 'Success'
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//  Get Employee By Company id  => {{url}}/api/companies/:id/employees
export const getEmployeeByCompanyId = catchAsyncErrors(
  async (req, res, next) => {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return next(new ErrorHandler('Company not found', 404));
    }

    const employees = await Employee.find({ company_id: companyId });

    const response = {
      status: 200,
      code: '200',
      data: {
        id: company.id,
        company_name: company.company_name,
        is_active: company.is_active,
        employees: employees.map((employee) => ({
          id: employee.id,
          name: employee.name,
          phone_number: employee.phone_number,
          jobtitle: employee.jobtitle
        }))
      },
      message: 'Success'
    };

    res.status(200).json(response);
  }
);

// Get a single emoloyee by id   =>  /api/v1/employes/:id
export const getEmployee = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employee.findById({ _id: req.params.id });

  if (!employe || employe.length === 0) {
    return next(new ErrorHandler('Job not found', 404));
  }

  res.status(200).json({
    status: 201,
    code: 201,
    data: employe,
    message: 'Success'
  });
});

// Update a single emoloyee by id   =>  {{url}}/api/companies/:company_id/employees/:employee_id
export const updateByEmployeeIdAndCompanyId = catchAsyncErrors(
  async (req, res, next) => {
    try {
      // Find the employee by their ID and the company's ID
      const employee = await Employee.findOne({
        _id: req.params.employee_id,
        company_id: req.params.company_id
      });

      if (!employee) {
        return next(new ErrorHandler('Employee not found', 404));
      }

      // Update employee properties based on the request body
      if (req.body.name) {
        employee.name = req.body.name;
      }
      if (req.body.email) {
        employee.email = req.body.email;
      }
      if (req.body.phone_number) {
        employee.phone_number = req.body.phone_number;
      }
      if (req.body.jobtitle) {
        employee.jobtitle = req.body.jobtitle;
      }

      // Save the updated employee
      await employee.save();

      res.status(200).json({
        status: 200,
        code: '200',
        data: employee,
        message: 'Employee updated successfully'
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// Delete  emoloyee by id   =>  {{url}}/api/employes/:id
export const deleteEmployeeId = catchAsyncErrors(async (req, res, next) => {
  try {
    // Find the employee by their ID and the company's ID
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return next(new ErrorHandler('Employee not found', 404));
    }

    res.status(200).json({
      status: 204,
      code: '204',
      message: 'Employee Delete successfully'
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
