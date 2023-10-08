import User from '../models/users.js';
import Company from '../models/companies.js';
import catchAsyncErrors from '../middlewares/catchAsyncError.js';

// Get companies   =>    {{url}}/api/companies
export const getCompany = catchAsyncErrors(async (req, res, next) => {
  const company = await Company.find();
  const response = {
    status: 200,
    code: '200',
    data: {
      count: company.length,
      rows: company
    },
    message: 'Success'
  };

  res.status(200).json(response);
});

export const createCompany = catchAsyncErrors(async (req, res, next) => {
  const { company_name, telephone_number, address } = req.body;
  const company = await Company.create({
    company_name,
    telephone_number,
    address
  });

  res.status(201).json({
    status: 201,
    code: 201,
    data: {
      id: company.id
    },
    message: 'Success'
  });
});

export const setCompanyActive = catchAsyncErrors(async (req, res, next) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        status: 404,
        code: '404',
        message: 'Company not found'
      });
    }

    // Update the company's active status to true
    company.is_active = true;
    await company.save();

    res.status(201).json({
      status: 201,
      code: '201',
      data: {
        id: company._id,
        is_active: true
      },
      message: 'Success'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      code: '500',
      message: 'Internal Server Error'
    });
  }
});
