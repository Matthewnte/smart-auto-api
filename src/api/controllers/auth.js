/**
 * @description Controllers for authentication
 * @param {Response} errResponse Error response
 * @param {Model} AuthModel Auth model
 * @param {Options} UserModels Options of models for all users
 */
const authControllers = (catchAsyncError, ApiError, userService) => {
  /**
   * @description Method for singup
   * @param {*} req Request object
   * @param {*} res Response object
   */
  const userSignup = catchAsyncError(async (req, res) => {
    // get request body
    const { body: reqBody } = req;
    const { user } = await userService.signup(reqBody);

    // return response
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  });

  return {
    userSignup,
  };
};

module.exports = authControllers;
