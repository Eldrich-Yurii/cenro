import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { confirmAttendance, getAllWebinar } from "../../../../api/webinarApi";
import { useEffect, useState } from "react";

const TABLE_HEAD = [
  "Webinar Title",
  "Date and Time",
  "Attendees",
  "Status",
  "Action",
];

export default function WebSched() {
  const [webinar, setWebinar] = useState([]);
  const [confirm, setConfirm] = useState({});

  // Assuming you store userId locally after login
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const response = await getAllWebinar();
        setWebinar(response);

        // Pre-fill confirm status per webinar
        const confirmStatus = {};

        response.forEach((web) => {
          const hasConfirmed = web.attendees.some(
            (attendee) => attendee.userId === userId
          );
          confirmStatus[web._id] = hasConfirmed;
        });

        setConfirm(confirmStatus);
      } catch (err) {
        console.error("Error Retrieving all Webinars", err);
      }
    };

    fetchWebinar();
  }, [userId]);

  const handleConfirmAttendance = async (webinarId) => {
    try {
      await confirmAttendance(webinarId, userId);

      // Set button disabled for this webinar
      setConfirm((prev) => ({
        ...prev,
        [webinarId]: true,
      }));

      // Update local webinar attendees count immediately
      setWebinar((prev) =>
        prev.map((web) =>
          web._id === webinarId
            ? {
                ...web,
                attendees: [...web.attendees, { userId }],
              }
            : web
        )
      );
    } catch (error) {
      console.log("Error Confirming Attendance", error);
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card className="max-h-[34rem] w-full px-3 pt-3 shadow-lg">
      <CardHeader
        className="flex-shrink-0 rounded-none"
        floated={false}
        shadow={false}
      >
        <div className=" flex justify-between items-start">
          <section>
            <Typography
              variant="h2"
              className="text-blue-800 font-extrabold font-inter"
            >
              Webinar Schedule
            </Typography>
            <p className="w-48 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              This is the list of webinar schedules.
            </p>
          </section>
          <section className="flex items-center">
            <input
              className="pl-3 h-12 border-gray-500 rounded-lg"
              type="search"
              name="empsearch"
              id="empSearch"
              placeholder="Search..."
            />
          </section>
        </div>
      </CardHeader>
      <br />
      <CardBody className="overflow-y-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10">
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
            {webinar.map(
              ({
                formType,
                dateTime,
                attendees,
                maxAttendees,
                status,
                _id,
              }) => {
                const isLast = _id === webinar.length - 1;
                const classes = isLast
                  ? "py-4"
                  : "py-4 border-b border-gray-300";

                const isConfirmed = confirm[_id];
                const isFull = attendees.length >= maxAttendees;

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
                        {formatDateTime(dateTime)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className="font-bold text-gray-600">
                        {attendees.length} / {maxAttendees}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <span
                          className={`px-3 py-2 font-extrabold uppercase text-xs rounded-lg ${
                            status === "ongoing"
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
                    <td className={classes}>
                      <Button
                        onClick={() => handleConfirmAttendance(_id)}
                        disabled={isConfirmed || isFull}
                      >
                        {isConfirmed
                          ? "Confirmed!"
                          : isFull
                          ? "Webinar Full"
                          : "Get Link"}
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
    </Card>
  );
}