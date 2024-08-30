const asyncWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(500).json({ msg: error });
    next();
  }
};

module.exports = asyncWrapper;
