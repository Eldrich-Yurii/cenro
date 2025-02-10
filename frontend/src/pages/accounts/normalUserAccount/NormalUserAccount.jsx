import { Outlet } from "react-router-dom";
import NormalUserSidebar from "../../../components/sidebar/NormalUserSidebar";

export default function NormalUserAccount() {
 
  console.log("Admin Account rendered!")

  return (
    <div className="z-20 flex bg-gray-200">
      <NormalUserSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
