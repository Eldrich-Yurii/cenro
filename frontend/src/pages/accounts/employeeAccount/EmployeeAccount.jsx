import EmpSideBar from "../../../components/sidebar/Empsidebar";
import { Outlet } from "react-router-dom";



export default function EmployeeAccount() {
    return (
        <div className="z-20 flex bg-gray-200 font-inter">
        <EmpSideBar />
        <div className="flex-1 px-6 py-4">
          <Outlet />
        </div>
      </div>

      
    )
}