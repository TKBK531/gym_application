import Card from '../components/Members/Card'
import StatWidge from '../components/Members/StatWidge';

const Members = () => {
  return (
    <div>
      <div>
        <h3 class="font-bold pb-4">Hello Sathija 👋🏼,</h3>
      </div>
      <div className="display: flex flex-row gap-12 pb-6">
        <StatWidge name="Total Members" count="1250"/>
        <StatWidge name="Swimming Pool Members" count="450"/>
        <StatWidge name="Gymnasium Members" count="520"/>
        <StatWidge name="Ground Members" count="400"/>
      </div>
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-5xl font-bold text-center mb-4">Unlock Your Wellness Journey</h1>
        <p class="text-gray-700 text-lg text-center leading-relaxed">Discover a world of fitness possibilities with our exclusive memberships, trends and more. 
          See who's joining the community, read about how our community are increasing their membership income and lot's more.​</p>
      </div>
      <div className="display: flex flex-row gap-4">
        <Card content="Access a cutting-edge gymnasium for personalized training"/>
        <Card content="serene grounds for outdoor workouts"/>
        <Card content="refreshing pool for aquatic exercise or relaxation"/>
      </div>
      <div class="container mx-auto px-4 py-8">
        <p class="text-gray-700 text-lg text-center leading-relaxed font-semibold">Apply today and embark on your personalized wellness journey.</p>
      </div>
    </div>
  )
};

export default Members;
