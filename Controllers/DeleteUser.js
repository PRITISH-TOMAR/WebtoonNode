const { User } = require('../Models/Anime');
const { createHmac } = require('crypto');

const deleteUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are present
        if (!email || !password) {
            return res.status(400).json({
                message: "Missing credentials",
                success: false
            });
        }

        // Find the user 
        const user = await User.findOne({ email });

        // If user is not found, return an error
        if (!user) {
            return res.status(404).json({
                message: "Invalid Credentials",
                success: false
            });
        }

        // Compare the passwords
        const salt = user.salt;
        const hashPass = user.password;
        const newHash = createHmac('sha256', salt).update(password).digest("hex");

        if (newHash !== hashPass) {
            return res.status(404).json({
                message: "Invalid Credentials",
                success: false
            });
        }

        // Delete the user
        const result = await User.deleteOne(user);

        // If deletion ->  success
        if (result.deletedCount > 0) {
            return res.status(200).json({
                message: "User deleted successfully",
                success: true
            });
        } else {
            return res.status(500).json({
                message: "Error deleting user",
                success: false
            });
        }

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = { deleteUser };
