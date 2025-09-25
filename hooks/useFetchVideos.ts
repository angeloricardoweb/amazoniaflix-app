import { IVideo } from "@/interfaces";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function useFetchVideos({ params }: { params: string }) {
  const [data, setData] = useState<IVideo[] | null>(null);

  useEffect(() => {
    fetcher();
  }, [params]);

  async function fetcher() {
    try {
      const response = await api.get(`/videos${params ? `?${params}` : ""}`);
      setData(response.data.results);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return { data };
}
