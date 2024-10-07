import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import api from "../../api";
import { userTypes } from "../../constants/index";
// import Announcements from "./tabs/announcements";
// import Team from "./tabs/team";
// import Schedule from "./tabs/schedule";

export default function SportCardPage() {
  const [sportData, setSportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInChargeDialog, setShowInChargeDialog] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [filteredStaffMembers, setFilteredStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaffMember, setSelectedStaffMember] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sportId = searchParams.get("id");

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(sportData);
  useEffect(() => {
    const fetchSportData = async () => {
      if (!sportId) {
        setError("No sport ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get(`/sport/${sportId}/`);
        if (response.data.status === "success") {
          setSportData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch sport data");
        }
      } catch (error) {
        setError("An error occurred while fetching sport data");
        console.error("Error fetching sport data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSportData();
  }, [sportId]);

  const fetchStaffMembers = async () => {
    try {
      const response = await api.get("/user/profile/all-profiles/");
      if (response.data.status === "success") {
        console.log("Staff members:", response.data.data);
        const staffUsers = response.data.data.filter(
          (user) => user.user_type === 8
        );
        setStaffMembers(staffUsers);
        setFilteredStaffMembers(staffUsers);
        console.log("Staff members:", filteredStaffMembers);
      } else {
        console.error("Error fetching staff members:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching staff members:", error);
    }
  };

  const handleSetInCharge = () => {
    setShowInChargeDialog(true);
    fetchStaffMembers();
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

  const handleConfirmInCharge = async () => {
    if (!selectedStaffMember) return;

    try {
      const req_data = {
        in_charge: selectedStaffMember.id,
      };
      console.log("Req data:", req_data);
      console.log("Sport ID:", sportId);
      const response = await api.put(
        `/sport/${sportId}/assign-in-charge/`,
        req_data
      );
      if (response.data.status === "success") {
        setSportData({
          ...sportData,
          in_charge_name:
            selectedStaffMember.first_name +
            " " +
            selectedStaffMember.last_name,
          in_charge: selectedStaffMember.id,
        });
        setShowInChargeDialog(false);
        setSelectedStaffMember(null);
      } else {
        console.error("Error assigning in-charge:", response.data.message);
      }
    } catch (error) {
      console.error("Error assigning in-charge:", error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!sportData) {
    return <ErrorAlert message="Sport not found" />;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          {sportData.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[50vh] mb-6">
          <img
            src={sportData.image || "/placeholder.svg"}
            alt={sportData.label}
            className="object-cover rounded-md w-full h-full"
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-700">
            In Charge: {sportData.in_charge_name || "No in charge assigned yet"}
          </p>
          {userData.profile.user_type == "admin" && (
            <Button onClick={handleSetInCharge}>Set In Charge</Button>
          )}
        </div>
        <SportTabs sportData={sportData} />
      </CardContent>

      <Dialog open={showInChargeDialog} onOpenChange={setShowInChargeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set In Charge</DialogTitle>
          </DialogHeader>
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
                className={`p-2 cursor-pointer ${
                  selectedStaffMember?.id === staff.id
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
              onClick={handleConfirmInCharge}
              disabled={!selectedStaffMember}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mx-auto" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-[50vh] mb-6" />
        <Skeleton className="h-4 w-1/2 mb-6" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

function ErrorAlert({ message }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

function SportTabs({ sportData }) {
  return (
    <Tabs defaultValue="announcements">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="announcements">Announcements</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>
      <TabsContent value="announcements">
        {/* <Announcements sportData={sportData} /> */}
        Announcements
      </TabsContent>
      <TabsContent value="team">
        {/* <Team sportData={sportData} /> */}
        Team
      </TabsContent>
      <TabsContent value="schedule">
        {/* <Schedule sportData={sportData} /> */}
        Schedule
      </TabsContent>
    </Tabs>
  );
}
