import fs from "fs";
import path from "path";

export const getSalarySlipTemplate = (payroll) => {
  const monthYear = new Date(payroll.month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const filePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "salarySlip.html"
  );

  // Read HTML template
  let html = fs.readFileSync(filePath, "utf8" );

  // Read placeholders
  html = html
    .replaceAll("{{MONTH_YEAR}}", monthYear)
    .replaceAll(
      "{{EMPLOYEE_NAME}}",
      `${payroll.employee.firstName} ${payroll.employee.lastName}`
    )
    .replaceAll("{{EMPLOYEE_CODE}}", payroll.employee.employeeCode || "")
    .replaceAll("{{POSITION}}", payroll.employee.position || "")
    .replaceAll("{{DEPARTMENT}}", payroll.employee.department || "")
    .replaceAll("{{BASIC_SALARY}}", payroll.basicSalary ?? "")
    .replaceAll("{{ALLOWANCES}}", payroll.allowance ?? "")
    .replaceAll("{{DEDUCTION}}", payroll.deduction ?? "")
    .replaceAll("{{NET_SALARY}}", payroll.netSalary ?? "");

  return html;
};
