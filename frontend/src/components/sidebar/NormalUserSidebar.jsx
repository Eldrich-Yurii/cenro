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
import { TbFileText, TbLayoutGrid, TbLogout2, TbSettings2, TbTicket, TbVideo, TbFileCertificate, TbNotification } from "react-icons/tb";
import { Link } from "react-router-dom";
import Logo from "../../assets/cenro_orig_logo_notext.png"


export default function NormalUserSidebar() {
  const [open, setOpen] = React.useState(0);
//   const [openDrawer, setOpenDrawer] = useState(0);

  console.log("AdminSideBar rendered!");

  const { logout } = useContext(AuthContext);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-screen overflow-y-auto w-full max-w-[20rem] p-4 shadow-2xl shadow-blue-gray-900/5 rounded-none">
      <div className="mb-2 p-4">
        <Typography className="pt-2 font-black inline-flex items-center gap-2 text-green-800" variant="h2">
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
          <Link to="/user-account/dashboard">&nbsp;Dashboard</Link>
        </ListItem>
        {/* My Application */}
        <ListItem>
          <ListItemPrefix>
            <TbFileText className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/user-account/my-application">&nbsp;My Business Application</Link>
        </ListItem>  
        {/* Webinar */}
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 bg-white" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <TbVideo className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              &nbsp;Webinar
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-white">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/user-account/webinar-schedule">&nbsp;Webinar Schedule</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/user-account/webinar-certificate">&nbsp;Certificate of Participation</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        {/* Final Certificate */}
        <ListItem>
          <ListItemPrefix>
            <TbFileCertificate className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/user-account/final-certificate">&nbsp;Certificate of Environmental Compliance</Link>
        </ListItem>
        {/* Notifications */}
        <ListItem className="z-10 bg-white">
          <ListItemPrefix>
            <TbNotification className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/user-account/notifications">&nbsp;Notifications</Link>
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        {/* Ticket and Chat Support */}
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
                <TbTicket className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
              &nbsp;FAQs & Chat Support
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-white">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/user-account/frequently-asked-questions">&nbsp;Frequently Asked Questions</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/user-account/support-ticket">&nbsp;Chat Support</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        {/* <ListItem className="z-10 bg-white">
          <ListItemPrefix>
            <TbTicket className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/user-account/chat-support">&nbsp;&nbsp;FAQ & Chat Support</Link>
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem> */}
        <div className="z-10 bg-white">
        <hr className="my-2 border-blue-gray-50" />
        {/* <ListItem>
          <ListItemPrefix>
            <TbLogs className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/employee-logs">&nbsp;&nbsp;Logs</Link>
        </ListItem> */}
        <ListItem>
          <ListItemPrefix>
            <TbSettings2 className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/user-account/settings">&nbsp;Settings</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <TbLogout2 className="h-5 w-5" />
          </ListItemPrefix>
          &nbsp;<button onClick={logout}>Logout</button>
        </ListItem>
        </div>
      </List>
    </Card>
  );
}