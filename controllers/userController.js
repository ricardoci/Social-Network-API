const User = require('../models/User');
const Friend = require('../models/friendsShema');
const { Types } = require('mongoose');
const mongoose = require('mongoose');


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

    // Check if the friend exists
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      return res.status(404).json({ message: 'No friend with that username' });
    }

    // Get the user and add the friend to their friend list
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: friend._id } },
      { new: true }
    ).populate('friends');

    res.json(updatedUser.friends);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
async deleteFriend(req, res) {
  try {
    const { friendId } = req.params;

    // Get the user and remove the friend from their friend list
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: friendId } },
      { new: true }
    ).populate('friends');

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(updatedUser.friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

,


async getFriend(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate('friends');
    res.json(user.friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}




}