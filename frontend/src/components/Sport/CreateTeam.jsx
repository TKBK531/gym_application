import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { toast } from "react-toastify";
import api from "@/api"; // Adjust this import based on your project structure

function CreateTeam({ sportId, onTeamCreated }) {
    const [isOpen, setIsOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [selectedCaptain, setSelectedCaptain] = useState('');
    const [students, setStudents] = useState([]);
    const [openCombobox, setOpenCombobox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
            setStudents(response.data.data || []);
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

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Create Team</Button>
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
                            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openCombobox}
                                        className="col-span-4 justify-between"
                                        disabled={isLoading}
                                    >
                                        {selectedCaptain
                                            ? students.find((student) => student.id.toString() === selectedCaptain)?.first_name || "Select team captain"
                                            : "Select team captain"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search captain..." />
                                        <CommandEmpty>No captain found.</CommandEmpty>
                                        <CommandGroup>
                                            <ScrollArea className="h-[200px]">
                                                {students.map((student) => (
                                                    <CommandItem
                                                        key={student.id}
                                                        value={student.id.toString()}
                                                        onSelect={(currentValue) => {
                                                            setSelectedCaptain(currentValue === selectedCaptain ? "" : currentValue);
                                                            setOpenCombobox(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedCaptain === student.id.toString() ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        <Avatar className="h-6 w-6 mr-2">
                                                            <AvatarImage src={student.profile_picture} alt={`${student.first_name} ${student.last_name}`} />
                                                            <AvatarFallback>{student.first_name[0]}{student.last_name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        {student.first_name} {student.last_name} ({student.reg_number})
                                                    </CommandItem>
                                                ))}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleCreateTeam}>Create Team</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateTeam;