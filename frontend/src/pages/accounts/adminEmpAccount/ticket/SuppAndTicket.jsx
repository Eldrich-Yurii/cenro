import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { getAllTicket } from "../../../../api/TicketApi";
import { useEffect, useState } from "react";
import AdminEmpTicketModal from "../../../../components/modal/AdminEmpTicketModal";

const TABLE_HEAD = ["Reference Number", "Subject", "Description", "Status", "View"];

export default function SuppAndTicket() {
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
        const data = await getAllTicket(token);
        setTickets(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchTickets();
  }, []);

  const handleStatusUpdate = (ticketId, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  return (
      <Card className="h-auto w-full px-6 shadow-lg">
              <CardHeader className="rounded-none" floated={false} shadow={false}>
                <div className="flex justify-between">
                  <section>
                    <Typography
                      variant="h2"
                      className="text-blue-800 font-extrabold font-inter"
                    >
                      Chat Support
                    </Typography>
                    <p className="w-64 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                      This is the list of concerns or follow-ups submitted by the clients.
                    </p>
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
                    {tickets.map((ticket) => {
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
                                    : "bg-lime-200 text-lime-700"
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
                      </button>                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              </CardFooter>
              {selectedTicket && (
                <AdminEmpTicketModal
                  ticket={selectedTicket}
                  onStatusUpdate={handleStatusUpdate}
                  isOpen={!!selectedTicket}
                  onClose={() => setSelectedTicket(null)}
                />
              )}
            </Card>
  );
}
