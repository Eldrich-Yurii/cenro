import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
  } from "@material-tailwind/react";
  import { TbDots, TbSearch } from "react-icons/tb";
  
  const TABLE_HEAD = [
    {
      head: "Business Name",
      icon: <Checkbox />,
    },
    {
      head: "Applicant Name",
    },
    {
      head: "Email",
    },
    {
      head: "Status",
    },
    {
      head: "Action",
    },
  ];
  
  const TABLE_ROWS = [
    {
      id: "1",
      firstname: "Fer",
      middlename: "Di",
      lastname: "emailko@gmail.com",
      status: "certificate generated",
    },
    {
      id: "2",
      firstname: "Yu",
      middlename: "Li",
      lastname: "emailko@gmail.com",
      status: "certificate generated",
    },
    {
      id: "3",
      firstname: "kel",
      middlename: "Cor",
      lastname: "emailko@gmail.com",
      status: "pending",
    },
    {
      id: "4",
      firstname: "Jey",
      middlename: "Pi",
      lastname: "emailko@gmail.com",
      status: "pending",
    },
    {
      id: "5",
      firstname: "Yu",
      middlename: "Li",
      lastname: "emailko@gmail.com",
      status: "certificate generated",
    },
    {
      id: "6",
      firstname: "kel",
      middlename: "Cor",
      lastname: "emailko@gmail.com",
      status: "pending",
    },
    {
      id: "7",
      firstname: "Jey",
      middlename: "Pi",
      lastname: "emailko@gmail.com",
      status: "certificate generated",
    },
  ];
  
  export default function InspectAndFinalCert() {
    return (
      <div className="h-screen">
        <Card className="h-[36rem] w-full px-6 shadow-lg">
          <CardHeader className="rounded-none h-44" floated={false} shadow={false}>
            <div className=" flex justify-between items-start">
              <section>
                <Typography variant="h2" className="text-blue-800 font-extrabold">
                  Inspection & Final Certificate
                </Typography>
                <p className="w-96 text-sm leading-[120%] pt-2 font-semibold text-gray-600 tracking-tight">
                  This is the list of Cenro Clients that is in inspection stage, the last stage to get the final certificate.
                </p>
              </section>
              <section className="flex items-center">
                <input
                  className="pl-3 h-12 border-gray-500 rounded-lg"
                  type="search"
                  name="certSearch"
                  id="certSearch"
                  placeholder="Search..."
                />
                <Button className="ml-2 h-12 w-12 rounded-lg bg-blue-800 text-white text-2xl grid place-content-center hover:bg-blue-950">
                  <TbSearch />
                </Button>
              </section>
            </div>
          </CardHeader>
          <br />
          <CardBody className="overflow-y-auto scrollbar">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map(({ head, icon }) => (
                    <th
                      key={head}
                      className="border-b border-gray-300 pb-4 pt-10"
                    >
                      <div className="flex items-center">
                        {icon}
                        <Typography
                          variant="small"
                          className="text-gray-800 font-extrabold leading-none"
                        >
                          {head}
                        </Typography>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  ({ firstname, middlename, lastname, status, id }) => {
                    const isLast = id === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "py-4"
                      : "py-4 border-b border-gray-300";
  
                    return (
                      <tr key={id} className="hover:bg-gray-50">
                        <td className={classes}>
                          <div className="flex items-center">
                            <Checkbox />
                            <Typography
                              variant="small"
                              className="font-bold text-gray-600"
                            >
                              {firstname}
                            </Typography>
                          </div>
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
                          <div className="w-max">
                            <span
                              className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                                status === "certificate generated"
                                  ? "bg-lime-200 text-lime-800"
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
                                <MenuItem className="pt-2 hover:bg-blue-50">
                                  View COA
                                </MenuItem>
                                <MenuItem className="pt-2 hover:bg-blue-50">
                                  Approve
                                </MenuItem>
                                <MenuItem className="pt-2 hover:bg-blue-50">
                                  Reject
                                </MenuItem>
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
  