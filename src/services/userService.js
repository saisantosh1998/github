const axios = require("axios");
const User = require("../models/User");

const saveUser = async (username) => {
  try {
    // Check if user already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { status: 409, message: "User already exists in the database" };
    }

    // Fetch user details from GitHub API
    const githubResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const userData = githubResponse.data;
    userData.username = username;

    // Save user to the database
    const newUser = new User(userData);
    await newUser.save();

    return { status: 201, message: "User saved successfully", user: newUser };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to save user",
      error: error.message,
    };
  }
};

const deleteUser = async (username) => {
  try {
    const result = await User.updateOne(
      { username },
      { $set: { is_active: false } }
    );
    if (result.nModified === 0) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: "User deleted successfully" };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to delete user",
      error: error.message,
    };
  }
};

const updateUser = async (username, newData) => {
  try {
    // Find user by username and update
    const result = await User.updateOne({ username }, { $set: newData });
    if (result.nModified === 0) {
      return { status: 404, message: "User not found" };
    }
    return { status: 200, message: "User updated successfully" };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to update user",
      error: error.message,
    };
  }
};

const listUsers = async (sortBy,orderBy) => {
  try {
    let sortQuery = {};
    if (sortBy) {
      sortQuery[sortBy] = orderBy==="asc" ? 1 : -1;
    }
    const users = await User.find({}).sort(sortQuery);
    return {
      status: 200,
      users,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to fetch users",
      error: error.message,
    };
  }
};

const findMutualFollowers = async (username) => {
  try {
    // Fetch user's followers
    const followersResponse = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const followers = followersResponse.data.map((user) => user.login);

    // Fetch users followed by the user
    const followingResponse = await axios.get(
      `https://api.github.com/users/${username}/following`
    );
    const following = followingResponse.data.map((user) => user.login);

    // Find mutual followers
    const mutualFollowers = followers.filter((user) =>
      following.includes(user)
    );

    // Save mutual followers as friends in the database
    const user = await User.findOne({ username });
    user.friends = mutualFollowers;
    await user.save();
    return {
      status: 200,
      mutualFollowers,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to find mutual followers",
      error: error.message,
    };
  }
};

const searchUsers = async (searchParams) => {
  try {
    searchParams.is_active = true;
    query = { $and: [] };
    for (const key in searchParams) {
      query.$and.push({ [key]: searchParams[key] });
    }
    const users = await User.find(query);
    return {
      status: 200,
      users,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Failed to search users",
      error: error.message,
    };
  }
};

module.exports = {
  saveUser,
  deleteUser,
  updateUser,
  listUsers,
  findMutualFollowers,
  searchUsers,
};
