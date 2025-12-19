import fs from "fs";
import path from "path";

export const getSalarySlipTemplate = (payroll) => {
  const monthYear = new Date(payroll.month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Read HTML template
  let html = fs.readFileSync(
    path.join(process.cwd(), "src", "templates", "salarySlip.html"),
    "utf8"
  );

  // Read placeholders
  html = html
    .replace("{{MONTH_YEAR}}", monthYear)
    .replace(
      "{{EMPLOYEE_NAME}}",
      `${payroll.employee.firstName} ${payroll.employee.lastName}`
    )
    .replace("{{EMPLOYEE_CODE}}", payroll.employee.employeeCode || "")
    .replace("{{POSITION}}", payroll.employee.position || "")
    .replace("{{DEPARTMENT}}", payroll.employee.department || "")
    .replace("{{BASIC_SALARY}}", payroll.basicSalary ?? "")
    .replace("{{ALLOWANCES}}", payroll.allowance ?? "")
    .replace("{{DEDUCTION}}", payroll.deduction ?? "")
    .replace("{{NET_SALARY}}", payroll.netSalary ?? "");

  return html;
};
