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
import Card5 from "../assets/Card5.jpg";
import Card6 from "../assets/Card6.jpg";
import Card7 from "../assets/Card7.jpg";
import Card8 from "../assets/Card8.jpg";
import Card1 from "../assets/Card1.jpg";

export const countingCards = [
  {
    id: "1",
    count: "0",
    test: "All Events",
  },
  {
    id: "2",
    count: "0",
    test: "On going",
  },
  {
    id: "3",
    count: "0",
    test: "Upcoming",
  },
];

export const categoryCards = [
  {
    id: "1",
    categoryName: "Sports",
    image: Card5,
  },
  {
    id: "2",
    categoryName: "Musical Shows",
    image: Card6,
  },
  {
    id: "3",
    categoryName: "Other Functions",
    image: Card7,
  },
];

export const dateBox = [
  {
    id: "1",
    count: "On Going Events",
    test: "football match,hockey match",
    image: Card1,
  },
  {
    id: "1",
    count: "Holidays",
    test: "Navam fullmoon poya day",
    image: Card8,
  },
];

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
