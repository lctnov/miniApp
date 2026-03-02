// Giả lập database tạm thời
let users = [
  { id: 1, name: "An", email: "an@gmail.com" },
  { id: 2, name: "Bình", email: "binh@gmail.com" }
];

// @desc    Lấy tất cả users
// @route   GET /api/users
// @access  Public
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
};

// @desc    Lấy user theo ID
// @route   GET /api/users/:id
// @access  Public
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
};

// @desc    Tạo user mới
// @route   POST /api/users
// @access  Public
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
};

// @desc    Cập nhật user
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  res.status(200).json({
    success: true,
    data: user
  });
};

// @desc    Xóa user
// @route   DELETE /api/users/:id
// @access  Public
exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  users.splice(userIndex, 1);

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
};