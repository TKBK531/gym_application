import Card from "../components/Members/Card";
import StatWidge from "../components/Members/StatWidge";
import {
  faSwimmer,
  faWalking,
  faUsers,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Members = () => {
  const imageUrlPool =
    "https://i.pinimg.com/736x/67/6d/96/676d967055eb128c4393fc3fc9af3317.jpg";
  const imageUrlGround =
    "https://i.pinimg.com/736x/cb/f0/1b/cbf01b3fc9dab213934a5ddce4d25487.jpg";
  const imageUrlGym =
    "https://i.pinimg.com/736x/fc/d4/9d/fcd49d7f861d117271bcd9fb7078fd06.jpg";
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl">
          Hello, {userData.user.first_name} {userData.user.last_name}👋{" "}
        </h1>
      </div>

      {/* Stat Widgets Section */}
      <div className="flex flex-col md:flex-row gap-6 pb-6">
        <StatWidge name="Overall membership" count="1250" iconName={faUsers} />
        <StatWidge
          name="Pool access members"
          count="450"
          iconName={faSwimmer}
        />
        <StatWidge name="Indoor area access" count="520" iconName={faRunning} />
        <StatWidge
          name="Outdoor area access"
          count="400"
          iconName={faWalking}
        />
      </div>

      {/* Heading Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Unlock Your Wellness Journey
        </h1>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
          Discover a world of fitness possibilities with our exclusive
          memberships, trends, and more. See who&apos;s joining the community,
          read about how our community is increasing their membership income,
          and lots more.
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/members/membersGym">
          <Card
            content="High-tech gym for customized workouts"
            backgroundImage={imageUrlGym}
          />
        </Link>
        <Link to="/members/membersGround">
          <Card
            content="Serene grounds for outdoor workouts"
            backgroundImage={imageUrlGround}
          />
        </Link>
        <Link to="/members/membersPool">
          <Card
            content="Refreshing pool for aquatic exercise or relaxation"
            backgroundImage={imageUrlPool}
          />
        </Link>
      </div>

      {/* Footer Section */}
      <div className="text-center py-8">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed font-semibold">
          Apply today and embark on your personalized wellness journey.
        </p>
      </div>
    </div>
  );
};

export default Members;
