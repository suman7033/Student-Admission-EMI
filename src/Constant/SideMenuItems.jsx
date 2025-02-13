import { RxDashboard } from "react-icons/rx";
import { RiTeamFill } from "react-icons/ri";
import { HiAcademicCap } from "react-icons/hi2";
import { FaCodeBranch } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { BsPersonRaisedHand } from "react-icons/bs";
import { MdAccountBalance } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export const SideMenuItems = [
  {
    label: "Dashboard",
    icon: RxDashboard,
    link: "/",
    id: "dashboard",
    name: "dashboard",
  },
  {
    label: "Admission List",
    icon: FaAddressCard,
    link: "/admission_list",
    id: "admission-list",
    name: "admission",
  },
  {
    label: "Team List",
    icon: RiTeamFill,
    link: "/team_list",
    id: "team-list",
    name: "Team",
  },
  {
    label: "MainSource List",
    icon: BsPersonRaisedHand,
    link: "/main_source",
    id: "main-source",
    name: "MainSource",
  },
  {
    label: "SubSource List",
    icon: BsPersonRaisedHand,
    link: "/sub_source",
    id: "sub-source",
    name: "SubSource",
  },
  {
    label: "Course List",
    icon: HiAcademicCap,
    link: "/course_list",
    id: "course-list",
    name: "Course",
  },
  {
    label: "Branch List",
    icon: FaCodeBranch,
    link: "/branch_list",
    id: "branch-list",
    name: "Branch",
  },
  {
    label: "Account List",
    icon: MdAccountBalance,
    link: "/account_list",
    id: "account-list",
    name: "Account",
  },
  {
    label: "Whatsapp List",
    icon: FaWhatsapp,
    link: "/whatsapp_list",
    id: "whatsapp",
    name: "Whatsapp",
  },
  {
    label: "Mail List",
    icon: MdOutlineAttachEmail,
    link: "/mail",
    id: "mail-list",
    name: "mail",
  },
];

export default SideMenuItems;
