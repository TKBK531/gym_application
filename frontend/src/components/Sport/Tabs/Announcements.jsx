import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { PlusCircle } from "lucide-react";
import AnnouncementItem from "./AnnouncementItem";

const Announcements = ({ sportId }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    description: "",
    sport_name: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, [sportId]);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get(`/sport/${sportId}/posts/`);
      const data = response.data.data;
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await api.post(
        `/sport/${sportId}/posts/`,
        newAnnouncement
      );
      if (response.data.success) {
        setNewAnnouncement({
          title: "",
          content: "",
          description: "",
          sport_name: "",
        });
        fetchAnnouncements();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const handleUpdate = async (id, updatedAnnouncement) => {
    try {
      const response = await api.put(
        `/sport/${sportId}/posts/${id}`,
        updatedAnnouncement
      );
      if (response.data.success) {
        setEditingId(null);
        fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/sport/${sportId}/posts/${id}`);
      if (response.data.success) {
        fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Announcements</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
                placeholder="Title"
              />
              <Textarea
                value={newAnnouncement.content}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    content: e.target.value,
                  })
                }
                placeholder="Content"
              />
              <Input
                type="text"
                value={newAnnouncement.description}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
              />
              <Input
                type="text"
                value={newAnnouncement.sport_name}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    sport_name: e.target.value,
                  })
                }
                placeholder="Sport Name"
              />
              <Button onClick={handleCreate} className="w-full">
                Create Announcement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <AnnouncementItem
              key={announcement.id}
              announcement={announcement}
              onEdit={(updatedAnnouncement) => {
                setEditingId(announcement.id);
                handleUpdate(announcement.id, updatedAnnouncement);
              }}
              onDelete={() => handleDelete(announcement.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

Announcements.propTypes = {
  sportId: PropTypes.number.isRequired,
};

export default Announcements;
