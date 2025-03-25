import { getLogs } from "../../../../../api/EmpLogsApi";
import { useEffect, useState } from "react";


export default function RecentActivity() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const actionLogs = await getLogs();
        setLogs(actionLogs);
      } catch (err) {
        console.error("Error getting data", err);
      }
    };

    getData();
  }, []);

  return (
    <div className="bg-white p-2 rounded-lg shadow-lg">
    <small className="font-semibold">Recent Activity</small>
    <section>
        <ul className="grid grid-flow-row gap-2">
          {logs.slice(0, 5).map((log) => (
            <li
              key={log._id}
              className="bg-white rounded-lg shadow-lg p-2 font-semibold"
            >
              <small>{log.user.firstname || "Unknown User"}</small>
              <p>{log.action}</p>
            </li>
          ))}
        </ul>
      </section>

  </div>
  )
}


