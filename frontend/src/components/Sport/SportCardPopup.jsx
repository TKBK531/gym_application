import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SportCardPopup = ({ onClose, sportData }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const body = document.body;
    body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90vw] h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              &times;
            </button>

            <div className="sport-content">
              {sportData ? (
                <>
                  <h2 className="text-2xl font-bold mb-2 w-full text-center">
                    {sportData.label}
                  </h2>
                  <img
                    src={
                      sportData.image
                        ? sportData.image
                        : "http://127.0.0.1:8000/media/images/sport_images/baseball.webp"
                    }
                    className="object-cover rounded-md object-center w-full h-[50vh] transform transition duration-500 ease-out"
                    alt=""
                  />
                  <p className="text-gray-700 my-4">
                    In Charge :{" "}
                    {sportData.in_charge_name
                      ? sportData.in_charge_name
                      : "No in charge assigned yet"}
                  </p>
                </>
              ) : (
                <p className="text-gray-700">This is a sport!</p>
              )}
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

SportCardPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  sportData: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image: PropTypes.string,
    in_charge_name: PropTypes.string,
  }),
};

export default SportCardPopup;
