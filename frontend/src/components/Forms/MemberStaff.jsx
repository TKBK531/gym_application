const MemberStaff = () => {
  return (
    <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
      <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
        <section className="bg-cream-lighter p-4 shadow">
          <div className="md:flex">
            <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
              University Staff Category
            </h2>
          </div>
          <form>
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">
                  Personal
                </legend>
                <p className="text-xs font-light text-red">
                  This entire section is required.
                </p>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="mb-4">
                  <label className="block tracking-wide text-xs font-bold">
                    Name(Mr./Mrs./Miss)
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="name"
                    placeholder="Acme Mfg. Co."
                  />
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                      Faculty/Dept./Division
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="address_street"
                      placeholder="555 Roadrunner Lane"
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                      Designation
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="address_number"
                      placeholder="#3"
                    />
                  </div>
                </div>
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                      Date of Appointment
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="lat"
                      placeholder="30.0455542"
                    />
                  </div>
                  <div className="md:flex-1 md:pl-3">
                    <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                      Period of Apt.(if temporary)
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="lon"
                      placeholder="-99.1405168"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block tracking-wide text-xs font-bold">
                    UPF No.
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="name"
                    placeholder="Acme Mfg. Co."
                  />
                </div>
              </div>
            </div>
            <div className="md:flex mb-8">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">
                  Contact
                </legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <div className="md:flex mb-4">
                  <div className="md:flex-1 md:pr-3">
                    <label className="block tracking-wide text-xs font-bold">
                      Phone
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="tel"
                      name="phone"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                  <div className="md:flex-1 md:pr-3">
                    <label className="block tracking-wide text-xs font-bold">
                      Office
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="tel"
                      name="phone"
                      placeholder="(555) 555-5555"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                    Address
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="url"
                    name="url"
                    placeholder="acme.co"
                  />
                </div>
                <div className="mb-4">
                  <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                    Email
                  </label>
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="email"
                    name="email"
                    placeholder="contact@acme.co"
                  />
                </div>
              </div>
            </div>
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">
                  Description
                </legend>
              </div>
              <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                <textarea
                  className="w-full shadow-inner p-4 border-0"
                  placeholder="We build fine acmes."
                  rows="6"
                ></textarea>
              </div>
            </div>
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <legend className="tracking-wide text-sm">
                  Cover Image
                </legend>
              </div>
              <div className="md:flex-1 px-3 text-center">
                <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cursor-pointer relative">
                  <input
                    className="opacity-0 absolute pin-x pin-y"
                    type="file"
                    name="cover_image"
                  />
                  Add Your Image
                </div>
              </div>
            </div>
            <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
              <div className="md:flex-1 px-3 text-center md:text-right">
                <input type="hidden" name="sponsor" value="0" />
                <input
                  className="button text-cream-lighter bg-brick hover:bg-brick-dark"
                  type="submit"
                  value="Create Location"
                />
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default MemberStaff;
