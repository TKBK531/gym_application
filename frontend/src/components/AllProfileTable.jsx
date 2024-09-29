// import { useState, useMemo, useEffect } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Button } from "./ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import api from "../api";
// import { userTypes } from "../constants/index";

// // Generate a larger sample dataset
// const generateUsers = (count) => {
//   return Array.from({ length: count }, (_, i) => ({
//     id: i + 1,
//     name: `User ${i + 1}`,
//     email: `user${i + 1}@example.com`,
//     contact: `${Math.floor(100000000 + Math.random() * 900000000)}`,
//     nationalId: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
//     userType: userTypes[Math.floor(Math.random() * userTypes.length)].name,
//     profilePicture: `https://i.pravatar.cc/150?img=${i + 1}`,
//   }));
// };

// const initialUsers = generateUsers(100); // Generate 100 users for this example
// const USERS_PER_PAGE = 25;

// export default function Component() {
//   const [allProfiles, setAllProfiles] = useState([]);
//   const [users, setUsers] = useState(initialUsers);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedUserType, setSelectedUserType] = useState("all");

//   const filteredUsers = useMemo(() => {
//     return selectedUserType === "all"
//       ? users
//       : users.filter((user) => user.userType === selectedUserType);
//   }, [users, selectedUserType]);

//   const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * USERS_PER_PAGE,
//     currentPage * USERS_PER_PAGE
//   );

//   const handleUserTypeChange = (userId, newUserType) => {
//     setUsers(
//       users.map((user) =>
//         user.id === userId ? { ...user, userType: newUserType } : user
//       )
//     );
//   };

//   const handleFilterChange = (userType) => {
//     setSelectedUserType(userType);
//     setCurrentPage(1); // Reset to first page when filter changes
//   };

//   const fetchAllProfiles = async () => {
//     try {
//       const response = await api.get("/user/profile/all-profiles/");
//       setAllProfiles(response.data.data);
//       console.log(response.data.data);
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching profile data:", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllProfiles();
//   }, []);

//   return (
//     <div className="container mx-auto py-10">
//       <button onClick={fetchAllProfiles}>Fetch profiles</button>
//       <div className="mb-4">
//         <Select value={selectedUserType} onValueChange={handleFilterChange}>
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Filter by User Type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Types</SelectItem>
//             {userTypes.map((type) => (
//               <SelectItem key={type.pk} value={type.name}>
//                 {type.label}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[50px]"></TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Contact</TableHead>
//             <TableHead>National ID</TableHead>
//             <TableHead>User Type</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {paginatedUsers.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell>
//                 <Avatar>
//                   <AvatarImage
//                     src={user.profilePicture}
//                     alt={`${user.name}'s profile picture`}
//                   />
//                   <AvatarFallback>
//                     {user.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")
//                       .toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               </TableCell>
//               <TableCell>{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>{user.contact}</TableCell>
//               <TableCell>{user.nationalId}</TableCell>
//               <TableCell>
//                 <Select
//                   value={user.userType}
//                   onValueChange={(value) =>
//                     handleUserTypeChange(user.id, value)
//                   }
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select user type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {userTypes.map((type) => (
//                       <SelectItem key={type.pk} value={type.name}>
//                         {type.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div className="flex items-center justify-between space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           <ChevronLeft className="h-4 w-4" />
//           Previous
//         </Button>
//         <div className="text-sm text-muted-foreground">
//           Page {currentPage} of {totalPages}
//         </div>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage === totalPages}
//         >
//           Next
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }

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
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api";
import { userTypes } from "../constants/index";

const USERS_PER_PAGE = 25;

export default function Component() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState("all");

  const filteredUsers = useMemo(() => {
    return selectedUserType === "all"
      ? allProfiles
      : allProfiles.filter(
          (user) => user.user_type === parseInt(selectedUserType)
        );
  }, [allProfiles, selectedUserType]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleUserTypeChange = async (userId, newUserType) => {
    try {
      await api.put(`/user/profile/${userId}/`, {
        user_type: parseInt(newUserType),
      });
      setAllProfiles(
        allProfiles.map((user) =>
          user.id === userId
            ? { ...user, user_type: parseInt(newUserType) }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating user type:", error.message);
    }
  };

  const handleFilterChange = (userType) => {
    setSelectedUserType(userType);
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
      <div className="mb-4">
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
