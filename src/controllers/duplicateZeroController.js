import catchAsyncErrors from '../middlewares/catchAsyncError.js';

function duplicateZeros(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 0, 0);
      arr.pop();
      i++;
    }
  }
  return arr;
}

// duplicate zeroes   =>    {{url}}/api/combination
export const duplicateZero = catchAsyncErrors(async (req, res, next) => {
  try {
    const { arr } = req.body;

    if (!Array.isArray(arr)) {
      return res.status(400).json({
        status: 400,
        code: '400',
        message: 'Invalid input. "arr" should be an array.',
      });
    }

    const duplicatedArray = duplicateZeros(arr);

    res.status(200).json({
      status: 200,
      code: '200',
      data: {
        result: duplicatedArray,
      },
      message: 'Success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      code: '500',
      message: 'Internal Server Error',
    });
  }
});
