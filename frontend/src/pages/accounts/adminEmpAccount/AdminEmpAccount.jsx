// import { useContext } from "react"
// import { AuthContext } from "../../context/AuthContext"
import AdminEmpSideBar from "../../../components/sidebar/AdminEmpSidebar";
import { Outlet } from "react-router-dom";

export default function AdminEmpAccount() {
  // const { logout } = useContext(AuthContext);

  console.log("Admin Account rendered!")

  return (
    <div className="z-20 flex bg-gray-200 font-inter h-screen">
      <AdminEmpSideBar />
      <div className="flex-1 p-4 h-full">
        <Outlet />
      </div>
    </div>
  );
}
