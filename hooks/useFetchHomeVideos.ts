import { IVideoLite } from "@/interfaces";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

interface HomeVideos {
  id: number;
  titulo: string;
  videos: IVideoLite[];
}

export default function useFetchHomeVideos() {
  const [data, setData] = useState<HomeVideos[] | null>(null);

  useEffect(() => {
    fetcher();
  }, []);

  async function fetcher() {
    try {
      const response = await api.get("/home/videos");
      setData(response.data.results);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return { data };
}
