import { Outlet } from "react-router-dom";
import NormalUserSidebar from "../../../components/sidebar/NormalUserSidebar";
import SampleForm from "../../../components/forms/SampleForm";
export default function NormalUserAccount() {
 
  console.log("Normal Account rendered!")

  return (
    <div className="z-20 flex bg-gray-200">
      <NormalUserSidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
      {/* <SampleForm /> */}
    </div>
  );
}
