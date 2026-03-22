const User = require('../models/User');

// @desc    Get user profile/settings
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user profile/settings
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.role = req.body.role || user.role;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.twitter = req.body.twitter !== undefined ? req.body.twitter : user.twitter;
    user.github = req.body.github !== undefined ? req.body.github : user.github;
    user.siteTitle = req.body.siteTitle || user.siteTitle;
    user.siteDescription = req.body.siteDescription || user.siteDescription;
    user.postsPerPage = req.body.postsPerPage || user.postsPerPage;
    user.themePreference = req.body.themePreference || user.themePreference;

    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      bio: updatedUser.bio,
      twitter: updatedUser.twitter,
      github: updatedUser.github,
      avatar: updatedUser.avatar,
      siteTitle: updatedUser.siteTitle,
      siteDescription: updatedUser.siteDescription,
      postsPerPage: updatedUser.postsPerPage,
      themePreference: updatedUser.themePreference
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update password
// @route   PUT /api/users/password
// @access  Private
const updatePassword = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { currentPassword, newPassword } = req.body;
    
    // Check if current password is correct
    if (await user.matchPassword(currentPassword)) {
      user.password = newPassword;
      await user.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(401);
      throw new Error('Incorrect current password');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePassword
};
