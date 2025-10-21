// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "مدیریت حساب",
      icon: "tabler:smart-home",
      badgeContent: "",
      badgeColor: "error",
      children: [],
    },
    {
      sectionTitle: "Apps & Pages",
    },
    {
      title: "Email",
      icon: "tabler:mail",
      path: "/apps/email",
    },
    {
      title: "Chat",
      icon: "tabler:messages",
      path: "/apps/chat",
    },
    {
      title: "Calendar",
      icon: "tabler:calendar",
      path: "/apps/calendar",
    },
    {
      title: "مدیریت کارت‌ها",
      icon: "tabler:file-dollar",
      children: [
        {
          title: "List",
          path: "/apps/invoice/list",
        },
        {
          title: "Preview",
          path: "/apps/invoice/preview",
        },
        {
          title: "Edit",
          path: "/apps/invoice/edit",
        },
        {
          title: "Add",
          path: "/apps/invoice/add",
        },
      ],
    },
    {
      title: "مدیریت مشتریان",
      icon: "tabler:user",
      children: [
        {
          title: "List",
          path: "/apps/user/list",
        },
        {
          title: "View",
          children: [
            {
              title: "Account",
              path: "/apps/user/view/account",
            },
            {
              title: "Security",
              path: "/apps/user/view/security",
            },
            {
              title: "Billing & Plans",
              path: "/apps/user/view/billing-plan",
            },
            {
              title: "Notifications",
              path: "/apps/user/view/notification",
            },
            {
              title: "Connection",
              path: "/apps/user/view/connection",
            },
          ],
        },
      ],
    },
    {
      title: "تراکنش‌ها",
      icon: "tabler:settings",
      children: [
        {
          title: "Roles",
          path: "/apps/roles",
        },
        {
          title: "Permissions",
          path: "/apps/permissions",
        },
      ],
    },
    {
      title: "گزارشات",
      icon: "tabler:file",
      children: [
        {
          title: "User Profile",
          children: [
            {
              title: "Profile",
              path: "/pages/user-profile/profile",
            },
            {
              title: "Teams",
              path: "/pages/user-profile/teams",
            },
            {
              title: "Projects",
              path: "/pages/user-profile/projects",
            },
            {
              title: "Connections",
              path: "/pages/user-profile/connections",
            },
          ],
        },
        {
          title: "مدیریت تسهیلات",
          children: [
            {
              title: "Account",
              path: "/pages/account-settings/account",
            },
            {
              title: "Security",
              path: "/pages/account-settings/security",
            },
            {
              title: "Billing",
              path: "/pages/account-settings/billing",
            },
            {
              title: "Notifications",
              path: "/pages/account-settings/notifications",
            },

            {
              title: "Connections",
              path: "/pages/account-settings/connections",
            },
          ],
        },
        {
          title: "FAQ",
          path: "/pages/faq",
        },
        {
          title: "Help Center",
          path: "/pages/help-center",
        },
        {
          title: "Pricing",
          path: "/pages/pricing",
        },
        {
          title: "Miscellaneous",
          children: [
            {
              openInNewTab: true,
              title: "Coming Soon",
              path: "/pages/misc/coming-soon",
            },
            {
              openInNewTab: true,
              title: "Under Maintenance",
              path: "/pages/misc/under-maintenance",
            },
            {
              openInNewTab: true,
              title: "Page Not Found - 404",
              path: "/pages/misc/404-not-found",
            },
            {
              openInNewTab: true,
              title: "Not Authorized - 401",
              path: "/pages/misc/401-not-authorized",
            },
            {
              openInNewTab: true,
              title: "Server Error - 500",
              path: "/pages/misc/500-server-error",
            },
          ],
        },
      ],
    },
  ];
};

export default navigation;
