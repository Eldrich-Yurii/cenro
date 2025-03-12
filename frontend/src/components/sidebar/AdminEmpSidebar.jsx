import React from "react";
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
  AccordionBody
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { TbLayoutGrid, TbLogs, TbLogout2, TbSettings2, TbTicket, TbVideo, TbUser, TbFile } from "react-icons/tb";
import { Link } from "react-router-dom";
import Logo from "../../assets/cenro_orig_logo_notext.png"


export default function AdminEmpSideBar() {
  const [open, setOpen] = React.useState(0);
//   const [openDrawer, setOpenDrawer] = useState(0);

  // console.log("AdminSideBar rendered!");

  const { user, logout } = useContext(AuthContext);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-auto w-full max-w-[20rem] p-4 shadow-2xl shadow-blue-gray-900/5 rounded-none">
      <div className="">
        <Typography className="pt-2 font-black inline-flex items-center gap-2 text-green-800 font-inter" variant="h2">
          <img src={Logo} alt="" width={50}/>
          CENRO
        </Typography>
      </div>
      <List className="text-gray-600 font-inter">
        {/* Dashboard */}
        <ListItem className="text-[15px]">
          <ListItemPrefix>
            <TbLayoutGrid className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/dashboard">&nbsp;&nbsp;Dashboard</Link>
        </ListItem>


        {user.role === "admin" && (
          <>
          <ListItem className="text-[15px]">
          <ListItemPrefix>
            <TbFile className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/business-application">&nbsp;&nbsp;Business Application</Link>
        </ListItem>
        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
            />
          }
          >
            {/* Webinar */}
          <ListItem className="p-0 bg-white" selected={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
              <ListItemPrefix>
                <TbVideo className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal text-[15px]">
              &nbsp;&nbsp;Webinar & Certificate
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-white">
            <List className="p-0">
              <ListItem className="text-[15px]">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/emp/webinar-schedule">&nbsp;&nbsp;Webinar Schedule</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/emp/certificate-for-attendees">&nbsp;&nbsp;Certificate For Attendees</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem className="z-10 bg-white text-[15px]">
          <ListItemPrefix>
            <TbTicket className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/inspection-and-final-certificate">&nbsp;&nbsp;Inspection & CEC</Link>
        </ListItem>
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
              <Typography color="blue-gray" className="mr-auto font-normal text-[15px]">
              &nbsp;&nbsp;Users
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-white">
            <List className="p-0">
              <ListItem className="text-[15px]">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/emp/employees">&nbsp;&nbsp;Employees</Link>
              </ListItem>
              <ListItem className="text-[15px]">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/emp/users">&nbsp;&nbsp;CENRO Clients</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem className="z-10 bg-white text-[15px]">
          <ListItemPrefix>
            <TbTicket className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/support-and-tickets">&nbsp;&nbsp;Support/Tickets</Link>
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
          </>

        )}

          {/* Business Application*/}
          { user.designation === "validator" && (

            
            <ListItem className="text-[15px]">
          <ListItemPrefix>
            <TbFile className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/business-application">&nbsp;&nbsp;Business Application</Link>
        </ListItem>
            )
          }
        {/* Webinar */}
        { user.designation === "webinar coordinator" && (

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
              <Typography color="blue-gray" className="mr-auto font-normal text-[15px]">
              &nbsp;&nbsp;Webinar & Certificate
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1 bg-white">
            <List className="p-0">
              <ListItem className="text-[15px]">
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/emp/webinar-schedule">&nbsp;&nbsp;Webinar Schedule</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/emp/certificate-for-attendees">&nbsp;&nbsp;Certificate For Attendees</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        )}
          {/* Inspection & Final Certificate */}
        { user.designation === "inspector" && (
          <ListItem className="z-10 bg-white text-[15px]">
          <ListItemPrefix>
            <TbTicket className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/inspection-and-final-certificate">&nbsp;&nbsp;Inspection & CEC</Link>
        </ListItem>
      )}
        {/* Ticket and Chat Support */}
        { user.designation === "chat support" && (
          <ListItem className="z-10 bg-white text-[15px]">
          <ListItemPrefix>
            <TbTicket className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/support-and-tickets">&nbsp;&nbsp;Support/Tickets</Link>
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        )}
        <div className="z-10 bg-white">
        <hr className="my-2 border-blue-gray-50" />
        <ListItem className="text-[15px]">
          <ListItemPrefix>
            <TbLogs className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/employee-logs">&nbsp;&nbsp;Logs</Link>
        </ListItem>
        <ListItem className="text-[15px]">
          <ListItemPrefix>
            <TbSettings2 className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/emp/admin-settings">&nbsp;&nbsp;Settings</Link>
        </ListItem>
        <ListItem className="text-[15px]">
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