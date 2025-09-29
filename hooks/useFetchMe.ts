import { IMe } from "@/interfaces";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";

export default function useFetchMe() {
  const [data, setData] = useState<IMe | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    fetcher();
  }, []);

  async function fetcher() {
    try {
      const response = await api.get(`/me`);
      setData(response.data.results);
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.message[0] === "Token inválido") {
        logout();
      }
    }
  }

  return { data };
}
