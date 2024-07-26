import {
  LayoutDashboard,
  Calendar,
  List,
  ClipboardPen,
  Users2,
  Medal,
} from "lucide-react";




const pageLinks = [
  { index: 1, icon: LayoutDashboard, name: "Dashboard", href: "/dashboard" },
  { index: 2, icon: Calendar, name: "Events", href: "/events" },
  { index: 3, icon: List, name: "Items", href: "/items" },
  {
    index: 4,
    icon: ClipboardPen,
    name: "Reservations",
    href: "/reservations",
  },
  { index: 5, icon: Users2, name: "Members", href: "/members" },
  { index: 6, icon: Medal, name: "Sports", href: "/sports" },
];

export const provinces = [
  {
    id: 1,
    label: "Central",
  },
  {
    id: 2,
    label: "Eastern",
  },
  {
    id: 3,
    label: "North Central",
  },
  {
    id: 4,
    label: "Northern",
  },
  {
    id: 5,
    label: "North Western",
  },
  {
    id: 6,
    label: "Sabaragamuwa",
  },
  {
    id: 7,
    label: "Southern",
  },
  {
    id: 8,
    label: "Uva",
  },
  {
    id: 9,
    label: "Western",
  },
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

export const userTypes = [
  { pk: 1, label: "Student", name: "student" },
  { pk: 2, label: "Academic", name: "academic" },
  { pk: 3, label: "Postgraduate", name: "postgraduate" },
  { pk: 4, label: "External", name: "external" },
  { pk: 5, label: "Internal", name: "internal" },
  { pk: 6, label: "Approval", name: "approval" },
  { pk: 7, label: "Payment", name: "payment" },
  { pk: 8, label: "Staff", name: "staff" },
  { pk: 9, label: "Admin", name: "admin" },
];

export const faculties = [
  { pk: 1, label: "Science", value: "science", code: "sci" },
  { pk: 2, label: "Engineering", value: "engineering", code: "eng" },
  { pk: 3, label: "Arts", value: "arts", code: "arts" },
  { pk: 4, label: "Medicine", value: "medicine", code: "med" },
  { pk: 5, label: "Management", value: "management", code: "mgt" },
  {
    pk: 6,
    label: "Veterinary Medicine and Animal Science",
    value: "vet",
    code: "vet",
  },
  { pk: 7, label: "Dental Sciences", value: "dental", code: "dental" },
  { pk: 8, label: "Agriculture", value: "agriculture", code: "agri" },
  { pk: 9, label: "Allied Health Science", value: "ahs", code: "ahs" },
];

export default pageLinks;
