import { api } from "@/services/axios";
import { useEffect, useState } from "react";

interface Banner {
  banner: string;
}

export default function useFetchLoginBanner() {
  const [banners, setBanners] = useState<Banner[] | null>(null);

  useEffect(() => {
    fetcher();
  }, []);

  async function fetcher() {
    try {
      const response = await api.get("/auth/banners");
      setBanners(response.data.results);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return { banners };
}
