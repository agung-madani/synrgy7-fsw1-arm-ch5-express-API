const idChecker = (req, res, next) => {
  const { id } = req.params;
  if (!Number.isInteger(parseInt(id))) {
    return res.status(400).json({ message: 'Invalid id. Must be an integer.' });
  }
  next();
};

module.exports = {idChecker};