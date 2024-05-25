import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { FaUser,FaUserEdit } from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/app/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/app/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/app/account/profile",
        icon: <FaUser />
      },
      {
        title: "Edit Profile",
        path: "/app/account/edit-profile",
        icon: <FaUserEdit />
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/app/contact-us",
  },
];

export default menu;