import fs from "fs";
import path from "path";

export const getEmailTemplate = (firstName, otp) => {
    const templatePath = path.join(process.cwd(), "src", "templates", "otpEmail.html");
    let template = fs.readFileSync(templatePath, "utf-8");

    template = template.replace("{{firstName}}", firstName).replace("{{otp}}", otp);

    return template;
};