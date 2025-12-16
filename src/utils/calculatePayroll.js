export function calculatePayroll (basicSalary, allowance = 0, deduction = 0) {
    return basicSalary + allowance - deduction;
}