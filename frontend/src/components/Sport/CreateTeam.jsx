import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { toast } from "react-toastify";
import api from "@/api"; // Adjust this import based on your project structure
import PropTypes from "prop-types";

function CreateTeam({ sportId, onTeamCreated }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCaptainSelectOpen, setIsCaptainSelectOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [selectedCaptain, setSelectedCaptain] = useState('');
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const user_type = JSON.parse(localStorage.getItem("userData")).profile.user_type;

    useEffect(() => {
        if (isOpen) {
            fetchStudents();
        }
    }, [isOpen]);

    const fetchStudents = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/user/student-users/');
            console.log(response.data.data);
            if (Array.isArray(response.data.data)) {
                setStudents(response.data.data);
            } else {
                console.error("Unexpected data format:", response.data);
                toast.error("Received unexpected data format from server.");
                setStudents([]);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Failed to fetch students. Please try again.");
            setStudents([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTeam = async () => {
        if (!teamName || !selectedCaptain) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await api.post('/sport/create-team/', {
                name: teamName,
                sport: sportId,
                captain: parseInt(selectedCaptain)
            });

            if (response.data.status === "success") {
                toast.success("Team created successfully");
                setIsOpen(false);
                setTeamName('');
                setSelectedCaptain('');
                onTeamCreated();
            } else {
                toast.error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error creating team:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    const filteredStudents = students.filter(student =>
        `${student.first_name} ${student.last_name} ${student.reg_number}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {(user_type === "staff" || user_type === "admin") && (
                <Button onClick={() => setIsOpen(true)}>Create Team</Button>
            )}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Team</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                                id="teamName"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="col-span-4"
                                placeholder="Enter team name"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Button
                                variant="outline"
                                className="col-span-4 justify-between"
                                onClick={() => setIsCaptainSelectOpen(true)}
                            >
                                {selectedCaptain
                                    ? students.find((student) => student.id.toString() === selectedCaptain)?.first_name || "Select team captain"
                                    : "Select team captain"}
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCreateTeam}>Create Team</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isCaptainSelectOpen} onOpenChange={setIsCaptainSelectOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Select Team Captain</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-4"
                        />
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                            {isLoading ? (
                                <div>Loading students...</div>
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className={cn(
                                            "flex items-center space-x-2 rounded-md p-2 cursor-pointer hover:bg-accent",
                                            selectedCaptain === student.id.toString() && "bg-accent"
                                        )}
                                        onClick={() => {
                                            setSelectedCaptain(student.id.toString());
                                            setIsCaptainSelectOpen(false);
                                        }}
                                    >
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={student.profile_picture} alt={`${student.first_name} ${student.last_name}`} />
                                            <AvatarFallback>{student.first_name[0]}{student.last_name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span>{student.first_name} {student.last_name}</span>
                                        <span className="text-sm text-muted-foreground">({student.reg_number})</span>
                                        {selectedCaptain === student.id.toString() && (
                                            <Check className="ml-auto h-4 w-4" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>No students available</div>
                            )}
                        </ScrollArea>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsCaptainSelectOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

CreateTeam.propTypes = {
    sportId: PropTypes.number.isRequired,
    onTeamCreated: PropTypes.func.isRequired
};

export default CreateTeam;