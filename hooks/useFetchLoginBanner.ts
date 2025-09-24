import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function useFetchLoginBanner() {
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  async function fetchBanner() {
    try {
      const response = await api.get("/auth/banner");
      setBanner(response.data.results.banner);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return { banner };
}
