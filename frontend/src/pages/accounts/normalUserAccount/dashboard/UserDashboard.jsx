import ProgressTracker from "./dasboardElements/ProgressTracker";
import TotalApplication from "./totalApplication/TotalApplication";
export default function UserDashboard() {
  return (
    <div className="h-screen">
      <div className="mb-2">
      <small className="font-semibold">Dashboard Overview</small>
      </div>
      <div className="mb-4">
        <TotalApplication />
      </div>
      <div>
        <ProgressTracker />
      </div>
    </div>
  );
}
