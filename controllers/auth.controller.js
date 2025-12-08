import { loginService } from "../services/auth.service.js";

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
