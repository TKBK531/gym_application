import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PropTypes from "prop-types";

function SportTabs({ sportData }) {
  return (
    <Tabs defaultValue="announcements">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="announcements">Announcements</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="announcements">
        {/* <Announcements sportData={sportData} /> */}
        Announcements
      </TabsContent>
      <TabsContent value="team">
        {/* <Team sportData={sportData} /> */}
        Team
      </TabsContent>
      <TabsContent value="schedule">
        {/* <Schedule sportData={sportData} /> */}
        Schedule
      </TabsContent>
    </Tabs>
  );
}

SportTabs.propTypes = {
  sportData: PropTypes.object.isRequired,
};

export default SportTabs;
