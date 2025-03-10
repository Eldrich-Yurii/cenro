import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { getUserTickets } from "../../../../api/TicketApi";
import { useEffect, useState } from "react";
import UserTicketModal from "../../../../components/modal/UserTicketModal";
import SubmitTicket from "../../../../components/modal/SubmitTicket";

const TABLE_HEAD = ["Reference Number", "Subject", "Description", "Status", "View"];

export default function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        console.error("Token not found.");
        return;
      }

      try {
        const data = await getUserTickets(token);
        setTickets(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchTickets();
  }, []);

  return (
      <Card className="max-h-[34rem] w-full px-6 shadow-lg">
        <CardHeader className="rounded-none h-full" floated={false} shadow={false}>
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
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="12" className="text-center pt-4">
                    No Tickets Found
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => {
                  const isLast = ticket._id === tickets.length - 1;
                  const classes = isLast
                    ? "py-4"
                    : "py-4 border-b border-gray-300";

                  return (
                    <tr key={ticket._id} className="hover:bg-gray-50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-bold text-gray-600"
                        >
                          {ticket._id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-bold text-gray-600"
                        >
                          {ticket.subject}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {ticket.description}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <span
                            className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                              ticket.status === "Open"
                                ? "bg-blue-200 text-blue-800"
                                : ticket.status === "In Progress"
                                ? "bg-yellow-200 text-orange-600"
                                : "bg-green-200 text-green-600"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </div>
                      </td>
                      <td className="border-b border-gray-300">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-blue-800 font-bold"
                        >
                          View
                        </button>{" "}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-6">
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
        {selectedTicket && (
          <UserTicketModal
            ticket={selectedTicket}
            isOpen={!!selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </Card>
  );
}
