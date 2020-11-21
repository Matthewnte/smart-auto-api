/**
 * @description Controllers for authentication
 * @param {Response} errResponse Error response
 * @param {Model} AuthModel Auth model
 * @param {Options} UserModels Options of models for all users
 */
const authControllers = (catchAsyncError, ApiError, userService) => {
  // Define controllers

  const userSignup = catchAsyncError(async (req, res) => {
    // get request body
    const { body: reqBody } = req;

    // get base url
    const url = `${req.protocol}://${req.get('host')}`;

    // send request to userService for procesing
    const { user, token } = await userService.signup(reqBody, url);

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
