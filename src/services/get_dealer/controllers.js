const regControllers = (models) => {
  /**
   * Public properties and methods
   */
  const publics = {
    /**
     * Get a dealer's profile and related data
     * @param {object} req Express request object
     * @param {object} res Express response object
     */
    getAllDealers: async (req, res) => {
      const { page, limit } = req.query;

      const queryParams = {};

      if (req.query.name && req.query.name.length > 2) {
        queryParams.companyName = { $regex: new RegExp(`^${req.query.name}`), $options: 'i' };
      }

      if (req.query.location && req.query.location.length > 2) {
        queryParams.address = { $regex: new RegExp(req.query.location), $options: 'i' };
      }

      // Get dealer profile
      const dealers = await models.DealerModel.find(
        queryParams, '-password -updatedAt', { skip: page * limit, limit },
      );

      // Define response data
      const resData = dealers;

      // return response
      return res
        .status(200)
        .json({
          status: 'success',
          msg: 'All list of dealers found',
          data: resData,
        });
    },

    /**
     * Get a dealer's profile and related data
     * @param {object} req Express request object
     * @param {object} res Express response object
     */
    getOneDealer: async (req, res) => {
      // Get dealer profile
      const dealer = await models.DealerModel.findById(req.params.dealerId, '-password -updatedAt');

      // Check against inexistent dealer
      if (!dealer) {
        return res.status(400).json({
          status: 'success',
          msg: 'Dealer not found',
          data: {},
        });
      }

      // Define response data
      const resData = {
        photo: dealer.photo,
        name: dealer.companyName,
        email: dealer.email,
        phone: dealer.phone,
        address: dealer.address,
      };

      // return response
      return res
        .status(200)
        .json({
          status: 'success',
          msg: 'Dealer found',
          data: resData,
        });
    },
  };

  // Expose service API functions
  return publics;
};

module.exports = regControllers;
