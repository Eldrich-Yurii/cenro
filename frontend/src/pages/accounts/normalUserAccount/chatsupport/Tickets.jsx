import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import SubmitTicket from "../../../../components/modal/SubmitTicket";
import { getUserTickets } from "../../../../api/TicketApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const TABLE_HEAD = [
  "Ticket ID",
  // "Category",
  "Subject",
  "Description",
  "Status",
  "View",
];

// const TABLE_ROWS = [
//   {
//     id: "1",
//     title: "New Business Application",
//     datetime: "Feb 26, 2025 - 10:30 AM",
//     link: "ZOOMLINK",
//     status: "pending",
//   },
//   {
//     id: "2",
//     title: "Renewal of Business Certificate",
//     datetime: "Feb 26, 2025 - 10:30 AM",
//     link: "ZOOMLINK",
//     status: "ongoing",
//   },
// ];

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      // console.log("Stored Token:", localStorage.getItem("user"));
      const token = user?.token; // Extract only the token
      // console.log("Stored Token:", token);

      if (!token) {
        console.error("Token not found.");
        return;
      }

      try {
        const data = await getUserTickets(token);
        // console.log(data);
        setTickets(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="h-screen bg-lime-300">
      <Card className="h-[32rem] w-full px-6 shadow-lg">
        <CardHeader className="rounded-none" floated={false} shadow={false}>
          <div className=" flex justify-between">
            <section>
              <Typography
                variant="h2"
                className="text-blue-800 font-extrabold font-inter"
              >
                Support Tickets
              </Typography>
              <p className="w-64 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This is the list of tickets you submitted to the Chat Support.
              </p>
            </section>
            <section className="flex flex-col gap-2 items-end">
              <SubmitTicket />
            </section>
          </div>
        </CardHeader>
        <br />
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
                      className="text-gray-800 font-extrabold leading-none font-inter"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map(({ subject, description, status, _id }) => {
                const isLast = _id === tickets.length - 1;
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
                        {_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-bold text-gray-600"
                      >
                        {subject}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <span
                          className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                            status === "Open"
                              ? "bg-blue-200 text-blue-800"
                              : status === "In Progress"
                              ? "bg-yellow-200 text-orange-600"
                              : "bg-green-200 text-green-600"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-gray-300">
                      <Link
                        to={`/support-ticket/${_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View Details
                      </Link>
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
