// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "خانه",
      icon: "tabler:smart-home",
      path: "/",
    },
    {
      title: "‌مدیریت حساب‌ها",
      icon: "tabler:clipboard-list",
      path: "/account-managment",
    },

    {
      title: "مدیریت کارت‌ها",
      path: "/cards-managment",
      icon: "tabler:credit-card",
    },
    {
      title: "مدیریت کاربران",
      icon: "tabler:users",
    },
    {
      title: "مدیریت مشتریان",
      icon: "tabler:vocabulary",
    },
    {
      title: "تراکنش‌ها",
      icon: "tabler:report-money",
    },

    {
      title: "گزارشات",
      icon: "tabler:report",
    },
  ];
};

export default navigation;
