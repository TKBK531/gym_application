import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api"; // Adjust this import based on your project structure

function TeamSelector({ sportId }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, [sportId]);

  const fetchTeams = async () => {
    try {
      const response = await api.get(`/sport/${sportId}/teams/`);
      console.log(response.data.data);
      setTeams(response.data.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to fetch teams. Please try again.");
    }
  };

  const fetchTeamMembers = async (teamId) => {
    try {
      const response = await api.get(`sport/${teamId}/get-team-members/`);
      setTeamMembers(response.data.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error("Failed to fetch team members. Please try again.");
    }
  };

  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);
    if (teamId) {
      fetchTeamMembers(teamId);
    } else {
      setTeamMembers([]);
    }
  };

  return (
    <div className="team-selector-container">
      <h2 className="text-2xl font-bold mb-4">Team</h2>
      <div className="team-dropdown mb-4">
        <label htmlFor="team-select" className="block mb-2 font-semibold">
          Select a team:
        </label>
        <select
          id="team-select"
          value={selectedTeam}
          onChange={handleTeamChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      {selectedTeam && (
        <div className="team-members">
          <h3 className="text-xl font-semibold mb-2">Team Members</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border border-gray-300">Name</th>
                <th className="p-2 text-left border border-gray-300">
                  Position
                </th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="p-2 border border-gray-300">{member.name}</td>
                  <td className="p-2 border border-gray-300">
                    {member.position}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

TeamSelector.propTypes = {
  sportId: PropTypes.number.isRequired,
};

export default TeamSelector;
