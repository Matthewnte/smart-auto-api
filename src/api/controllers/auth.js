/**
 * @description Controllers for authentication
 * @param {Response} errResponse Error response
 * @param {Model} AuthModel Auth model
 * @param {Options} UserModels Options of models for all users
 */
const authControllers = (catchAsyncError, ApiError, userService) => {
  // Define controllers

  /**
   * @description Method for singup
   * @param {*} req Request object
   * @param {*} res Response object
   */
  const userSignup = catchAsyncError(async (req, res) => {
    // get request body
    const { body: reqBody } = req;

    // send request to userService
    const { user, token } = await userService.signup(reqBody, req);

    // return response
    res.status(201).header('Authorization', token).json({
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
