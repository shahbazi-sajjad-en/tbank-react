export const getStatusColor = (status: string) => {
  switch (status) {
    case "فعال" :
      return "success";
    case "انجام شده" :
      return "success";
    case "نيمه فعال":
      return "warning";
    case "تمدید":
      return "info";
    case "باز":
      return "primary";
    case "مسدود":
    case "بسته":
      return "error";
    case "غیرفعال":
      return "error";
    default:
      return "default";
  }
};
