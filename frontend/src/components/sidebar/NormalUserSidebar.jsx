import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { TbFileText, TbLayoutGrid, TbLogs, TbLogout2, TbSettings2, TbTicket, TbVideo, TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import Logo from "../../assets/cenro-logo-red.png"


export default function NormalUserSidebar() {
  const [open, setOpen] = React.useState(0);
//   const [openDrawer, setOpenDrawer] = useState(0);

  console.log("AdminSideBar rendered!");

  const { logout } = useContext(AuthContext);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-auto w-full max-w-[20rem] p-4 shadow-2xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography className="pt-2 font-black inline-flex items-center gap-2 text-red-800" variant="h2">
          <img src={Logo} alt="" width={50}/>
          CENRO
        </Typography>
      </div>
      <List>
        {/* Dashboard */}
        <ListItem>
          <ListItemPrefix>
            <TbLayoutGrid className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/dashboard">&nbsp;&nbsp;Dashboard</Link>
        </ListItem>
        {/* Manage Users */}
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 bg-white" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <TbUser className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              &nbsp;&nbsp;Users
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-white">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/user-employee">&nbsp;&nbsp;Employees</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/user-cenro-clients">&nbsp;&nbsp;CENRO Clients</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        {/* Application and Receipts */}
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 bg-white" selected={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
              <ListItemPrefix>
                <TbFileText className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              &nbsp;&nbsp;Applications
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-white">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/application-summary">&nbsp;&nbsp;Application Summary</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/receipt-verification">&nbsp;&nbsp;Receipt Verification</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        {/* Webinar */}
        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 bg-white" selected={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
                <TbVideo className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              &nbsp;&nbsp;Webinar
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-white">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/webinar-schedule">&nbsp;&nbsp;Webinar Schedule</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/certificate-for-attendees">&nbsp;&nbsp;Certificate For Attendees</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        {/* Ticket and Chat Support */}
        <ListItem className="z-10 bg-white">
          <ListItemPrefix>
            <TbTicket className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/support-and-tickets">&nbsp;&nbsp;Support/Tickets</Link>
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <div className="z-10 bg-white">
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <TbLogs className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/employee-logs">&nbsp;&nbsp;Logs</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <TbSettings2 className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/admin-settings">&nbsp;&nbsp;Settings</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <TbLogout2 className="h-5 w-5" />
          </ListItemPrefix>
          &nbsp;&nbsp;<button onClick={logout}>Logout</button>
        </ListItem>
        </div>
      </List>
    </Card>
  );
}