import Card from '../components/Members/Card'

const Members = () => {
  return (
    <div>
      <div className="display: flex flex-row gap-2">
        <Card content="Access a cutting-edge gymnasium for personalized training"/>
        <Card content="serene grounds for outdoor workouts"/>
        <Card content="refreshing pool for aquatic exercise or relaxation"/>
      </div>
      <div class="w-full pt-5 px-4 mb-8 mx-auto ">
        <div class="text-sm text-gray-700 py-1">
          Made with{" "}
          <a
            class="text-gray-700 font-semibold"
            href="https://www.material-tailwind.com/docs/html/card?ref=tailwindcomponents"
            target="_blank"
          >
            Material Tailwind
          </a>{" "}
          by{" "}
          <a
            href="https://www.creative-tim.com?ref=tailwindcomponents"
            class="text-gray-700 font-semibold"
            target="_blank"
          >
            {" "}
            Creative Tim
          </a>
          .
        </div>
      </div>
    </div>
  )
};

export default Members;
