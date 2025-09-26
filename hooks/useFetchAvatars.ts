import { IAvatar } from "@/interfaces";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function useFetchAvatars() {
  const [data, setData] = useState<IAvatar[] | null>(null);

  useEffect(() => {
    fetcher();
  }, []);

  async function fetcher() {
    try {
      const response = await api.get(`/avatars`);
      setData(response.data.results);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return { data };
}
