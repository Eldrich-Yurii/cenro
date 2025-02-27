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
import { TbDots, TbFile, TbSearch } from "react-icons/tb";
import {
  getAllApplication,
  updateApplicationStatus,
} from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";

const TABLE_HEAD = [
  "Application Type",
  "Business Name",
  "Status",
  "Assessment Certificate",
  "Actions",
];

export default function BusinessApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const data = await getAllApplication();
        setApplications(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllApplications();
  }, []);

  const handleUpdateStatus = async (applicationId, status) => {
    if (!applicationId) {
      console.log("Application ID is undefined");
      return;
    }
  
    try {
      const response = await updateApplicationStatus(applicationId, status);
      console.log(response);
      
      setApplications(prevApps =>
        prevApps.map(app =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.log("Error Updating status", err);
    }
  };

  return (
    <div className="h-screen">
      <Card className="h-[35rem] w-full px-6 shadow-lg">
        <CardHeader
          className="h-38 rounded-none"
          floated={false}
          shadow={false}
        >
          <div className=" flex justify-between">
            <section>
              <Typography
                variant="h2"
                className="text-blue-800 font-extrabold font-inter"
              >
                Business Application
              </Typography>
              <p className="w-64 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This is the list of business application sent by users.
              </p>
            </section>
          </div>
          <div className="w-full flex justify-between pt-4">
            <section className="flex flex-col gap-2 items-end">
              <Menu>
                <MenuHandler>
                  <Button
                    variant="outlined"
                    className="w-42 border-blue-800 text-blue-800 py-3 rounded-lg flex justify-center items-center gap-2 font-extrabold text-sm hover:bg-blue-800 hover:text-white transition-all"
                  >
                    <TbFile className="text-lg" />
                    Filter...
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>New Business Application</MenuItem>
                  <MenuItem>Renewal of Business Certificate</MenuItem>
                </MenuList>
              </Menu>
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
                      className="text-gray-800 font-extrabold leading-none font-inter"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map(
                ({ _id, formType, businessName, status, assessmentCert }) => {
                  const isLast = _id === applications.length - 1;
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
                          {formType}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {businessName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <span
                            className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                              status === "Approved"
                                ? "bg-lime-200 text-lime-800"
                                : status === "Pending"
                                ? "bg-yellow-200 text-orange-600"
                                : "bg-red-200 text-red-600"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {assessmentCert}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300">
                        <div className="flex gap-4">
                        {status === "Pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdateStatus(_id, "Approved")}
                className="px-2 py-2 text-green-700 border border-green-700 rounded hover:bg-green-700 hover:text-white"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateStatus(_id, "Rejected")}
                className="px-2 py-2 text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white"
              >
                Reject
              </button>
            </div>
          )}
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
