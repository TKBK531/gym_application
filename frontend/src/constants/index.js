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
  { pk: 1, label: "Kandy", province: "Central" },
  { pk: 2, label: "Matale", province: "Central" },
  { pk: 3, label: "Nuwara Eliya", province: "Central" },
  { pk: 4, label: "Trincomalee", province: "Eastern" },
  { pk: 5, label: "Batticaloa", province: "Eastern" },
  { pk: 6, label: "Ampara", province: "Eastern" },
  { pk: 7, label: "Anuradhapura", province: "North Central" },
  { pk: 8, label: "Polonnaruwa", province: "North Central" },
  { pk: 9, label: "Jaffna", province: "Northern" },
  { pk: 10, label: "Kilinochchi", province: "Northern" },
  { pk: 11, label: "Mannar", province: "Northern" },
  { pk: 12, label: "Vavuniya", province: "Northern" },
  { pk: 13, label: "Mullaitivu", province: "Northern" },
  { pk: 14, label: "Kurunegala", province: "North Western" },
  { pk: 15, label: "Puttalam", province: "North Western" },
  { pk: 16, label: "Ratnapura", province: "Sabaragamuwa" },
  { pk: 17, label: "Kegalle", province: "Sabaragamuwa" },
  { pk: 18, label: "Galle", province: "Southern" },
  { pk: 19, label: "Matara", province: "Southern" },
  { pk: 20, label: "Hambantota", province: "Southern" },
  { pk: 21, label: "Badulla", province: "Uva" },
  { pk: 22, label: "Monaragala", province: "Uva" },
  { pk: 23, label: "Colombo", province: "Western" },
  { pk: 24, label: "Gampaha", province: "Western" },
  { pk: 25, label: "Kalutara", province: "Western" },
];

export default pageLinks;
