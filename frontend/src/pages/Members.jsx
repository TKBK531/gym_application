import Card from "../components/Members/Card";
import StatWidge from "../components/Members/StatWidge";
import {
  faSwimmer,
  faWalking,
  faUsers,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";

const Members = () => {
  const imageUrlPool =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-l9mhhOz1sK8P9IdEkk7seHj4APH_dRKQlg&s";
  const imageUrlGround =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTlfKV-33el_swtTqaO63TRfmeDEUb55zlA&s";
  const imageUrlGym =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKDWg1zq64xccwiMYVtHxmAty40QKKBxIahw&s";

  return (
    <div>
      <div>
        <h3 className="font-bold pb-4">Hello Sathija 👋🏼,</h3>
      </div>
      <div className="display: flex flex-row gap-12 pb-6">
        <StatWidge name="Overall membership" count="1250" iconName={faUsers} />
        <StatWidge
          name="Pool access members"
          count="450"
          iconName={faSwimmer}
        />
        <StatWidge
          name="Indoor area access"
          count="520 "
          iconName={faRunning}
        />
        <StatWidge
          name="Outdoor area access"
          count="400"
          iconName={faWalking}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-4">
          Unlock Your Wellness Journey
        </h1>
        <p className="text-gray-700 text-lg text-center leading-relaxed">
          Discover a world of fitness possibilities with our exclusive
          memberships, trends and more. See who&apos;s joining the community,
          read about how our community are increasing their membership income
          and lot&apos;s more
        </p>
      </div>
      <div className="display: flex flex-row gap-4">
        <Card
          content="High-tech gym for customized workouts"
          backgroundImage={imageUrlGym}
        />
        <Card
          content="serene grounds for outdoor workouts"
          backgroundImage={imageUrlGround}
        />
        <Card
          content="refreshing pool for aquatic exercise or relaxation"
          backgroundImage={imageUrlPool}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-700 text-lg text-center leading-relaxed font-semibold">
          Apply today and embark on your personalized wellness journey.
        </p>
      </div>
    </div>
  );
};

export default Members;
