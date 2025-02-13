import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  
  const TABLE_HEAD = [
    "Type of Application",
    "Approved",
    "Pending",
    "Rejected",
  ];
  
  const TABLE_ROWS = [
    {
      id: "1",
      firstname: "Fer",
      middlename: "Di",
      lastname: "Bol",
      designation: "Validator",
    },
    {
      id: "2",
      firstname: "Yu",
      middlename: "Li",
      lastname: "Sis",
      designation: "Webinar Coordinator",
    },
 
  ];
  
  export default function ApplicationBreakdown() {
    return (
      <div>
        <Card className="h-[24rem] w-full px-6 shadow-lg">
          <CardHeader floated={false} shadow={false}>
            <div className=" flex justify-between">
              <section>
                <Typography variant="h2" className="text-blue-800 font-extrabold">
                  Client Applications
                </Typography>
                <p className="w-56 text-sm leading-[120%] pt-2 font-semibold text-gray-600 tracking-tight">
                  This are the list of applications of the users.
                </p>
              </section>
            </div>
          </CardHeader>
          <CardBody>
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
                  ({ firstname, middlename, lastname, designation, id }) => {
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
                        {/* <td className="border-b border-gray-300">
                          <div className="flex gap-4">
                            <Button variant="outlined" className="px-2 py-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white">
                              <TbEdit />
                            </Button>
                            <Button variant="outlined" className="px-2 py-2 border-blue-800 text-blue-800  hover:bg-blue-800 hover:text-white">
                              <TbTrash />
                            </Button>
                          </div>
                        </td> */}
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
  