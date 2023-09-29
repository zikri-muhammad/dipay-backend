import jobs from "../models/jobs.js"

const getJobs = async (req, res) => {
  const data = await jobs.find();
  res.status(200).json({
    success: true,
    results: data.length,
    data: data
  })
}

const createJobs = async (req, res) => {
  const data =  await jobs.create(req.body);
  res.status(200).json({
    success: true,
    message: 'success create jobs',
    data: data
  })
}

export {
  getJobs,
  createJobs
}
