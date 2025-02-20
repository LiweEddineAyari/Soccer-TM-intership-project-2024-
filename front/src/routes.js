/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import EquipeGestion from "views/EquipeGestion";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import MatchesGestion from "views/MatchesGestion";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import TerrainGestion from "views/TerrainGestion";
import Typography from "views/Typography.js";
import UserGestion from "views/UserGestion";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: <Map />,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
  },
  {
    path: "/UserGestion",
    name: "User List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <UserGestion />,
    layout: "/admin",
  },
  {
    path: "/TerrainGestion",
    name: "Terrain List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <TerrainGestion />,
    layout: "/admin",
  },
  {
    path: "/EquipeGestion",
    name: "Equipe List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <EquipeGestion />,
    layout: "/admin",
  },
  {
    path: "/MatchesGestion",
    name: "Matches List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: <MatchesGestion />,
    layout: "/admin",
  },

];
export default routes;
