
const getJobs = (req, res) => {
  res.status(200).json({
    success: true,
    message: `this message from example`
  })
}

export {
  getJobs
}
