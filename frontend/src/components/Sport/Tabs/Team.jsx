import { useState, useEffect } from "react";

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
import { Button } from "../../ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/api"; // Adjust this import based on your project structure
import AddTeamMembersPopup from "../AddTeamMembersPopup"; // Make sure this path is correct

function Team({ sportId }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [captain, setCaptain] = useState(null);
  const [students, setStudents] = useState([]);
  const [showAddTeamMembersDialog, setShowAddTeamMembersDialog] =
    useState(false);

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
      // console.log(response.data.data);
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

  const handleAddTeamMembers = async () => {
    try {
      const response = await api.get(`/user/student-users/`);
      setStudents(response.data.data);
      setShowAddTeamMembersDialog(true);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students. Please try again.");
    }
  };

  const handleConfirmAddTeamMember = async (selectedStudentIds) => {
    try {
      const req_data = {
        team: selectedTeam,
        users: selectedStudentIds,
      };
      const response = await api.post(`/sport/add-team-member/`, req_data);
      console.log("Response data:", response.data.status);

      if (response.data.status === "success") {
        try {
          await fetchTeamMembers(selectedTeam);
          toast.success("Team members added successfully.");
        } catch (fetchError) {
          console.error("Error fetching team members:", fetchError);
          toast.error(
            "Failed to fetch team members after adding. Please try again."
          );
        }
      } else {
        console.error("Error adding team member:", response.data.message);
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error adding team members:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800">Team</h2>
      <div className="team-dropdown">
        <Select
          onValueChange={handleTeamChange}
          value={selectedTeam || undefined}
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm p-2">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
            {teams.map((team) => (
              <SelectItem
                key={team.id}
                value={team.id.toString()}
                className="p-2 hover:bg-gray-100"
              >
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedTeam && captain && (
        <div className="captain-info bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            Team Captain
          </h3>
          <p className="text-gray-600">{captain.name}</p>
        </div>
      )}
      {selectedTeam && teamMembers.length > 0 && (
        <div className="team-members">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            Team Members
          </h3>
          <Table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="p-2 text-left text-gray-600">
                  Profile Picture
                </TableHead>
                <TableHead className="p-2 text-left text-gray-600">
                  Name
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.user} className="hover:bg-gray-50">
                  <TableCell className="p-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={`${import.meta.env.VITE_REACT_APP_API_URL}${
                          member.profile_picture
                        }`}
                        alt={member.member_name}
                        className="rounded-full"
                      />
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {member.member_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="p-2 text-gray-700">
                    {member.member_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleAddTeamMembers} className="mt-4">
            Add Team Members
          </Button>
        </div>
      )}
      <AddTeamMembersPopup
        isOpen={showAddTeamMembersDialog}
        onClose={() => setShowAddTeamMembersDialog(false)}
        onConfirm={handleConfirmAddTeamMember}
        students={students}
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

Team.propTypes = {
  sportId: PropTypes.number.isRequired,
};

export default Team;
