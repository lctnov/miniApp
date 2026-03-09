module.exports = (req, res, next) => {
  const data = res.locals.data;
  const error = res.locals.error;

  if (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }

  res.status(res.statusCode || 200).json({
    success: true,
    data: data,
  });
};
