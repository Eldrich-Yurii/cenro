import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { TbEdit, TbSearch, TbTrash } from "react-icons/tb";
import AddEmpAcc from "../../../../components/modal/AddEmpAcc";
import EditDesigModal from "../../../../components/modal/EditDesigModal";
import { getEmployees } from "../../../../api/AuthApi";
import { useEffect, useState } from "react";

const TABLE_HEAD = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Designation",
  "Actions",
];

export default function EmployeesTable() {
  const [employee, setEmployee] = useState([]);
  const [editEmployeeDesignation, setEditEmployeeDesignation] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) {
        console.error("Token not found.");
        return;
      }

      try {
        const employeeData = await getEmployees(token);
        setEmployee(employeeData);
      } catch (err) {
        console.error("Error getting data", err);
      }
    };

    getData();
  }, []);

  const updateEmployeeDesignation = (id, newDesignation) => {
    setEmployee((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp._id === id ? { ...emp, designation: newDesignation } : emp
      )
    );
  };

  return (
    <div className="h-screen">
      <Card className="h-[34rem] w-full px-2 shadow-lg">
        <CardHeader className="rounded-none" floated={false} shadow={false}>
          <div className=" flex justify-between">
            <section>
              <Typography variant="h2" className="text-blue-800 font-extrabold">
                Employees
              </Typography>
              <p className="w-48 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This is the list of employee and their designations.
              </p>
            </section>
          </div>
          <div className="w-full flex justify-between pt-4">
            <section className="flex flex-col gap-2 items-end">
              <AddEmpAcc />
            </section>
            <section className="flex items-center">
              <input
                className="pl-3 h-12 border-gray-500 rounded-lg"
                type="search"
                name="empsearch"
                id="empSearch"
                placeholder="Search an Employee..."
              />
              <Button className="ml-2 h-12 w-12 rounded-lg bg-blue-800 text-white text-2xl grid place-content-center hover:bg-blue-950">
                <TbSearch />
              </Button>
            </section>
          </div>
        </CardHeader>
        <br />
        <CardBody className="h-64 overflow-y-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-gray-300 pb-4">
                    <Typography
                      variant="small"
                      className="text-gray-800 font-extrabold leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employee.map(
                ({ firstname, middlename, lastname, designation, _id }) => {
                  const isLast = _id === employee.length - 1;
                  const classes = isLast
                    ? "py-4"
                    : "py-4 border-b border-gray-300";

                  return (
                    <tr key={_id} className="hover:bg-gray-50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-bold text-gray-600"
                        >
                          {firstname}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {middlename}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {lastname}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-bold text-blue-800"
                        >
                          {designation}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300">
                        <div className="flex gap-4">
                          <Button
                            onClick={() => {
                              console.log(
                                "Editing Employee designation:",
                                designation
                              );
                              setEditEmployeeDesignation({firstname, middlename, lastname, designation, _id});
                            }}
                            variant="outlined"
                            className="px-2 py-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                          >
                            <TbEdit />
                          </Button>
                          <Button
                            variant="outlined"
                            className="px-2 py-2 border-blue-800 text-blue-800  hover:bg-blue-800 hover:text-white"
                          >
                            <TbTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          {editEmployeeDesignation  && (
            <EditDesigModal
              employee={editEmployeeDesignation}
              setEditEmployeeDesignation={setEditEmployeeDesignation}
              updateEmployeeDesignation={updateEmployeeDesignation}
            />
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 1
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm" className="text-blue-800">
              Previous
            </Button>
            <Button variant="outlined" size="sm" className="text-blue-800">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
