import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Edit, Trash } from "lucide-react";
import PropTypes from "prop-types";

function AnnouncementItem({ announcement, onEdit, onDelete }) {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      {/* {console.log(announcement)} */}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">
              {announcement.title}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-gray-500">
              {announcement.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {announcement.sport_name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{announcement.content}</p>
        {/* <div className="flex items-center mt-4 text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
        </div> */}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(announcement)}
        >
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(announcement.id)}
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

AnnouncementItem.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    description: PropTypes.string,
    sport_name: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AnnouncementItem;
