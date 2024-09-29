import { useState } from "react";
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

// Sample data - replace with your actual data source
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    contact: "123-456-7890",
    nationalId: "1234567890",
    userType: "Admin",
    profilePicture: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    contact: "098-765-4321",
    nationalId: "0987654321",
    userType: "User",
    profilePicture: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    contact: "111-222-3333",
    nationalId: "1112223333",
    userType: "Manager",
    profilePicture: "https://i.pravatar.cc/150?img=3",
  },
];

const userTypes = ["Admin", "User", "Manager"];

export default function Component() {
  const [users, setUsers] = useState(initialUsers);

  const handleUserTypeChange = (userId, newUserType) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, userType: newUserType } : user
      )
    );
  };

  return (
    <div className="container mx-auto py-10">
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={user.profilePicture}
                    alt={`${user.name}'s profile picture`}
                  />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contact}</TableCell>
              <TableCell>{user.nationalId}</TableCell>
              <TableCell>
                <Select
                  value={user.userType}
                  onValueChange={(value) =>
                    handleUserTypeChange(user.id, value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
