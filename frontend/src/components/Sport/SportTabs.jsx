import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PropTypes from "prop-types";
import Announcements from "./Tabs/Announcements";
import Team from "./Tabs/Team";
// import Schedule from "./Tabs/Schedule";

function SportTabs({ sportData }) {
  const [activeTab, setActiveTab] = useState("announcements");

  const handleTabChange = useCallback((value) => {
    // Prevent default behavior
    const handleClick = (e) => {
      e.preventDefault();
      setActiveTab(value);
    };

    // Simulate a click event to trigger the tab change
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, "preventDefault", {
      value: () => {
        // Do nothing, effectively preventing the default behavior
      },
    });

    handleClick(event);
  }, []);

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
  sportData: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SportTabs;
