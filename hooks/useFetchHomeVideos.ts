import { IVideoLite } from "@/interfaces";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function useFetchHomeVideos() {
  const [data, setData] = useState<IVideoLite[] | null>(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  async function fetchBanner() {
    try {
      const response = await api.get("/home/videos");
      setData(response.data.results);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return { data };
}
