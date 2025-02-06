export default function NewBusinessPermit() {
    return (
      <div className="font-inter w-full">
        <div className="grid h-screen">
          
          
            {/* Business Permit Form */}
            <div className="w-full h-[78rem] py-12 overflow-y-auto border-2 border-stone-400 rounded-xl outline-offset-4 bg-stone-300/50 shadow-2xl" >
              <div className="w-full pb-8 text-black-900">
                <h2 className="pl-12 font-black text-4xl text-center pb-2 leading-[100%]">
                  BUSINESS PERMIT FORM
                </h2>
                {/* Instructions */}
                <p className="pl-12 text-lg font-medium w-90 leading-[120%]">
                  General Instructions:
                </p>
                <p className="pl-12 text-sm font-medium w-90 leading-[120%]">
                  1. Please ensure that ALL details filled are CORRECT. Incorrect details may lead to rejection of your application. 
                </p>
                <p className="pl-12 text-sm font-medium w-90 leading-[120%]">
                  2. All required boxes should be completely and clearly filled-out.
                </p>
              </div>
              {/* Full Name */}
              <div className=" pl-12 pr-12 flex">
                <div className="pb-2 flex flex-col gap-2">
                  <label className="font-semibold text-black-900">
                    Tax Year
                  </label>
                  <form class="max-w-sm mx-auto">
              <select id="years" class="bg-gray-50 border border-gray-20 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose Year</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
              </select>
              </form>
                </div>
  
              </div>
              
              <div className="pl-12 pr-12 pb-2 flex flex-col gap-2">
              <h2 className="pl-12 font-black text-xl text-center pt-13 pb-4 leading-[100%]">
                  Business Information and Registration
                </h2>
                  <label className="font-semibold text-black-900">
                      Form of Organization - Only choose one
                  </label>
                  <div class="flex items-center">
                      <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-1" class="ms-2 text-sm font-medium dark:text-black">
                       Sole Proprietorship
                       </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-2" class="ms-2 text-sm font-medium dark:text-black">
                       Partnership
                      </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-3" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-3" class="ms-2 text-sm font-medium dark:text-black">
                      Corporation
                      </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-4" class="ms-2 text-sm font-medium dark:text-black">
                      One Person Corporation
                      </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-5" class="ms-2 text-sm font-medium dark:text-black">
                      Cooperative
                      </label>
                  </div>
                      <div className="grid grid-cols-2 gap-2">
                      <div className="pb-3 flex flex-col gap-2">
            <label className="font-semibold text-black-900">
              Registration Number
            </label>
            <input
              type="input"
              id=""
              name="registrationnumber"
              required
              className="border-black border-2 w-full h-12 rounded-lg px-2"
            />
          </div>
          <div className="pb-3 flex flex-col gap-2">
            <label className="font-semibold text-black-900">
              TIN
            </label>
            <input
              type="input"
              id=""
              name="tin"
              required
              className="border-black border-2 w-min h-12 rounded-lg px-2"
            />
          </div>
          <div className="pb-3 flex flex-col gap-">
            <label className="font-semibold text-black-900">
              Trade Name
            </label>
            <input
              type="input"
              id=""
              name="tradename"
              required
              className="border-black border-2 w-full h-12 rounded-lg px-2"
            />
          </div>
              <div class="relative max-w-sm flex w-full rounded-xl">
          <nav class="flex min-w-[240px] flex-row gap-1 p-2">
              <div
              role="button"
              class="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
              <label
                  for="franchise"
                  class="flex w-full cursor-pointer items-center px-3 py-2"
              >
                  <div class="inline-flex items-center">
                  <label class="relative flex items-center cursor-pointer" for="franchise">
                      <input
                      name="framework-horizontal"
                      type="radio"
                      class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                      id="franchise"
                      checked
                      />
                      <span class="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label class="ml-2 text-black cursor-pointer text-lg" for="react-horizontal">
                      Franchise
                  </label>
                  </div>
              </label>
              </div>
              <div
              role="button"
              class="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              >
              <label
                  for="ipo"
                  class="flex w-full cursor-pointer items-center px-3 py-2"
              >
                  <div class="inline-flex items-center">
                  <label class="relative flex items-center cursor-pointer" for="ipo">
                      <input
                      name="framework-horizontal"
                      type="radio"
                      class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                      id="ipo"
                      />
                      <span class="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label class="ml-2 text-black cursor-pointer text-lg" for="ipo">
                      IPO
                  </label>
                  </div>
              </label>
              </div>
          </nav>
          
  </div>
                  
          </div>
          
              </div>
              <div className="pb-3">
              <div className="pl-12 pr-12 pb-3  gap-2">
            <label className="font-semibold text-black-900">
              Business Name
            </label>
            <input
              type="input"
              id=""
              name="businessname"
              required
              className="border-black border-2 w-full h-12 rounded-lg px-2"
            />
          </div>
          <label className="pl-12 font-semibold">
            Main Office Address
          </label>
          <div className=" pl-12 pr-12 pt-2 pb-3 grid grid-cols-5 gap-2">
            
              <input
                type="text"
                id="house"
                name="house"
                placeholder="House/ Bldg No."
                required
                className=" border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            
            <div>
              <input
                type="text"
                id="nameofbldg"
                name="nameofbuilding"
                placeholder="Name of Building"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="blknmbr"
                name="blknumber"
                placeholder="Block No."
                required
                className=" border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="lotnmbr"
                name="lotnumber"
                placeholder="Lot No."
                required
                className=" border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Street"
                required
                className=" border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="subdvsn"
                name="subdvsn"
                placeholder="Subdivision"
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Barangay"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City/Municipality"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="prvnc"
                name="province"
                placeholder="Province"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="Zip Code"
                maxLength="4"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
          </div>
          <label className="pl-12 font-semibold text-black-900">
              Contact Person Details
            </label>
            <p className="pl-12 text-black-900">
              Full Name
            </p>
            <div className="pl-12 pr-12 pb-3 grid grid-cols-4 gap-2 ">
              
            <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            <input
                type="text"
                id="mdlname"
                name="mdlname"
                placeholder="Middle Name"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            <input
                type="text"
                id="fstname"
                name="fstname"
                placeholder="First Name"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
              <input
                type="text"
                id="sfx"
                name="sfx"
                placeholder="Suffix (Leave blank if nothing)"
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <p className="pl-12 text-black-900">
              Telephone Number & E-mail
            </p>
            <div className="pl-12 pr-12 pb-3 grid grid-cols-2 gap-2 ">
            <input
                type="text"
                id="tlpno"
                name="tlpno"
                placeholder="Telephone Number"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            <input
                type="text"
                id="email"
                name="email"
                placeholder="E-mail"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
              </div>
              
                  </div>
                  <h2 className="pl-12 font-black text-xl text-center pt-13 pb-4 leading-[100%]">
                  Business Operation Details
                </h2>
                
                <div className="pl-12 pr-12 grid grid-cols-4 gap-5">
                  <div>
                  <label className="text-black-900 ">
              Total Capital Investment
            </label>
            <input
                type="text"
                id="house"
                name="house"
                placeholder="P0.00"
                required
                className="w-30 h-12 rounded-lg pl-2"
              />
                  </div>
                  <div>
                  <label className="text-black-900 ">
              Total Floor Area - in sqm
            </label>
            <input
                type="text"
                id="house"
                name="house"
                placeholder="0"
                required
                className="w-18 h-12 rounded-lg pl-2"
              />
                  </div>
                  <div>
                  <label className="text-black-900">
              Total Number of Employees
            </label>
            <input
                type="text"
                id="house"
                name="house"
                placeholder="Male"
                required
                className="w-[150px] h-12 rounded-lg pl-2"
              />
              <h>--</h>
              <input
                type="text"
                id="house"
                name="house"
                placeholder="Female"
                required
                className="w-[150px] h-12 rounded-lg pl-2"
              />
                  </div>
                  <div>
                  
               <label className="text-black-900 ">
              Number of Employees Residing in San Juan
            </label>
            <input
                type="text"
                id="house"
                name="house"
                placeholder="0"
                required
                className="w-18 h-12 rounded-lg pl-2"
              />
                  </div>
                  
              
              </div>
              <div className="pl-12 pr-12 pt-5 grid grid-cols-4 gap-5">
                  <div>
                  <label className="text-black-900 ">
              Total Number of Delivery Vehicles
            </label>
            <input
                type="text"
                id="house"
                name="house"
                placeholder="P0.00"
                required
                className="w-30 h-12 rounded-lg pl-2"
              />
                  </div>
              </div>
              <div className="pl-12 pt-10">
              <label className="font-semibold text-black-900">
                Business Location
              </label>
              </div>
              <div className="pl-12 grid grid-cols-4 gap-2">
              
              <input
                type="text"
                id="house"
                name="house"
                placeholder="House/ Bldg No."
                required
                className=" border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            
            <div>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Name of Building"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Block No."
                required
                className=" border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Lot No."
                required
                className=" border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Street"
                required
                className=" border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Subdivision"
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Barangay"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="City/Municipality"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Province"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                id="brgy"
                name="brgy"
                placeholder="Zip Code"
                maxLength="4"
                required
                className="border-black border-2 w-full h-12 rounded-lg pl-2"
              />
            </div>
            
              </div>
              
              <div className="grid grid-cols-2">
              <div className="pt-10 pl-12 gap-2">
              <label className="font-semibold text-black-900">
                      Business Activity - Only choose one
                  </label>
                  <div class="flex items-center">
                      <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-1" class="ms-2 text-sm font-medium dark:text-black">
                       Main Office
                       </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-2" class="ms-2 text-sm font-medium dark:text-black">
                       Admin/Office Only
                      </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-3" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-3" class="ms-2 text-sm font-medium dark:text-black">
                      Branch
                      </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-4" class="ms-2 text-sm font-medium dark:text-black">
                      Warehouse
                      </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-5" class="ms-2 text-sm font-medium dark:text-black">
                      Others - please specify: <input className="border-black border-2 rounded-lg pl-2"></input>
                      </label>
                  </div>
  
              </div>
  
              <div className="pt-10 pl-12 gap-2">
              <label className="font-semibold text-black-900">
                      Monthly Rental of Place of Business
                  </label>
                  
                  <div class="flex items-center">
                      <input checked id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-4" class="ms-2 text-sm font-medium dark:text-black">
                      Not Rented/Free of Use
                      </label>
                  </div>
                  <div class="flex items-center">
                      <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                      <label for="default-radio-5" class="ms-2 text-sm font-medium dark:text-black">
                      Monthly Rented - Be ready to attach the copy of Lease of Contract: 
                      <input className="border-black border-2 rounded-lg pl-2">
                      </input>
                      </label>
                  </div>
  
              </div>
              
              </div>
              <div className="pt-10 pl-12 gap-2 grid grid-cols-3">
                    <div className="text-center font-semibold">
                      <h>
                        Line of Business
                      </h>
                      <div className="">
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      </div>
                      </div>
  
                      <div className="text-center font-semibold">
                      <h>
                        Products/Services
                      </h>
                      <div className="">
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      </div>
                      </div>
  
                      <div className="text-center font-semibold">
                      <h>
                        Capital Investment
                      </h>
                      <div className="">
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      <input className="w-full border-black border-2 rounded-lg pl-2">
                      </input>
                      </div>
                      </div>
                      
              </div>
            </div>
            
      
          
        </div>
        
        
      </div>
      
    );
  }
  