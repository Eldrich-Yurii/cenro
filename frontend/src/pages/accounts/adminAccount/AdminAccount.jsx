// import { useContext } from "react"
// import { AuthContext } from "../../context/AuthContext"
import AdminSideBar from "../../../components/sidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminAccount() {
  // const { logout } = useContext(AuthContext);

  console.log("Admin Account rendered!")

  return (
    <div className="z-20 flex bg-gray-200">
      <AdminSideBar />
      <div className="flex-1 px-6 py-4">
        <Outlet />
      </div>
    </div>
  );
}
