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
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
];

export default routes;
