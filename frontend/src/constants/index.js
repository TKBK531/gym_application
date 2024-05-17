import {
  faChartLine, // Dashboard
  faCalendarAlt, // Eventsa
  faList, // Items
  faClipboardList, // Reservations
  faUsers, // Members
  faFutbol, // Sports
  faUser, // Profile
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
];

export default pageLinks;
