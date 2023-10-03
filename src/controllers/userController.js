import User from '../models/users.js';
import catchAsyncErrors from '../middlewares/catchAsyncError.js';

// Get current user profile   =>    /api/v1/me
export const getUserProfile = catchAsyncErrors( async(req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        data : user
    })
});
