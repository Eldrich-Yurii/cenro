
export default function RecentActivity() {
  return (
    <div className="bg-white p-2 rounded-lg shadow-lg">
    <small className="font-semibold">Recent Activity</small>
    <section>
      <ul className="grid grid-flow-row gap-2">
        <li className="bg-white rounded-lg shadow-lg p-2 font-semibold">
          <small>User Name</small>
          <p>Uploaded receipt</p>
        </li>
        <li className="bg-white rounded-lg shadow-lg p-2 font-semibold">
          <small>Employee Name</small>
          <p>Approved Application</p>
        </li>
        <li className="bg-white rounded-lg shadow-lg p-2 font-semibold">
          <small>Inspector Name</small>
          <p>Inspection complete, certificate generated</p>
        </li>
        <li className="bg-white rounded-lg shadow-lg p-2 font-semibold">
          <small>User Name</small>
          <p>upload receipt</p>
        </li>
        <li className="bg-white rounded-lg shadow-lg p-2 font-semibold">
          <small>User Name</small>
          <p>upload receipt</p>
        </li>
      </ul>
    </section>
  </div>
  )
}


