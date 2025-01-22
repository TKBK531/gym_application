import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import SportCard from "../components/Sport/SportCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "react-toastify";

const Sports = () => {
  const [allSports, setAllSports] = useState([]);
  const [loggedInUserType, setLoggedInUserType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethod, setSortMethod] = useState("alphabetical");
  const [showAddNewSportDialog, setShowAddNewSportDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [staffMembers, setStaffMembers] = useState([]);
  const [filteredStaffMembers, setFilteredStaffMembers] = useState([]);
  const [selectedStaffMember, setSelectedStaffMember] = useState(null);
  const [newSport, setNewSport] = useState({
    label: "",
    in_charge: "",
  })

  const navigate = useNavigate();

  const filteredSports = allSports.filter((sport) =>
    sport.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initialFetchComplete = useRef(false);

  useEffect(() => {
    fetchAllSports();
  }, []);

  const fetchStaffMembers = async () => {
    try {
      const response = await api.get("/user/profile/all-profiles/");
      if (response.data.status === "success") {
        const staffUsers = response.data.data.filter(
          (user) => user.user_type === 8
        );
        setStaffMembers(staffUsers);
        setFilteredStaffMembers(staffUsers);
      } else {
        console.error("Error fetching staff members:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching staff members:", error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = staffMembers.filter(
      (staff) =>
        staff.first_name.toLowerCase().includes(searchTerm) ||
        staff.last_name.toLowerCase().includes(searchTerm)
    );
    setFilteredStaffMembers(filtered);
  };

  const handleSelectStaffMember = (staff) => {
    setSelectedStaffMember(staff);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const handleAddNewSportClick = () => {
    fetchStaffMembers();
    setShowAddNewSportDialog(true);
  }

  const handleAddNewSport = async () => {
    newSport.in_charge = selectedStaffMember.id;
    console.log(newSport);

    try {
      const response = await api.post(`/sport/add-sport/`, newSport);
      if (response.data.status === "success") {
        setNewSport({
          label: "",
          in_charge: "",
        });
        setShowAddNewSportDialog(false);
        toast.success("Sport created successfully");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Error creating announcement", error);
    }
  }

  const handleSportClick = (sportId) => {
    const sport = allSports.find((sport) => sport.id === sportId);
    console.log("Navigating to sport:", sport.id);
    navigate(
      `/sports/${sport.label.toLowerCase().replace(/\s+/g, "-")}?id=${sportId}`
    );
  };

  const fetchAllSports = async () => {
    try {
      const response = await api.get("/sport/all-sports/");
      if (response.data.status === "success") {
        setAllSports(response.data.data);
        initialFetchComplete.current = true;
        getLoggedInUserType();
        console.log(allSports);
      }
    } catch (error) {
      console.error("Error fetching all profiles:", error.message);
    }
  };

  const getLoggedInUserType = () => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    const userType = storedUser.profile.user_type;
    console.log("Stored user:", storedUser);
    setLoggedInUserType(userType);
    return userType;
  };

  const sortSports = (sports) => {
    switch (sortMethod) {
      case "alphabetical":
        return sports.sort((a, b) => a.label.localeCompare(b.label));
      case "reverse-alphabetical":
        return sports.sort((a, b) => b.label.localeCompare(a.label));
      default:
        return sports;
    }
  };

  const sortedSports = sortSports(filteredSports);

  return (
    <>
      <section className="w-full">
        <div className="flex gap-5 flex-wrap justify-center mb-5">
          <input
            type="text"
            placeholder="Search sports..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded p-2 w-full md:w-1/2"
          />
          <select
            value={sortMethod}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="alphabetical">A-Z</option>
            <option value="reverse-alphabetical">Z-A</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-center">
          {(searchQuery ? sortedSports : sortSports(allSports)).map((sport) => (
            <SportCard
              key={sport.id}
              sport={sport}
              onClick={() => handleSportClick(sport.id)}
              className={`transition-opacity cursor-pointer duration-500 ${initialFetchComplete.current && !filteredSports.includes(sport)
                ? "opacity-0"
                : "opacity-100"
                }`}
            />
          ))}

          {initialFetchComplete.current && loggedInUserType === "admin" && (
            <div onClick={handleAddNewSportClick} className="flex flex-col w-full max-w-sm rounded-lg overflow-hidden shadow-xl bg-white m-4 transition duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-[24rem] text-center justify-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2 transition duration-300 hover:text-blue-500 text-balance">
                Add Another Sport
              </h3>
            </div>
          )}
        </div>

        <Dialog open={showAddNewSportDialog} onOpenChange={setShowAddNewSportDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sport</DialogTitle>
            </DialogHeader>
            <Input
              type="text"
              name="sportName"
              placeholder="Add Sport Name"
              onChange={(e) =>
                setNewSport({
                  ...newSport,
                  label: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <ScrollArea className="h-[200px] mt-2">
              {filteredStaffMembers.map((staff) => (
                <div
                  key={staff.id}
                  className={`p-2 cursor-pointer ${selectedStaffMember?.id === staff.id
                    ? "bg-secondary-golden text-primary font-bold"
                    : ""
                    }`}
                  onClick={() => handleSelectStaffMember(staff)}
                >
                  {staff.first_name} {staff.last_name}
                </div>
              ))}
            </ScrollArea>
            <DialogFooter>
              <Button
                onClick={handleAddNewSport}
                disabled={!selectedStaffMember}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </section>


    </>
  );
};

export default Sports;