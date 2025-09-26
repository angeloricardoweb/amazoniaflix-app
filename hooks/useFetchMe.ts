import { IMe } from "@/interfaces";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function useFetchMe() {
  const [data, setData] = useState<IMe | null>(null);

  useEffect(() => {
    fetcher();
  }, []);

  async function fetcher() {
    try {
      const response = await api.get(`/me`);
      setData(response.data.results);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return { data };
}
