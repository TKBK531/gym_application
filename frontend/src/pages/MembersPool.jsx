import { useState } from "react";
import MemberStaff from "../components/Forms/MemberStaff";
import MemberOutside from "../components/Forms/MemberOutside";
import MemberPostG from "../components/Forms/MemberPostG";

const MembersPool = () => {
  const [openTab, setOpenTab] = useState(1);
  const [selectedForm, setSelectedForm] = useState("");

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
                Swimming Pool Membership
              </h2>
              <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
                Dive into luxury with our Swimming Pool Membership, designed for
                those who seek the perfect blend of relaxation and fitness. Our
                state-of-the-art swimming facility offers a pristine and serene
                environment, ideal for both casual swimmers and serious
                athletes.
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
                      Forms
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
                            1. Find out how our investment in sustainable
                            practices is driving us towards a greener future,
                            showcasing our commitment to environmental
                            responsibility.
                          </p>
                          <p>
                            2. Find out how our investment in sustainable
                            practices is driving us towards a greener future,
                            showcasing our commitment to environmental
                            responsibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {openTab === 2 && (
                    <div className="py-3 justify-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">
                      <div className="p-4">
                        <div className="mb-4 flex">
                          <label className="mb-2 text-md font-medium text-gray-700 pr-2">
                            I am a
                          </label>
                          <select
                            id="form"
                            name="form"
                            value={selectedForm}
                            onChange={(e) => setSelectedForm(e.target.value)}
                            className="w-1/4 px-2 pb-2 shadow appearance-none text-md text-gray-700 font-medium border leading-tight focus:outline-none focus:ring-2 focus:ring-secondary-golden focus:border-transparent rounded-md"
                          >
                            <option value="">--Select Type--</option>
                            <option value="outsider">Outsider.</option>
                            <option value="staff">Staff Member.</option>
                            <option value="postGraduate">
                              Post Graduate Student.
                            </option>
                          </select>
                        </div>
                        {selectedForm === "outsider" && <MemberOutside />}
                        {selectedForm === "staff" && <MemberStaff />}
                        {selectedForm === "postGraduate" && <MemberPostG />}
                      </div>
                    </div>
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

export default MembersPool;
