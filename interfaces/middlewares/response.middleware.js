module.exports = (req, res) => {
  let data = res.locals.data;

  if (!data) {
    return res.json({
      success: true,
      data: null,
    });
  }

  // Nếu trả về user → loại bỏ password_hash
  if (data.password_hash) {
    const { password_hash, ...safeUser } = data;
    data = safeUser;
  }

  // Nếu có object user bên trong
  if (data.user && data.user.password_hash) {
    const { password_hash, ...safeUser } = data.user;
    data.user = safeUser;
  }

  res.json({
    success: true,
    data,
  });
};