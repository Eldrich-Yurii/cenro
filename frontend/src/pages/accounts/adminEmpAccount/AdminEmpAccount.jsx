// import { useContext } from "react"
// import { AuthContext } from "../../context/AuthContext"
import AdminEmpSideBar from "../../../components/sidebar/AdminEmpSidebar";
import { Outlet } from "react-router-dom";

export default function AdminEmpAccount() {
  // const { logout } = useContext(AuthContext);

  console.log("Admin Account rendered!")

  return (
    <div className="z-20 flex bg-white font-inter">
      <AdminEmpSideBar />
      <div className="flex-1 p-4 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
