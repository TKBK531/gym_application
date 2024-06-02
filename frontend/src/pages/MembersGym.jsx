const MembersGym = () => {
  return (
    <div>
      <section>
        <div class="relative w-full h-96">
          <img
            class="absolute h-full w-full object-cover object-center"
            src="https://bucket.material-tailwind.com/magic-ai/bbe71871de8b4d6f23bb0f17a6d5aa342f3dea72677ba7238b18defa3741244d.jpg"
            alt="nature image"
          />
          <div class="absolute inset-0 h-full w-full bg-black/50"></div>
          <div class="relative pt-28 text-center">
            <h2 class="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
              Gymnasium Membership
            </h2>
            <p class="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
            Experience the best in indoor sports and recreation with our Indoor Courts Membership. Perfect for athletes and enthusiasts 
            who enjoy playing sports in a controlled environment, our indoor courts offer top-notch facilities for a variety of indoor games.
            </p>
          </div>
        </div>
        <div class="-mt-16 mb-8 px-8 ">
          <div class="container mx-auto">
            <div class="py-12 flex justify-center rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">
              <div class="my-8 grid gap-6 px-4">
                <section class="grid min-h-screen p-8 place-items-center">
                  <div class="container grid grid-cols-1 gap-8 my-auto lg:grid-cols-2">
                    <div class="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none grid gap-2 item sm:grid-cols-2">
                      <div class="relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg m-0">
                        <img
                          src="https://bucket.material-tailwind.com/magic-ai/dc74a867f21afc734166a6d37c08beaba4ff040664ba8ccce918e054264ad68d.jpg"
                          alt="Sustainable Practices for a Greener Future"
                          class="object-cover w-full h-full"
                        />
                      </div>
                      <div class="p-6 px-2 sm:pr-6 sm:pl-4">
                        <p class="block antialiased font-sans text-sm font-light leading-normal text-inherit mb-4 !font-semibold">
                          Sustainability
                        </p>
                        <a
                          href="#"
                          class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2 normal-case transition-colors hover:text-gray-700"
                        >
                          Sustainable Practices for a Greener Future
                        </a>
                        <p class="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">
                          Find out how our investment in sustainable practices
                          is driving us towards a greener future, showcasing our
                          commitment to environmental responsibility.
                        </p>
                        {/* <div class="flex items-center gap-4">
                          <img
                            src="https://bucket.material-tailwind.com/magic-ai/2fadd7f00b6d08fc9dcacef52af357ec1213c0415ab97ace57ae0f17c7f6c2c8.jpg"
                            class="inline-block relative object-cover object-center !rounded-full w-12 h-12 rounded-lg"
                          />
                          <div>
                            <p class="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900 mb-0.5 !font-semibold">
                              Alex Johnson
                            </p>
                            <p class="block antialiased font-sans text-sm leading-normal text-gray-700 font-normal">
                              2022-09-20
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MembersGym;
