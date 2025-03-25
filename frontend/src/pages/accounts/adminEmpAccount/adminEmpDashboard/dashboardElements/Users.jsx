import { TbUsers, TbUserShield } from "react-icons/tb";
import { getUsers } from "../../../../../api/AuthApi";
import { getEmployees } from "../../../../../api/AuthApi";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
      const fetchUsers = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
  
        if (!token) {
          console.error("Token not found.");
          return;
        }
  
        try {
          const data = await getUsers(token);
          setUsers(data);
        } catch (err) {
          console.log("Error:", err);
        }
      };

      fetchUsers();
    }, []);

    useEffect(() => {
      const fetchEmployees = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
  
        if (!token) {
          console.error("Token not found.");
          return;
        }
  
        try {
          const data = await getEmployees(token);
          setEmployees(data);
        } catch (err) {
          console.log("Error:", err);
        }
      };

      fetchEmployees();
    }, []);
  

  return (
    <div className="grid grid-cols-1 gap-3">
    <section className="bg-white rounded-lg p-3 shadow-lg">
      <header className="flex justify-between items-start">
        <p className="font-semibold">Employees</p>
        <TbUserShield className="text-3xl"/>
      </header>
      <h2 className="font-semibold text-4xl">{employees.length}</h2>
    </section>
    <section className="bg-white rounded-lg p-3 shadow-lg">
    <header className="flex justify-between items-start">
        <p className="font-semibold">Cenro Clients</p>
        <TbUsers className="text-3xl"/>
      </header>
      <h2 className="font-semibold text-4xl">{users.length}</h2>
    </section>
  </div>
  )
}
 
