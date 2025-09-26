import { IAvatar } from "@/interfaces";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function useFetchAvatars() {
  const [data, setData] = useState<IAvatar[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetcher();
  }, []);

  async function fetcher() {
    try {
      setIsLoading(true);
      const response = await api.get(`/avatars`);
      setData(response.data.results);
    } catch (error: any) {
      console.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  return { data, isLoading };
}
