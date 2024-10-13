import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../api"; // Adjust this import based on your project structure

function TeamSelector({ sportId }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [captain, setCaptain] = useState(null);

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

  const handleTeamChange = (teamId) => {
    setSelectedTeam(teamId);
    if (teamId) {
      fetchTeamMembers(teamId);
      const selectedTeamData = teams.find(
        (team) => team.id.toString() === teamId
      );
      setCaptain(
        selectedTeamData
          ? {
              name: selectedTeamData.captain_name,
              id: selectedTeamData.captain,
            }
          : null
      );
    } else {
      setTeamMembers([]);
      setCaptain(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Team</h2>
      <div className="team-dropdown">
        <Select
          onValueChange={handleTeamChange}
          value={selectedTeam || undefined}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team.id} value={team.id.toString()}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedTeam && captain && (
        <div className="captain-info">
          <h3 className="text-xl font-semibold mb-2">Team Captain</h3>
          <p>
            {captain.name} (ID: {captain.id})
          </p>
        </div>
      )}
      {selectedTeam && teamMembers.length > 0 && (
        <div className="team-members">
          <h3 className="text-xl font-semibold mb-2">Team Members</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile Picture</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.user}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={member.profile_picture}
                        alt={member.member_name}
                      />
                      <AvatarFallback>
                        {member.member_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{member.member_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
