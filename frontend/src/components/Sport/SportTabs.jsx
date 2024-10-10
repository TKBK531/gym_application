import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PropTypes from "prop-types";
import Announcements from "./Tabs/Announcements";
import Team from "./Tabs/Team";
// import Schedule from "./Tabs/Schedule";

function SportTabs({ sportData }) {
  const [activeTab, setActiveTab] = useState("announcements");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <Tabs defaultValue="announcements" onValueChange={handleTabChange}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="announcements">Announcements</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="announcements">
        {activeTab === "announcements" && (
          <Announcements sportId={sportData.id} />
        )}
      </TabsContent>
      <TabsContent value="team">
        {activeTab === "team" && <Team sportId={sportData.id} />}
      </TabsContent>
      <TabsContent value="schedule">{/* <Schedule /> */}</TabsContent>
    </Tabs>
  );
}

SportTabs.propTypes = {
  sportData: PropTypes.object.isRequired,
};

export default SportTabs;
