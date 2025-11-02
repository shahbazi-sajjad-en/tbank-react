import httpservice from "src/configs/httpservice";
export const GetMediaStatusTypes = (): Promise<any> => {
  return httpservice
    .get("media/media-status-type-list")
    .then((res) => res.data) 
    .catch((err) => {
      console.error("GetMediaTypes error:", err);
      throw err;
    });
};

