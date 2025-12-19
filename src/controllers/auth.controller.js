import {
  loginService,
  sendOtpService,
  verifyOtpService,
  changePasswordService,
} from "../services/auth.service.js";

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

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newPassword, confirmPassword } = req.body;

    await changePasswordService(userId, newPassword, confirmPassword);

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
