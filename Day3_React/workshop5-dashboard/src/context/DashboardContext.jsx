// src/context/DashboardContext.jsx

import { createContext, useContext } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

  const employees = [
    { name: "Nihith", department: "Engineering" },
    { name: "Ravi", department: "Engineering" },
    { name: "Priya", department: "HR" },
    { name: "Rahul", department: "Sales" },
  ];

  const byDept = [
    { department: "Engineering", count: 2 },
    { department: "HR", count: 1 },
    { department: "Sales", count: 1 },
  ];

  return (
    <DashboardContext.Provider
      value={{ employees, byDept }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () =>
  useContext(DashboardContext);