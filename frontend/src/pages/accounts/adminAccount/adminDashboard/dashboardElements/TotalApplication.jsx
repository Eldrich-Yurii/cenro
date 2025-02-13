import { TbFileCheck, TbHourglass, TbCancel } from "react-icons/tb"

export default function TotalApplication() {
  return (
    <div className="grid grid-flow-col gap-3">
      <section className="bg-lime-100 text-lime-800 rounded-lg p-3 shadow-lg">
        <header className="flex justify-between items-start">
          <p className="font-semibold">Approved</p>
          <TbFileCheck className="text-3xl"/>
        </header>
        <h2 className="font-semibold text-4xl">0</h2>
      </section>
      <section className="bg-yellow-100 text-orange-800 rounded-lg py-2 px-3 shadow-lg">
        <header className="flex justify-between items-start">
          <p className="font-semibold">Pending</p>
          <TbHourglass className="text-3xl"/>
        </header>
        <h2 className="font-semibold text-4xl">0</h2>
      </section>
      <section className="bg-pink-100 text-red-800 rounded-lg py-2 px-3 shadow-lg">
        <header className="flex justify-between items-start">
          <p className="font-semibold">Rejected</p>
          <TbCancel className="text-3xl"/>
        </header >
        <h2 className="font-semibold text-4xl">0</h2>
      </section>
    </div>
  );
}


