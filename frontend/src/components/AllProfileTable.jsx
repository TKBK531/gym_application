import { useState, useMemo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import api from "../api";
import { userTypes } from "../constants/index";

const USERS_PER_PAGE = 25;

export default function Component() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return allProfiles.filter((user) => {
      const matchesType =
        selectedUserType === "all" ||
        user.user_type === parseInt(selectedUserType);
      const matchesSearch = (user.first_name + " " + user.last_name)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [allProfiles, selectedUserType, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleUserTypeChange = async (userId, newUserType) => {
    try {
      const userTypeObject = userTypes.find(
        (type) => type.pk.toString() === newUserType
      );
      if (!userTypeObject) {
        throw new Error("Invalid user type selected");
      }

      console.log("Sending request to update user type:", {
        user_type: userTypeObject.name,
      });

      const response = await api.put(
        `/user/profile/${userId}/update-user-type/`,
        {
          user_type: userTypeObject.name,
        }
      );

      console.log("Response from server:", response.data);

      setAllProfiles(
        allProfiles.map((user) =>
          user.id === userId
            ? { ...user, user_type: parseInt(newUserType) }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating user type:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  const handleFilterChange = (userType) => {
    setSelectedUserType(userType);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const fetchAllProfiles = async () => {
    try {
      const response = await api.get("/user/profile/all-profiles/");
      setAllProfiles(response.data.data);
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
    }
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-64"
          />
          <Search className="text-gray-400" />
        </div>
        <Select value={selectedUserType} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {userTypes.map((type) => (
              <SelectItem key={type.pk} value={type.pk.toString()}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>National ID</TableHead>
            <TableHead>User Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={user.profile_picture}
                    alt={`${user.first_name}'s profile picture`}
                  />
                  <AvatarFallback>
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contact}</TableCell>
              <TableCell>{user.national_id}</TableCell>
              <TableCell>
                <Select
                  value={user.user_type.toString()}
                  onValueChange={(value) =>
                    handleUserTypeChange(user.id, value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => (
                      <SelectItem key={type.pk} value={type.pk.toString()}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
