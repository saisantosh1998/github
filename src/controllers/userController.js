const userService = require('../services/userService');

const saveUser = async (req, res) => {
  try {
    const result = await userService.saveUser(req.params.username);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.username);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.username, req.body);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const { sortBy,orderBy='desc' } = req.query;
    const result = await userService.listUsers(sortBy,orderBy);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

const findMutualFollowers = async (req, res) => {
  try {
    const result = await userService.findMutualFollowers(req.params.username);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const users = await userService.searchUsers(req.query);
    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};  

module.exports = {
  saveUser,
  deleteUser,
  updateUser,
  listUsers,
  findMutualFollowers,
  searchUsers,
}