import {
  loginService,
  sendOtpService,
  verifyOtpService,
  changePasswordService,
} from "../services/auth.service.js";
import { findUserByEmailRepo } from "../repository/user.repository.js";

// Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(email, password);

    if (!result.status) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    await sendOtpService(email);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    await verifyOtpService(email, otp);

    res.json({ message: "OTP verified" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await findUserByEmailRepo(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await changePasswordService(user.id, newPassword, confirmPassword);

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
