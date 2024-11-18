import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import PropTypes from "prop-types";

function ErrorAlert({ message }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorAlert;
