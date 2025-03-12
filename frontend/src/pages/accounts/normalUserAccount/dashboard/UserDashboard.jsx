import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { getUserApplication, uploadAssessment } from "../../../../api/ApplicationApi";
import { useEffect, useState } from "react";
import SubmitApplication from "../../../../components/modal/SubmitApplication"
import ProgressTracker from "./dasboardElements/ProgressTracker";

export default function UserDashboard() {
  return (
    <div className="h-screen">
    <Card className="h-[32rem] w-full px-6 shadow-lg">
      <CardHeader className="rounded-none" floated={false} shadow={false}>
        <div className=" flex justify-between">
          <section>
            <Typography
              variant="h2"
              className="text-blue-800 font-extrabold font-inter"
            >
              My Dashboard - WORK IN PROGRESS
            </Typography>
            <p className="w-64 text-sm leading-[120%] py-2 font-semibold text-gray-600 tracking-tight">
              Progress bar of your application status will show here. 
            </p>
          </section>
          
        </div>
      </CardHeader>
      <CardBody>
        {/* <ProgressTracker /> */}
        {/* <table className="w-full min-w-max table-auto text-left">
         
        </table> */}
       
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      </CardFooter>
    </Card>
  </div>
  )
}


