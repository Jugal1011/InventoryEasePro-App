import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

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
      },
      {
        title: "Edit Profile",
        path: "/app/account/edit-profile",
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