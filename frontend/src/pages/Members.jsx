import Card from '../components/Members/Card'
import StatWidge from '../components/Members/StatWidge';
import { faSwimmer, faWalking, faUsers, faRunning  } from '@fortawesome/free-solid-svg-icons';

const Members = () => {
  return (
    <div>
      <div>
        <h3 className="font-bold pb-4">Hello Sathija 👋🏼,</h3>
      </div>
      <div className="display: flex flex-row gap-12 pb-6">
        <StatWidge name="Overall membership" count="1250" iconName={faUsers}/>
        <StatWidge name="Pool access members" count="450" iconName={faSwimmer}/>
        <StatWidge name="Indoor area access" count="520 " iconName={faRunning}/>
        <StatWidge name="Outdoor area access" count="400" iconName={faWalking}/>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-4">Unlock Your Wellness Journey</h1>
        <p className="text-gray-700 text-lg text-center leading-relaxed">Discover a world of fitness possibilities with our exclusive memberships, trends and more. 
          See who's joining the community, read about how our community are increasing their membership income and lot's more.​</p>
      </div>
      <div className="display: flex flex-row gap-4">
        <Card content="High-tech gym for customized workouts"/>
        <Card content="serene grounds for outdoor workouts"/>
        <Card content="refreshing pool for aquatic exercise or relaxation"/>
      </div>
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-700 text-lg text-center leading-relaxed font-semibold">Apply today and embark on your personalized wellness journey.</p>
      </div>
    </div>
  )
};

export default Members;
