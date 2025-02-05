

export default function ClearanceForm() {
  return (
    <div className=" text-black min-w-max">
      <form action="#" className="pt-6">
        <div className="">
          <h1 className="text-center">APPLICATION TO CUT TREES</h1>

          <fieldset className=" pt[35%]w-full border border-black mt-6">
            <legend className="font-semibold">I. OWNER DETAILS</legend>
            <label htmlFor="#" className="gap-3">
              Date: Application:{" "}
            </label>
            <input
              type="date"
              name="#"
              id=""
              className="uppercase border-[2px] w-50 text-black font-bold"
            />

            <div>
              <label htmlFor="" className="pt-2">
                Name of Owner:{" "}
              </label>
              <input type="text" className="w-[30%]" />
            </div>
            <div className="pt-2">
              <label htmlFor="">Address: </label>
              <input type="text" className="w-[35%]" />
            </div>
            <div className="pt-2">
              <label htmlFor="">Contact: </label>
              <input type="text" className="w-[35%] border-l-amber-100" />
            </div>
            <div className="pt-2">
              <label htmlFor="">Lot Area: </label>
              <input type="text" className="w-[35%] border-l-amber-100" />
            </div>
            <div className="pt-2">
              <label htmlFor="">Location: </label>
              <select name="" id="" className="w-[20%] text-black">
                <option value="Select">Select</option>
                <option>Longitude</option>
                <option>Latitude</option>
              </select>
              <input type="text" className="w-[35%] border-l-amber-100" />
            </div>
          </fieldset>

          <fieldset className=" pt[35%]w-full border border-black mt-6">
            <legend className="font-semibold">II. TREES SPECIFICATION</legend>

            <div className="mb-3">
              <label htmlFor="reason" className="block">
                Reason:
              </label>
              <input
                type="text"
                id="reason"
                className="uppercase border-2 w-50 text-black font-bold p-1"
              />
            </div>

            {/* Table for Tree Specifications */}
            <div className="mt-4">
              <table className="w-full border-collapse border border-gray-400">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      Species
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      Age
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="text" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>
          <fieldset className=" pt[35%]w-full border border-black mt-6">
            <legend className="font-semibold">
              III. ASSESSMENT ( as per City Ordinance No. 73-2018, see back for
              more details)
            </legend>
            <div>
              <div>Mission Order Number:</div>
            </div>
          </fieldset>
          <fieldset className=" pt[35%]w-full border border-black mt-6">
            <legend className="font-semibold">A. Recommendations</legend>
            <div className=" justify-center items-stretch">
              <input type="text" className="p-[10rem]" />
            </div>
          </fieldset>

          <fieldset className=" pt[35%]w-full border border-black mt-6">
            <legend className="font-semibold">B. Evaluation</legend>
            <div className="mt-4">
              <table className="w-full border-collapse border border-gray-400">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      qty
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      Age
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      Species
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      Seed(Packs)
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      seeding(Pieces)
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      garden soil(Packs)
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      seedling(Pieces)
                    </th>
                    <th className="border border-gray-400 px-4 py-2 uppercase">
                      amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="text" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <input type="number" className="w-full p-1 border" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <label htmlFor="" className="uppercase">
                total seeds:
              </label>
              <input type="text" />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="uppercase">
                total seedling:
              </label>
              <input type="text" />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="uppercase">
                total garden:
              </label>
              <input type="text" />
            </div>
            <div className="mt-4">
              <label htmlFor="" className="uppercase">
                total amount:
              </label>
              <input type="text" />
            </div>
          </fieldset>
          <fieldset className=" pt[35%]w-full border border-black mt-6">
            <legend className="font-semibold">IV. SUMMARY COMPENSATION</legend>
            <div>
              <div className="mt-4">
                <label htmlFor="" className="uppercase">
                  total amount:
                </label>
                <input type="text" />
              </div>
              <div className="mt-4">
                <label htmlFor="" className="uppercase">
                  Penalty:
                </label>
                <input type="text" />
              </div>
              <div className="mt-4">
                <label htmlFor="" className="uppercase">
                  certificate to cut trees:
                </label>
                <input type="text" />
              </div>
              <label htmlFor="" className="uppercase">
                grand total (In words):
              </label>
              <input type="text" />
            </div>
          </fieldset>
          <div className="my-[5rem] text-center">
            <p>Applicant&apos;s Signature Over Print Name</p>
          </div>
          <div className="flex justify-evenly items-center mt-4 py-4">
            <p>Inspector</p>
            <p>Inspector</p>
            <p>Inspector</p>
          </div>
          <div className="mt-9">
            <p>Assessed by:</p>
            <p>____________________________________________________</p>
            <p>Supervising Enviromental Management Specialist</p>
          </div>
          <div className="mt-9 text-right pr-5">
            <p className="mr-[16rem]">Assessed by:</p>
            <p>____________________________________________________</p>
            <p className="mr-[10rem]">Gabriel Gerard S. Katigbak</p>
            <p>City Enviromental and Natural Resources Officer</p>
          </div>
        </div>
      </form>
    </div>
  );
}
