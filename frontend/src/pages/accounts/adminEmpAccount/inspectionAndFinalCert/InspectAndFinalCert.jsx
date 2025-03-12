import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { TbSearch } from "react-icons/tb";
import {
  confirmInspection,
  getPendingFinalCertUsers,
} from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["ID", "Business Name", "Action"];

export default function IsnpectionAndFinalCert() {
  const [webinarAttendees, setWebinarAttendees] = useState([]);

  useEffect(() => {
    const fetchPendingFinalCertUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        if (!token) {
          console.error("Token not found.");
          return;
        }
        const data = await getPendingFinalCertUsers(token);
        setWebinarAttendees(data);
      } catch (error) {
        console.error("Error fetching pending webinar users:", error);
      }
    };

    fetchPendingFinalCertUsers();
  }, []);

  const handleCofirmInspection = async (applicationId) => {
    try {
      const response = await confirmInspection(applicationId);
      setWebinarAttendees((prev) =>
        prev.filter((attendee) => attendee._id !== applicationId)
      );
      console.log(response.message); // Show success message
    } catch (err) {
      console.log("Error generating certificate", err);
    }
  };

  return (
    <Card className="max-h-[34rem] w-full px-6 shadow-lg">
      <CardHeader
        className="rounded-none flex-shrink-0"
        floated={false}
        shadow={false}
      >
        <div className=" flex justify-between items-start">
          <section>
            <Typography variant="h2" className="text-blue-800 font-extrabold">
              Inspection and Certificate of Environmental Compliance
            </Typography>
            <p className="w-72 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              This is the list of Cenro Clients that is under inspection or completed all the requirements.
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
          </section>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-auto scrollbar">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                  <div className="flex items-center">
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
            {webinarAttendees.length === 0 ? <tr>
                <td colSpan="12" className="text-center pt-4">
                  No Pending Users Found
                </td>
              </tr>:webinarAttendees.map(({ _id, businessName }) => {
              const isLast = _id === webinarAttendees.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

              return (
                <tr key={_id} className="hover:bg-gray-50">
                  <td className={classes}>
                    <div className="flex items-center">
                      {/* <Checkbox /> */}
                      <Typography
                        variant="small"
                        className="font-bold text-gray-600"
                      >
                        {_id}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      {businessName}
                    </Typography>
                  </td>
                  {/* <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {lastname}
                        </Typography>
                      </td> */}
                  {/* <td className={classes}>
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
                      </td> */}
                  <td className="border-b border-gray-300">
                    <Button onClick={() => handleCofirmInspection(_id)}>
                      Generate Certificate Now
                    </Button>
                    {/* <div className="flex gap-4">
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
                        </div> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" className="">
            Previous
          </Button>
          <Button variant="outlined" size="sm" className="">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
