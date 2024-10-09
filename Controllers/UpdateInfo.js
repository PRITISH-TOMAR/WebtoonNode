const { User } = require('../Models/Anime');
const { createHmac, randomBytes } = require('crypto');

const updateInfo = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        // Check for email
        if (!email) {
            return res.status(400).json({
                message: "Email is required!",
                success: false
            });
        }

      
        const user = await User.findOne({ email });

        // If user is not found
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false
            });
        }

        // Hash the password if given
        let hashPass;
        if (password) {
            const salt = user.salt || randomBytes(16).toString('hex'); // Use existing salt or create a new one
            hashPass = createHmac('sha256', salt).update(password).digest("hex");
        }

        // Update the user 
        const updatedUser = await User.findOneAndUpdate(
            { email }, 
            { 
                name: name || user.name, 
                email, 
                password: hashPass || user.password, 
                salt: user.salt, 
                role: role || user.role 
            },
            { new: true , select: 'name email role'} 
        );

        // If the update is successful...
        return res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: updatedUser
        });

    } catch (error) {
        console.log(error);

        // If an internal error occurs...
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = { updateInfo };
