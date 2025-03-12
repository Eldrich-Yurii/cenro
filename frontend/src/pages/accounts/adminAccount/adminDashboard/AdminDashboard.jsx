import TotalApplication from "./dashboardElements/TotalApplication";
import Users from "./dashboardElements/Users";
import RecentAct from "./dashboardElements/RecentActivity";
import ImportantAlerts from "./dashboardElements/ImportantAlerts";
import ApplicationBreakdown from "./dashboardElements/ApplicationBreakdown"


export default function AdminDashboard() {
  return (
    <div className="h-auto">
      <small className="font-semibold">Dashboard Overview</small>
      <div className="grid grid-flow-col pt-2">
        {/* Total Application */}
        <TotalApplication />
      </div>
      <div className="grid grid-flow-col gap-3 pt-3">
        <div className="grid grid-cols-1 gap-3">
          {/* Users */}
          <Users />
          {/* Recent Activity */}
          <ImportantAlerts />
        </div>
        {/* Important Alerts */}
        <RecentAct />
      </div>
      <div className="pt-3">
        <ApplicationBreakdown />
      </div>
    </div>
  );
}
