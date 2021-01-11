const regControllers = (models) => {
  /**
   * Public properties and methods
   */
  const publics = {
    /**
     * Get a user's profile and related data
     * @param {object} req Express request object
     * @param {object} res Express response object
     */
    getAllUsers: async (req, res) => {
      const { page, limit } = req.query;

      const queryParams = {};

      if (req.query.fullName && req.query.fullName.length > 2) {
        queryParams.$or = [
          { firstName: { $regex: new RegExp(`${req.query.fullName}`), $options: 'i' } },
          { lastName: { $regex: new RegExp(`${req.query.fullName}`), $options: 'i' } },
        ];
      } else {
        if (req.query.firstName && req.query.firstName.length > 2) {
          queryParams.firstName = { $regex: new RegExp(`^${req.query.firstName}`), $options: 'i' };
        }

        if (req.query.lastName && req.query.lastName.length > 2) {
          queryParams.lastName = { $regex: new RegExp(`^${req.query.lastName}`), $options: 'i' };
        }
      }

      // Get user profile
      const users = await models.UserModel.find(
        queryParams, '-password -updatedAt', { skip: page * limit, limit },
      );

      // Define response data
      const resData = users;

      // return response
      return res
        .status(200)
        .json({
          status: 'success',
          msg: 'All list of users found',
          data: resData,
        });
    },

    /**
     * Get a user's profile and related data
     * @param {object} req Express request object
     * @param {object} res Express response object
     */
    getOneUser: async (req, res) => {
      // Get user profile
      const user = await models.UserModel.findById(req.params.userId, '-password -updatedAt');

      // Check against inexistent user
      if (!user) {
        return res.status(400).json({
          status: 'success',
          msg: 'User not found',
          data: {},
        });
      }

      // Define response data
      const resData = {
        photo: user.photo,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      // return response
      return res
        .status(200)
        .json({
          status: 'success',
          msg: 'User found',
          data: resData,
        });
    },
  };

  // Expose service API functions
  return publics;
};

module.exports = regControllers;
