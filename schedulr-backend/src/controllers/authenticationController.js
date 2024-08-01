const bcrypt = require('bcryptjs');
const { User } = require('../models');

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ where: { username } });

		if (user && await bcrypt.compare(password, user.password)) {
			req.session.userId = user.id;
			return res.status(200).json({ email: user.email });
		}
	}
	catch {
		return res.status(500).json({ message: 'Error loging in' });
	}
};

const logoutUser = (req, res) => {
	try {
		req.session.destroy(err => {
			if (err) {
				return res.status(500).json({ error: 'Logout failed' });
			}
		});
	} catch {
		return res.status(500).json({ message: 'Error loging out' });
	}
};

module.exports = { loginUser, logoutUser };