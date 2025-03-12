import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
  } from "@material-tailwind/react";
  import { getAllApplication } from "../../../../../api/ApplicationApi";
  import { useEffect, useState } from "react";
  
  const TABLE_HEAD = [
    "Type of Application",
    "Approved",
    "Pending",
    "Rejected",
  ];
  
  export default function ApplicationBreakdown() {

    const [applications, setApplications] = useState([]);
    const [applicationSummary, setApplicationSummary] = useState({});

    useEffect(() => {
      const fetchAllApplications = async () => {
          try {
              const data = await getAllApplication();
              setApplications(data);

              const summary = data.reduce((acc, app) => {
                  if (!acc[app.formType]) {
                      acc[app.formType] = {
                          approved: 0,
                          pending: 0,
                          rejected: 0,
                      };
                  }
                  acc[app.formType][app.status.toLowerCase()]++; // Increment status counts
                  return acc;
              }, {});

              setApplicationSummary(summary);
          } catch (err) {
              console.log(err);
          }
      };
      fetchAllApplications();
  }, []);

          const TABLE_ROWS = Object.entries(applicationSummary).map(([formType, counts]) => ({
          id: formType, // Use formType as a unique ID
          type: formType,
          approved: counts.approved,
          pending: counts.pending,
          rejected: counts.rejected,
}));

    return (
      <div>
        <Card className="h-[24rem] w-full px-6 shadow-lg">
          <CardHeader floated={false} shadow={false}>
            <div className=" flex justify-between">
              <section>
                <Typography variant="h2" className="text-blue-800 font-extrabold">
                  Client Applications
                </Typography>
                <p className="w-full text-sm leading-[120%] pt-2 font-semibold text-gray-600 tracking-tight">
                  These are the list of applications of the users.
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
                  ({ type, approved, pending, rejected, id }) => {
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
                            {type}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {approved}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {pending}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-800"
                          >
                            {rejected}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
  