/**
 * @description Controllers for authentication
 * @param {Response} errResponse Error response
 * @param {Model} AuthModel Auth model
 * @param {Options} UserModels Options of models for all users
 */
const authControllers = (errResponse, UserService) => {
  /**
   * @description Controller for user sign up
   * @param {*} req Request object
   * @param {*} res Response object
   */
  const userSignup = async (req, res) => {
    // get request body
    const { body: reqBody } = req;
    const { user } = await UserService.signup(reqBody);

    // return response
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  };

  return {
    userSignup,
  };
};

module.exports = authControllers;
