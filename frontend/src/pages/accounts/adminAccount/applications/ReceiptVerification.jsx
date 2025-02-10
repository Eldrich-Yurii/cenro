import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Menu,
  MenuItem,
  MenuList,
  MenuHandler,
  Typography,
} from "@material-tailwind/react";
import { TbDots, TbSearch, TbUserPlus } from "react-icons/tb";

const TABLE_HEAD = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Application Type",
  "Status",
  "Actions",
];

const TABLE_ROWS = [
  {
    id: "1",
    firstname: "Fer",
    middlename: "Di",
    lastname: "Bol",
    designation: "Validator",
    status: "pending",
  },
  {
    id: "2",
    firstname: "Yu",
    middlename: "Li",
    lastname: "Sis",
    designation: "Webinar Coordinator",
    status: "pending",
  },
  {
    id: "3",
    firstname: "kel",
    middlename: "Cor",
    lastname: "Sega",
    designation: "Inspector",
    status: "pending",
  },
  {
    id: "4",
    firstname: "Jey",
    middlename: "Pi",
    lastname: "Pol",
    designation: "Chat Support",
    status: "pending",
  },
  {
    id: "5",
    firstname: "Yu",
    middlename: "Li",
    lastname: "Sis",
    designation: "Webinar Coordinator",
    status: "approved",
  },
  {
    id: "6",
    firstname: "kel",
    middlename: "Cor",
    lastname: "Sega",
    designation: "Inspector",
    status: "approved",
  },
  {
    id: "7",
    firstname: "Jey",
    middlename: "Pi",
    lastname: "Pol",
    designation: "Chat Support",
    status: "rejected",
  },
];

export default function ReceiptVerification() {
  return (
    <div className="h-screen">
      <Card className="h-[34rem] w-full px-6 shadow-lg">
        <CardHeader floated={false} shadow={false}>
          <div className=" flex justify-between">
            <section>
              <Typography variant="h2" className="text-blue-800 font-extrabold">
                Receipt Verification
              </Typography>
              <p className="w-64 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This are the list of users uploaded their receipts after paying
                on the cashier.
              </p>
            </section>
          </div>
          <div className="w-full flex justify-between pt-4">
            <section className="flex flex-col gap-2 items-end">
              <Button
                variant="outlined"
                className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all"
              >
                <TbUserPlus className="text-lg" />
                Dropdown filter to
              </Button>
            </section>
            <section className="flex items-center">
              <input
                className="pl-3 h-12 border-gray-500 rounded-lg"
                type="search"
                name="empsearch"
                id="empSearch"
                placeholder="Search..."
              />
              <Button className="ml-2 h-12 w-12 rounded-lg bg-blue-800 text-white text-2xl grid place-content-center hover:bg-blue-950">
                <TbSearch />
              </Button>
            </section>
          </div>
        </CardHeader>
        <br />
        <CardBody className="overflow-y-scroll scrollbar">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 pb-4 pt-10"
                  >
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
              {TABLE_ROWS.map(
                ({
                  firstname,
                  middlename,
                  lastname,
                  designation,
                  status,
                  id,
                }) => {
                  const isLast = id === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "py-4"
                    : "py-4 border-b border-gray-300";

                  return (
                    <tr key={id} className="hover:bg-gray-50">
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
                      <td className={classes}>
                        <div className="w-max">
                          <span
                            className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                              status === "approved"
                                ? "bg-green-200 text-green-700"
                                : status === "pending"
                                ? "bg-yellow-200 text-orange-600"
                                : "bg-red-200 text-red-600"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </td>
                      <td className="border-b border-gray-300">
                        <div className="flex gap-4">
                          <Menu>
                            <MenuHandler>
                              <Button
                                variant="outlined"
                                className="px-2 py-2 border-gray-200 text-blue-800 hover:bg-blue-800 hover:text-white"
                              >
                                <TbDots />
                              </Button>
                            </MenuHandler>
                            <MenuList className="text-start p-2">
                              <MenuItem className="pt-2 hover:bg-blue-50">View Receipt</MenuItem>
                              <MenuItem className="pt-2 hover:bg-blue-50">Approve</MenuItem>
                              <MenuItem className="pt-2 hover:bg-blue-50">Reject</MenuItem>
                            </MenuList>
                          </Menu>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
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
