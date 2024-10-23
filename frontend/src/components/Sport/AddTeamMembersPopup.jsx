import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

function AddTeamMembersPopup({ isOpen, onClose, onConfirm, students }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const filteredStudents = students.filter((student) => {
    if (!student || typeof student !== "object") return false;

    const fullName = `${student.first_name || ""} ${
      student.last_name || ""
    }`.toLowerCase();
    const nameMatch = fullName.includes(searchTerm.toLowerCase());
    const idMatch = (student.reg_number || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return nameMatch || idMatch;
  });

  const handleStudentToggle = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedStudents);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Team Members</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Search by name or registration number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center space-x-4 py-2"
              >
                <Checkbox
                  id={`student-${student.id}`}
                  checked={selectedStudents.includes(student.id)}
                  onCheckedChange={() => handleStudentToggle(student.id)}
                />
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`${import.meta.env.VITE_API_URL}${
                      student.profile_picture || ""
                    }`}
                    alt={`${student.first_name || ""} ${
                      student.last_name || ""
                    }`}
                  />
                  <AvatarFallback>
                    {student.first_name ? student.first_name.charAt(0) : ""}
                    {student.last_name ? student.last_name.charAt(0) : ""}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{`${
                    student.first_name || ""
                  } ${student.last_name || ""}`}</p>
                  <p className="text-sm text-gray-500">
                    Registration Number: {student.reg_number || ""}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

AddTeamMembersPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      reg_number: PropTypes.string,
      profile_picture: PropTypes.string,
      faculty: PropTypes.string,
    })
  ).isRequired,
};

export default AddTeamMembersPopup;
