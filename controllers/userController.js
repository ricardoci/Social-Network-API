const User = require('../models/User');
const Friend = require('../models/friendsShema');


module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//  deleteUse
async deleteUser(req, res) {
  try {
    const result = await User.deleteOne({ _id: req.params.userId });
    if (result.deletedCount === 0) {
      return res.status(404).send('No user found');
    }
    res.send('User deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
},

async addFriend(req, res) {
  try {
    const { friendUsername } = req.body;

    // find the user and the friend
    const user = await User.findById(req.params.userId);
    const friend = await User.findOne({ username: friendUsername });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    if (!friend) {
      return res.status(404).json({ message: 'No friend with that username' });
    }

    // create a new friend relationship
    const friendData = await Friend.create({
      username: user.username,
      friendUsername: friend.username
    });

    // update the user's friends array
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: friendData._id } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
async deleteFriend(req, res) {
  try {
    const { friendId } = req.params;

    // find the user and the friend
    const user = await User.findById(req.params.userId);
    const friend = await Friend.findById(friendId);

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    if (!friend) {
      return res.status(404).json({ message: 'No friend with that ID' });
    }

    // remove the friend relationship
    await Friend.findByIdAndDelete(friendId);

    // update the user's friends array
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: friendId } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
async getFriend(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate('friends');
    res.json(user.friends);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}



}