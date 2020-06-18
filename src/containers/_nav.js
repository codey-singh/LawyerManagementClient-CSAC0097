import AuthenticationService from "../_shared/services/AuthenticationService";

function getNav() {
  let nav = [];
  let role = AuthenticationService.getRole();
  console.log("role", role);
  switch (role) {
    case "ADMIN":
      nav = [
        {
          _tag: "CSidebarNavItem",
          name: "Welcome",
          to: "/welcome",
          icon: "cil-home",
        },
        {
          _tag: "CSidebarNavItem",
          name: "My Profile",
          to: "/profile",
          icon: "cil-user",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Users",
          to: "/users",
          icon: "cil-people",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Access Requests",
          to: "/access-requests",
          icon: "cil-envelope-letter",
        },
      ];
      break;
    case "MANAGEMENT":
      nav = [
        {
          _tag: "CSidebarNavItem",
          name: "Welcome",
          to: "/welcome",
          icon: "cil-home",
        },
        {
          _tag: "CSidebarNavItem",
          name: "My Profile",
          to: "/profile",
          icon: "cil-user",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Users",
          to: "/users",
          icon: "cil-people",
        },
      ];
      break;
    default:
      nav = [
        {
          _tag: "CSidebarNavItem",
          name: "Welcome",
          to: "/welcome",
          icon: "cil-home",
        },
        {
          _tag: "CSidebarNavItem",
          name: "My Profile",
          to: "/profile",
          icon: "cil-user",
        },
      ];
      break;
  }
  return nav;
}

export default getNav;
