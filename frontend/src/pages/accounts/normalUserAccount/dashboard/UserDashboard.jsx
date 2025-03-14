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
         <div className="relative w-full h-4 bg-gray-300 rounded-md overflow-hidden">
     <div className="absolute left-0 top-0 h-4 bg-green-600" style={{ width: "100%" }}></div>
     </div>

  <div className='Container_progress content="" position=absolute bg-white h-2 w-full top=[50%] left-0 z-1 transform -translate-y-1/2'> 
  <div className="flex justify-around items-center text-white ">
     <div className="cicyle bg-green-400  text-black md:text-2xl sm:text-2xl text-2xl">Evaluator</div>
     <div className="cicyle bg-green-400  text-black md:text-2xl sm:text-2xl text-2xl">Initial Approver</div>
     <div className="cicyle bg-green-400  text-black md:text-2xl sm:text-2xl text-2xl">Seminar</div>
     <div className="cicyle bg-green-400  text-black md:text-2xl sm:text-2xl text-2xl">Inspection</div>
     <div className="cicyle bg-green-400  text-black md:text-2xl sm:text-2xl text-2xl">Generate Certificate</div>

  </div>
  </div> 
  <br />
      </CardBody>
      <div className="container mx-auto  bg-slate-400 px-10 py-15 mt-20">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="border px-4 py-2">Account Number</th>
                  <th className="border px-4 py-2">Date of Submission</th>
                  <th className="border px-4 py-2">Details</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="hover:bg-gray-800">
                  <td className="border px-4 py-2">123456789</td>
                  <td className="border px-4 py-2">01/01/2021</td>
                  <td className="border px-4 py-2">Renewal Business Application</td>
                  <td className="border px-4 py-2 text-green-600">Approved</td>
                  <td className="flex justify-center border px-3 py-1">
                    <button className="ml-8 bg-green-500 text-white px-6 py-2 rounded">GENERATED CERTIFICATE</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-800">
                  <td className="border px-4 py-2">987654321</td>
                  <td className="border px-4 py-2">02/15/2022</td>
                  <td className="border px-4 py-2">New Business Application</td>
                  <td className="border px-4 py-2 text-black-500">Compliance</td>
                  <td className="flex justify-center border px-3 py-1">
                    <button className="border ml-8 bg-blue-500 text-white px-6 py-2 rounded">COMPLIANCE</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-800">
                  <td className="border px-4 py-2">987654321</td>
                  <td className="border px-4 py-2">02/15/2022</td>
                  <td className="border px-4 py-2">Renewal Business Application</td>
                  <td className="border px-4 py-2 text-red-500">Reject</td>
                  <td className="flex justify-center items-center px-3 py-1">
                    <td className="px-6 py-2 bg-red-200 text-red-600">REJECTED</td>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      </CardFooter>
    </Card>
  </div>
  )
}


