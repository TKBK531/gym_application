import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Edit } from "lucide-react";
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
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorAlert from "./ErrorAlert";
import SportTabs from "./SportTabs";

export default function SportCardPage() {
  const [sportData, setSportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInChargeDialog, setShowInChargeDialog] = useState(false);
  const [showImageUploadDialog, setShowImageUploadDialog] = useState(false);
  const [staffMembers, setStaffMembers] = useState([]);
  const [filteredStaffMembers, setFilteredStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaffMember, setSelectedStaffMember] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sportId = searchParams.get("id");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const fileInputRef = useRef(null);

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

  const handleUpdateImage = () => {
    setShowImageUploadDialog(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleConfirmImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);
    try {
      const response = await api.put(
        `/sport/${sportId}/update-sport-image/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image upload response", response.data.data);
      if (response.data.status === "success") {
        setSportData({
          ...sportData,
          image: response.data.data.image,
        });
        setShowImageUploadDialog(false);
        setSelectedImage(null);
      } else {
        console.error("Error updating sport image:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating sport image:", error);
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
          {userData.profile.user_type === "admin" && (
            <div
              className="absolute bottom-4 right-4 p-2 bg-primary-foreground rounded-full cursor-pointer hover:bg-secondary-golden transition-colors duration-200"
              onClick={handleUpdateImage}
            >
              <Edit className="h-6 w-6 text-primary" />
              <span className="sr-only">Update Image</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-700">
            In Charge: {sportData.in_charge_name || "No in charge assigned yet"}
          </p>
          {userData.profile.user_type === "admin" && (
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

      <Dialog
        open={showImageUploadDialog}
        onOpenChange={setShowImageUploadDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Sport Image</DialogTitle>
          </DialogHeader>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <DialogFooter>
            <Button
              onClick={handleConfirmImageUpload}
              disabled={!selectedImage}
            >
              Upload Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
