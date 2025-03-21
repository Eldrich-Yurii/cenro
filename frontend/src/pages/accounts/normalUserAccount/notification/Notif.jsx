import { useEffect, useState } from "react"
import { getNotif } from "../../../../api/NotificationApi"

export default function Notif() {

  const [notif, setNotif] = useState([])

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const data = await getNotif();
        setNotif(data)
      } catch (error) {
        console.log("Error Retrieving Notifications", error)
      }
    }
    fetchNotif()
  },[])

    return (
      <div className="h-screen">
        {notif.map((notification) => {
          return (
            <div key={notification.id} className="bg-white p-4 rounded-lg shadow-lg mb-3 ">
              <h2 className="text-base font-bold">{notification.message}</h2>
              <p>Here is the link for this webinar</p>
              <a href={notification.link} className="underline text-blue-600 font-semibold" target="_blank" rel="noopener noreferrer">{notification.link}</a>
            </div>
          )
        })}
    </div>
    )
  }
  
  
  