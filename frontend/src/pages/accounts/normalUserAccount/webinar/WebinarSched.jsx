import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { TbEdit, TbSearch, TbTrash } from "react-icons/tb";
import { getAllWebinar } from "../../../../api/webinarApi";
import { useEffect, useState } from "react";

const TABLE_HEAD = [
  "Webinar Title",
  "Date and Time",
  "Webinar Link",
  "Status",
  "Actions",
];

export default function WebSched() {
  const [webinar, setWebinar] = useState([]);

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const response = await getAllWebinar();
        setWebinar(response);
      } catch (err) {
        console.error("Error Retrieving all Webinars", err);
      }
    };

    fetchWebinar();
  }, []);

  return (
    <div className="h-screen">
      <Card className="h-[32rem] w-full px-3 pt-3 shadow-lg">
        <CardHeader floated={false} shadow={false}>
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
              <Button className="ml-2 h-12 w-12 rounded-lg bg-blue-800 text-white text-2xl grid place-content-center hover:bg-blue-950">
                <TbSearch />
              </Button>
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
              {webinar.map(
                ({ formType, dateTime, webinarLink, status, _id }) => {
                  const isLast = _id === webinar.length - 1;
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
                          {dateTime}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          // variant="small"
                          className="font-normal text-gray-600"
                        >
                          <a
                            href={webinarLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {webinarLink}
                          </a>
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
                      <td className="border-b border-gray-300">
                        <div className="flex gap-4">
                          <Button
                            variant="outlined"
                            className="px-2 py-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                          >
                            <TbEdit />
                          </Button>
                          <Button
                            variant="outlined"
                            className="px-2 py-2 border-blue-800 text-blue-800  hover:bg-blue-800 hover:text-white"
                          >
                            <TbTrash />
                          </Button>
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
