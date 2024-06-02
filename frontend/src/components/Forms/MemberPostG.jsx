const MemberPostG = () => {
  return (
    <div>
      <div className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto">
        <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:ml-24 flex flex-col">
          <section className="bg-cream-lighter p-4 shadow">
            <div className="md:flex">
              <h2 className="md:w-1/2 uppercase tracking-wide text-sm sm:text-lg mb-6">
                University Post Graduate Category
              </h2>
            </div>
            <form>
              <div className="md:flex mb-8">
                <div className="md:w-1/3">
                  <legend className="tracking-wide text-sm">Personal</legend>
                </div>
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                  <div className="mb-4">
                    <label className="block tracking-wide text-xs font-bold">
                      Name(Mr./Ms.)
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="name"
                      placeholder="Acme Mfg. Co."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block tracking-wide text-xs font-bold">
                      National Identity Card No.
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
                        Date of Birth
                      </label>
                      <input
                        className="w-full shadow-inner p-4 border-0"
                        type="date"
                        name="appointment"
                        placeholder="2000/01/01"
                      />
                    </div>
                    <div className="md:flex-1 md:pl-3">
                      <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                        Age
                      </label>
                      <input
                        className="w-full shadow-inner p-4 border-0"
                        type="text"
                        name="tempory"
                        placeholder="1 year"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex mb-8">
                <div className="md:w-1/3">
                  <legend className="tracking-wide text-sm">Contact</legend>
                </div>
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                  <div className="md:flex mb-4">
                    <div className="md:flex-1 md:pr-3">
                      <label className="block tracking-wide text-xs font-bold">
                        Mobile
                      </label>
                      <input
                        className="w-full shadow-inner p-4 border-0"
                        type="tel"
                        name="mobile"
                        placeholder="0771122333"
                      />
                    </div>
                    <div className="md:flex-1 md:pr-3">
                      <label className="block tracking-wide text-xs font-bold">
                        Office
                      </label>
                      <input
                        className="w-full shadow-inner p-4 border-0"
                        type="tel"
                        name="office"
                        placeholder="0912233444"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                      Address
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="address"
                      placeholder="425 Galaha Lane, Peradeniya"
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

              <div className="md:flex mb-8">
                <div className="md:w-1/3">
                  <legend className="tracking-wide text-sm">
                    Postgraduate Institute
                  </legend>
                </div>
                <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                  <div className="mb-4">
                    <label className="block tracking-wide text-charcoal-darker text-xs font-bold">
                      Postgraduate Institute Name
                    </label>
                    <input
                      className="w-full shadow-inner p-4 border-0"
                      type="text"
                      name="name"
                      placeholder="PGIS"
                    />
                  </div>
                  <div className="md:flex mb-4">
                    <div className="md:flex-1 md:pr-3">
                      <label className="block tracking-wide text-xs font-bold">
                        Registration No.
                      </label>
                      <input
                        className="w-full shadow-inner p-4 border-0"
                        type="text"
                        name="registration"
                        placeholder="22222"
                      />
                    </div>
                    <div className="md:flex-1 md:pr-3">
                      <label className="block tracking-wide text-xs font-bold">
                        Students Identity Card No.
                      </label>
                      <input
                        className="w-full shadow-inner p-4 border-0"
                        type="text"
                        name="studentId"
                        placeholder="22222"
                      />
                    </div>
                  </div>

                  <div className="md:flex mb-4">
                    <div className="md:flex-1 md:pr-3">
                      <label className="block tracking-wide text-xs font-bold">
                        Date of commencement of the course
                      </label>
                      <input
                        className="w-full shadow-inner p-4 border-0"
                        type="date"
                        name="commencement"
                      />
                    </div>
                    <div className="md:flex-1 md:pr-3">
                      <label className="block tracking-wide text-xs font-bold">
                        Date of completion of the course
                      </label>
                      <input
                        className="w-full shadow-inner p-4 border-0"
                        type="date"
                        name="completion"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-5 md:flex mb-8">
                <div className="md:w-1/3">
                  <legend className="tracking-wide text-sm">Total Price</legend>
                </div>
                <div className="mb-4">
                  <input
                    className="w-full shadow-inner p-4 border-0"
                    type="text"
                    name="name"
                    placeholder="Auto filled"
                  />
                </div>
              </div>

              <div className="py-4 md:flex mb-6">
                <div className="md:w-1/3">
                  <legend className="tracking-wide text-sm">Cover Image</legend>
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
                    value="Submit"
                  />
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MemberPostG;
