import {
  faChartLine, // Dashboard
  faCalendarAlt, // Eventsa
  faList, // Items
  faClipboardList, // Reservations
  faUsers, // Members
  faFutbol, // Sports
  faUser,
  faSignOut, // Profile
} from "@fortawesome/free-solid-svg-icons";

const pageLinks = [
  { index: 1, icon: faChartLine, name: "Dashboard", href: "/dashboard" },
  { index: 2, icon: faCalendarAlt, name: "Events", href: "/events" },
  { index: 3, icon: faList, name: "Items", href: "/items" },
  {
    index: 4,
    icon: faClipboardList,
    name: "Reservations",
    href: "/reservations",
  },
  { index: 5, icon: faUsers, name: "Members", href: "/members" },
  { index: 6, icon: faFutbol, name: "Sports", href: "/sports" },
  { index: 7, icon: faUser, name: "Profile", href: "/profile" },
  { index: 8, icon: faSignOut, name: "Logout", href: "/logout" },
];

export const cities = [
  { pk: 1, label: "Kandy" },
  { pk: 2, label: "Matale" },
  { pk: 3, label: "Nuwara Eliya" },
  { pk: 4, label: "Trincomalee" },
  { pk: 5, label: "Batticaloa" },
  { pk: 6, label: "Ampara" },
  { pk: 7, label: "Anuradhapura" },
  { pk: 8, label: "Polonnaruwa" },
  { pk: 9, label: "Jaffna" },
  { pk: 10, label: "Kilinochchi" },
  { pk: 11, label: "Mannar" },
  { pk: 12, label: "Vavuniya" },
  { pk: 13, label: "Mullaitivu" },
  { pk: 14, label: "Kurunegala" },
  { pk: 15, label: "Puttalam" },
  { pk: 16, label: "Ratnapura" },
  { pk: 17, label: "Kegalle" },
  { pk: 18, label: "Galle" },
  { pk: 19, label: "Matara" },
  { pk: 20, label: "Hambantota" },
  { pk: 21, label: "Badulla" },
  { pk: 22, label: "Monaragala" },
  { pk: 23, label: "Colombo" },
  { pk: 24, label: "Gampaha" },
  { pk: 25, label: "Kalutara" },
];

export default pageLinks;
