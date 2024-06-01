import { useState } from "react";
import MemberStaff from "../components/Forms/MemberStaff";

const MembersGround = () => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div>
      <div>
        <section>
          <div className="relative w-full h-96">
            <img
              className="absolute h-full w-full object-cover object-center"
              src="https://bucket.material-tailwind.com/magic-ai/bbe71871de8b4d6f23bb0f17a6d5aa342f3dea72677ba7238b18defa3741244d.jpg"
              alt="nature image"
            />
            <div className="absolute inset-0 h-full w-full bg-black/50"></div>
            <div className="relative pt-28 text-center">
              <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
                Ground Membership
              </h2>
              <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
                Unlock the potential of outdoor sports and activities with our
                Ground Membership. Designed for enthusiasts who love to engage
                in various outdoor games and recreational activities, our
                well-maintained grounds provide the perfect setting for all your
                sporting needs.
              </p>
            </div>
          </div>
          <div className="-mt-16 mb-8 px-8 ">
            <div className="container mx-auto">
              <div className="py-3 justify-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">
                  <div className="p-4">
                      <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
                        <button
                          onClick={() => setOpenTab(1)}
                          className={`w-1/4 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                            openTab === 1 ? "bg-blue-600 text-white" : ""
                          }`}
                        >
                          Guidelines
                        </button>
                        <button
                          onClick={() => setOpenTab(2)}
                          className={`w-1/4 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                            openTab === 2 ? "bg-blue-600 text-white" : ""
                          }`}
                        >
                          Form
                        </button>
                      </div>

                      {openTab === 1 && (
                        <div className="my-2 grid gap-6 px-4">
                        <div className="p-6 px-2 sm:pr-6 sm:pl-4">
                          <h4 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors">
                            Guidelines for Swimming Pool Membership
                          </h4>
                          <div className="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">
                            <p>
                              1. Find out how our investment in sustainable practices
                              is driving us towards a greener future, showcasing our
                              commitment to environmental responsibility.
                            </p>
                            <p>
                              2. Find out how our investment in sustainable practices
                              is driving us towards a greener future, showcasing our
                              commitment to environmental responsibility.
                            </p>
                          </div>
                        </div>
                      </div>
                      )}

                      {openTab === 2 && (
                        <MemberStaff />
                      )}
                    </div>
                </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MembersGround;

// import { useState } from "react";
// import MemberStaff from "../components/Forms/MemberStaff";

// const MembersGround = () => {
//   const [openTab, setOpenTab] = useState(1);
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   const handleDropdownToggle = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <div>
//       <div>
//         <section>
//           <div className="relative w-full h-96">
//             <img
//               className="absolute h-full w-full object-cover object-center"
//               src="https://bucket.material-tailwind.com/magic-ai/bbe71871de8b4d6f23bb0f17a6d5aa342f3dea72677ba7238b18defa3741244d.jpg"
//               alt="nature image"
//             />
//             <div className="absolute inset-0 h-full w-full bg-black/50"></div>
//             <div className="relative pt-28 text-center">
//               <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
//                 Ground Membership
//               </h2>
//               <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
//                 Unlock the potential of outdoor sports and activities with our
//                 Ground Membership. Designed for enthusiasts who love to engage
//                 in various outdoor games and recreational activities, our
//                 well-maintained grounds provide the perfect setting for all your
//                 sporting needs.
//               </p>
//             </div>
//           </div>
//           <div className="-mt-16 mb-8 px-8 ">
//             <div className="container mx-auto">
//               <div className="py-3 flex justify-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">
//                 <div className="p-4">
//                   <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
//                     <button
//                       onClick={() => setOpenTab(1)}
//                       className={`w-1/4 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
//                         openTab === 1 ? "bg-blue-600 text-white" : ""
//                       }`}
//                     >
//                       Guidelines
//                     </button>
//                     <button
//                       onClick={handleDropdownToggle}
//                       className={`relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center bg-white gap-2 rounded-lg border border-zinc-200`}
//                     >
//                       <span>Form Type</span>
//                       <svg
//                         className={`transition-transform ${
//                           isDropdownOpen ? "rotate-180" : "rotate-90"
//                         }`}
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="22"
//                         height="22"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           fill="currentColor"
//                           d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
//                         />
//                       </svg>
//                       {isDropdownOpen && (
//                         <div className="absolute shadow-lg top-12 left-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2">
//                           <p>Staff</p>
//                           <p>Post Graduate</p>
//                           <p>Outsiders</p>
//                         </div>
//                       )}
//                     </button>
//                   </div>

//                   {openTab === 1 && (
//                     <div className="my-2 grid gap-6 px-4">
//                       <div className="p-6 px-2 sm:pr-6 sm:pl-4">
//                         <h4 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors">
//                           Guidelines for Swimming Pool Membership
//                         </h4>
//                         <div className="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">
//                           <p>
//                             1. Find out how our investment in sustainable
//                             practices is driving us towards a greener future,
//                             showcasing our commitment to environmental
//                             responsibility.
//                           </p>
//                           <p>
//                             2. Find out how our investment in sustainable
//                             practices is driving us towards a greener future,
//                             showcasing our commitment to environmental
//                             responsibility.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {openTab === 2 && <MemberStaff />}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default MembersGround;
