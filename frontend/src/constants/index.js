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

export const userTypes = [
  { value: "internal", pk: 1, label: "Internal" },
  { value: "external", pk: 2, label: "External" },
  { value: "staff", pk: 3, label: "staff" },
  { value: "admin", pk: 4, label: "admin" },
];

export default pageLinks;
