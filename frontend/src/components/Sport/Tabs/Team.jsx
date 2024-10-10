import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Team = ({ sportId }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, [sportId]);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`/api/teams/${sportId}`);
      const data = await response.json();
      setTeams(data);
      if (data.length > 0) {
        setSelectedTeam(data[0].id);
        fetchTeamMembers(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchTeamMembers = async (teamId) => {
    try {
      const response = await fetch(`/api/teams/${teamId}/members`);
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleTeamChange = (e) => {
    const teamId = e.target.value;
    setSelectedTeam(teamId);
    fetchTeamMembers(teamId);
  };

  return (
    <div className="team">
      <h2>Team</h2>
      <div className="team-selector">
        <label htmlFor="team-select">Select Team: </label>
        <select
          id="team-select"
          value={selectedTeam}
          onChange={handleTeamChange}
        >
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      {selectedTeam && (
        <div className="team-members">
          <h3>Team Members</h3>
          <ul>
            {teamMembers.map((member) => (
              <li key={member.id}>
                {member.name} - {member.position}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Team.propTypes = {
  sportId: PropTypes.string.isRequired,
};

export default Team;
