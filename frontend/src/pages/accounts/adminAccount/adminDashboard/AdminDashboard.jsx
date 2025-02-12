export default function AdminDashboard() {
  return (
    <div className="bg-blue-200 h-screen">
      <h4>Dashboard Overview</h4>
      {/* Application Summary */}
      <div className="grid grid-flow-col gap-2">
        <section className="bg-green-300">
          <header>
            <p>Approved</p>
          </header>
          <h2>0</h2>
        </section>
        <section className="bg-orange-300">
          <header>
            <p>Pending</p>
          </header>
          <h2>0</h2>
        </section>
        <section className="bg-red-300">
          <header>
            <p>Rejected</p>
          </header>
          <h2>0</h2>
        </section>
        {/* Users */}
        <div className="grid grid-cols-1 gap-2">
          <section className="bg-lime-300">
            <p>Employees</p>
            <h2>0</h2>
          </section>
          <section className="bg-violet-300">
            <p>Cenro Clients</p>
            <h2>0</h2>
          </section>
        </div>
      </div>
      <div>
        <header>
          Recent Activity
        </header>
        <section>
          <ul>
            <li>
              <p>User Name</p>
              <p>upload receipt</p>
            </li>
            <li>
              <p>Employee Name</p>
              <p>Approved Application</p>
            </li>
            <li>
              <p>Inspector Name</p>
              <p>Inspection Complete, certificate generated</p>
            </li>
            <li>
              <p>Employee Name</p>
              <p>upload receipt</p>
            </li>
            <li>
              <p>Employee Name</p>
              <p>upload receipt</p>
            </li>
          </ul>
        </section>
      <div>

      </div>
      </div>
      <div>
        Important Alerts and Notification
      
      </div>
      <div>
        <table>Application Breakdown</table>
      </div>
    </div>
  );
}
