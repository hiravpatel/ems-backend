import {
  getTotalEmployeesRepo,
  getActiveEmployeesRepo,
  getDepartmentsRepo,
  getThisMonthPayrollRepo,
} from "../repository/cards.repository.js";

export const dashboardCardsService = async () => {
  const totalEmployees = await getTotalEmployeesRepo();
  const activeEmployees = await getActiveEmployeesRepo();
  const departments = await getDepartmentsRepo();

  const now = new Date();
  const payrollThisMonth = await getThisMonthPayrollRepo(
    now.getFullYear(),
    now.getMonth() + 1
  );

  return {
    totalEmployees,
    activeEmployees,
    departments,
    thisMonthPayroll: payrollThisMonth._sum.netSalary || 0,
  };
};
