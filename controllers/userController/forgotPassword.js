const uid2 = require("uid2");
const User = require("../../models/User");
const ResetToken = require("../../models/ResetToken")
const sendEmail = require("../../services/nodeMailer");


async function requestResetPassword (req, res) {
    try {
        const userEmail = req.body.email;
        
        const userFound = await User.findOne({email: userEmail})
        if(userFound === null) {
            return res.status(202).json({message: "Password reset link has been sent if the user exist"});
        }
        // if userFound we create a resetToken with 15 min lifespan
        const generateToken = uid2(64);      
        const resetToken = new ResetToken({
            token: generateToken,
            userId: userFound._id,
            createAt: Date.now(),
        })
        await resetToken.save();

        // create a client Link to take user to the password reset page
        const link = `${process.env.CLIENT_URL}/reset-password?id=${userFound._id}&token=${generateToken}`
        
        await sendEmail(userFound.email, {
            subjectTitle: "Vinted account Password Reset Request",
            message: `Your password reset link: ${link}`
        })
        res.status(202).json({ message: "Password reset link has been sent if the user exist"})

    } catch (err) {
        console.error(err)
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
    }
}


module.exports = requestResetPassword;