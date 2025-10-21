export const getStatusColor = (status: string) => {
  switch (status) {
    case "فعال":
      return "success";
    case "نیمه فعال":
      return "warning";
    case "تمدید":
      return "info";
    case "باز":
      return "primary";
    case "مسدود":
    case "بسته":
      return "error";
    default:
      return "default";
  }
};
