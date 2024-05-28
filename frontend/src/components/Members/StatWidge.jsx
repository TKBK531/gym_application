const StatWidge = ({name, count}) => {
  return (
    <div class="w-full lg:w-1/4">
      <div class="widget w-full p-4 rounded-lg bg-white border-l-4 border-purple-400">
        <div class="flex items-center">
          <div class="icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div class="flex flex-col justify-center">
            <div class="text-lg">{ count }</div>
            <div class="text-sm text-gray-400">{ name }</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatWidge;
