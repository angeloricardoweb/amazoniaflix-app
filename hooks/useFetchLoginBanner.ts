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
      const response = await api.get("/auth/banner");
      setBanners(response.data.results.banners);
    } catch (error: any) {
      console.error(error.response.data);
    }
  }

  return { banners };
}
