import { TbUsers, TbUserShield } from "react-icons/tb";

export default function Users() {
  return (
    <div className="grid grid-cols-1 gap-3">
    <section className="bg-white rounded-lg p-3 shadow-lg">
      <header className="flex justify-between items-start">
        <p className="font-semibold">Employees</p>
        <TbUserShield className="text-3xl"/>
      </header>
      <h2 className="font-semibold text-4xl">0</h2>
    </section>
    <section className="bg-white rounded-lg p-3 shadow-lg">
    <header className="flex justify-between items-start">
        <p className="font-semibold">Cenro Clients</p>
        <TbUsers className="text-3xl"/>
      </header>
      <h2 className="font-semibold text-4xl">0</h2>
    </section>
  </div>
  )
}
 
