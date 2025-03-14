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
import { getUsers } from "../../../../api/AuthApi";

const TABLE_HEAD = [
  "First Name",
  "Middle Name",
  "Last Name",
  "Email",
  "Actions",
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
  {
    id: "3",
    firstname: "kel",
    middlename: "Cor",
    lastname: "Sega",
    designation: "Inspector",
  },
  {
    id: "4",
    firstname: "Jey",
    middlename: "Pi",
    lastname: "Pol",
    designation: "Chat Support",
  },
  {
    id: "5",
    firstname: "Yu",
    middlename: "Li",
    lastname: "Sis",
    designation: "Webinar Coordinator",
  },
  {
    id: "6",
    firstname: "kel",
    middlename: "Cor",
    lastname: "Sega",
    designation: "Inspector",
  },
  {
    id: "7",
    firstname: "Jey",
    middlename: "Pi",
    lastname: "Pol",
    designation: "Chat Support",
  },
];

export default function CenroClients() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) {
        console.error("Token not found.");
        return;
      }

      try {
        const clientData = await getUsers(token);
        setClients(clientData);
      } catch (err) {
        console.error("Error getting data", err);
      }
    };

    getData();
  }, []);

  //search function
  useEffect(() => {
    const results = clients.filter((clt) => {
      const searchStr =
        `${clt.firstname} ${clt.middlename} ${clt.lastname} ${clt.email}`.toLowerCase();
      return searchStr.includes(searchTerm.toLowerCase());
    });
    setFilteredClients(results);
  }, [searchTerm, clients]);

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
                Cenro Clients
              </Typography>
              <p className="w-48 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
                This is the list of users.
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
              {filteredClients.map(
                ({ firstname, middlename, lastname, email, _id }) => {
                  const isLast = _id === TABLE_ROWS.length - 1;
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
                          {email}
                        </Typography>
                      </td>
                      <td className="border-b border-gray-300">
                        <div className="flex justify-star gap-4">
                          <Button
                            variant="outlined"
                            className="px-2 py-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white"
                          >
                            <TbSearch />
                          </Button>
                          {/* <Button variant="outlined" className="px-2 py-2 border-blue-800 text-blue-800  hover:bg-blue-800 hover:text-white">
                            <TbTrash />
                          </Button> */}
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
          <div className="flex gap-2">
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
