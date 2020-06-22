import React from "react";

const Welcome = React.lazy(() => import("./views/welcome/Welcome"));
const Profile = React.lazy(() => import("./views/profile/Profile"));
const AccessRequests = React.lazy(() =>
  import("./views/access-requests/AccessRequests")
);
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/welcome", name: "Welcome", component: Welcome },
  {
    path: "/access-requests",
    name: "AccessRequests",
    component: AccessRequests,
  },
  { path: "/profile", exact: true, name: "Profile", component: Profile },
  {
    path: "/profile/:id",
    exact: true,
    name: "Edit User Profile",
    component: Profile,
  },
  { path: "/users", exact: true, name: "Users", component: Users },
  {
    path: "/users/create",
    exact: true,
    name: "Create User",
    component: Profile,
  },
  {
    path: "/users/:id",
    exact: true,
    name: "User Profile Details",
    component: User,
  },
];

export default routes;
