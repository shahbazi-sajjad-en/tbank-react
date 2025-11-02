import httpservice from "src/configs/httpservice";
import { MediaTypeResponse } from "./types";

export const GetMediaTypes = (): Promise<MediaTypeResponse> => {
  return httpservice
    .get("/media/media-type-list")
    .then((res) => res.data) 
    .catch((err) => {
      console.error("GetMediaTypes error:", err);
      throw err;
    });
};
