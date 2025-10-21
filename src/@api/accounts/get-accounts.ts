import httpservice from "src/configs/httpservice";

export const GetAccountsData = (data: any): Promise<any> => {
    return httpservice.post("/financial/account", data).then((res) => {
return res.data
    }).catch((err) => console.log(err))
};
