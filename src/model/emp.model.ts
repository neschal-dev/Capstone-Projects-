type dept =
  | "Engineering"
  | "Marketing"
  | "Sales"
  | "HR"
  | "Finance"
  | "Operations";

interface Employee {
  EmpID: string;
  FirstName: string;
  LastName: string;
  Department: dept;
  JobTitle: string;
  Salary: number;
  HireDate: string;
}

export const DB: Employee[] = [
  {
    EmpID: "E001",
    FirstName: "John",
    LastName: "Doe",
    Department: "Engineering",
    JobTitle: "Software Engineer",
    Salary: 95000,
    HireDate: "2021-03-15",
  },
  {
    EmpID: "E002",
    FirstName: "Jane",
    LastName: "Smith",
    Department: "Marketing",
    JobTitle: "Marketing Manager",
    Salary: 85000,
    HireDate: "2020-08-22",
  },
  {
    EmpID: "E003",
    FirstName: "Michael",
    LastName: "Brown",
    Department: "Sales",
    JobTitle: "Sales Representative",
    Salary: 65000,
    HireDate: "2022-01-10",
  },
  {
    EmpID: "E004",
    FirstName: "Emily",
    LastName: "Davis",
    Department: "HR",
    JobTitle: "HR Specialist",
    Salary: 70000,
    HireDate: "2019-11-05",
  },
  {
    EmpID: "E005",
    FirstName: "David",
    LastName: "Wilson",
    Department: "Engineering",
    JobTitle: "QA Engineer",
    Salary: 80000,
    HireDate: "2021-07-19",
  },
  {
    EmpID: "E006",
    FirstName: "Sarah",
    LastName: "Martinez",
    Department: "Finance",
    JobTitle: "Financial Analyst",
    Salary: 90000,
    HireDate: "2020-02-14",
  },
  {
    EmpID: "E007",
    FirstName: "James",
    LastName: "Anderson",
    Department: "Operations",
    JobTitle: "Operations Coordinator",
    Salary: 68000,
    HireDate: "2023-05-01",
  },
  {
    EmpID: "E008",
    FirstName: "Amanda",
    LastName: "Thomas",
    Department: "Sales",
    JobTitle: "Account Executive",
    Salary: 75000,
    HireDate: "2021-10-12",
  },
  {
    EmpID: "E009",
    FirstName: "Robert",
    LastName: "Taylor",
    Department: "Engineering",
    JobTitle: "DevOps Engineer",
    Salary: 105000,
    HireDate: "2018-04-30",
  },
  {
    EmpID: "E010",
    FirstName: "Lisa",
    LastName: "White",
    Department: "Marketing",
    JobTitle: "Content Strategist",
    Salary: 72000,
    HireDate: "2022-09-15",
  },
  {
    EmpID: "E011",
    FirstName: "William",
    LastName: "Harris",
    Department: "Finance",
    JobTitle: "Senior Accountant",
    Salary: 98000,
    HireDate: "2017-06-25",
  },
  {
    EmpID: "E012",
    FirstName: "Ashley",
    LastName: "Martin",
    Department: "HR",
    JobTitle: "HR Director",
    Salary: 120000,
    HireDate: "2015-01-14",
  },
  {
    EmpID: "E013",
    FirstName: "Brian",
    LastName: "Clark",
    Department: "Engineering",
    JobTitle: "Data Scientist",
    Salary: 110000,
    HireDate: "2022-03-01",
  },
  {
    EmpID: "E014",
    FirstName: "Megan",
    LastName: "Rodriguez",
    Department: "Operations",
    JobTitle: "Logistics Manager",
    Salary: 87000,
    HireDate: "2020-11-18",
  },
  {
    EmpID: "E015",
    FirstName: "Kevin",
    LastName: "Lewis",
    Department: "Sales",
    JobTitle: "Sales Director",
    Salary: 130000,
    HireDate: "2016-08-08",
  },
];
