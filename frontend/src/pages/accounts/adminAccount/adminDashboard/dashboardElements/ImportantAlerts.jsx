export default function ImportantAlerts() {
  return (
    <div className="bg-white p-3 rounded-lg font-semibold shadow-lg">
      <small>Important Alerts and Notification</small>
      <section>
        <ul className="grid grid-flow-row gap-2">
          <li className="bg-white shadow-md rounded-lg p-2">
            <p>3 Pending Receipt for Review</p>
          </li>
          <li className="bg-white shadow-md rounded-lg p-2">
            <p> 5 Applications waiting inspection</p>
          </li>
          <li className="bg-white shadow-md rounded-lg p-2">
            <p>2 Urgent Support Tickets</p>
          </li>
        </ul>
      </section>
    </div>
  );
}


