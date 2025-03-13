import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { getLogs } from "../../../../api/EmpLogsApi";

const TABLE_HEAD = ["Actions", "User", "Date"];

export default function EmpLogs() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // const user = JSON.parse(localStorage.getItem("user"));
      // const token = user?.token;
      // if (!token) {
      //   console.error("Token not found.");
      //   return;
      // }

      try {
        const actionLogs = await getLogs();
        setLogs(actionLogs);
      } catch (err) {
        console.error("Error getting data", err);
      }
    };

    getData();
  }, []);

  //search function
  useEffect(() => {
    const results = logs.filter((clt) => {
      const searchStr =
        `${clt.firstname} ${clt.middlename} ${clt.lastname} ${clt.email}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
    setFilteredClients(results);
  }, [searchTerm, logs]);

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
    <div className="h-screen">
      <Card className="h-[36rem] w-full px-2 shadow-lg">
        <CardHeader
          className="rounded-none h-24"
          floated={false}
          shadow={false}
        >
          <div className=" flex justify-between items-start">
            <section>
              <Typography variant="h2" className="text-blue-800 font-extrabold">
                Logs
              </Typography>
              <p className="w-48 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This is the list of logs.
              </p>
            </section>
            <section className="flex items-center">
              <input
                className="pl-3 h-12 border-gray-500 rounded-lg"
                type="search"
                name="empsearch"
                id="empSearch"
                placeholder="Search a User..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </section>
          </div>
        </CardHeader>
        <br />
        <CardBody className="h-96 overflow-y-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-gray-300 pb-4">
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
              {filteredClients.map(({ action, user, timestamp, _id }) => {
                const isLast = _id === filteredClients.length - 1;
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
                        {action}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {user.firstname}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {formatDateTime(timestamp)}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <div className="flex gap-2"></div>
        </CardFooter>
      </Card>
    </div>
  );
}
