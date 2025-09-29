import { IVideo } from "@/interfaces";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function useFetchVideoDetails({ slug }: { slug: string }) {
  const [data, setData] = useState<IVideo | null>(null);

  useEffect(() => {
    fetcher();
  }, [slug]);

  async function fetcher() {
    try {
      console.log('Fetching video details for slug:', slug);
      const response = await api.get(`/videos/${slug}`);
      console.log('Video details response:', response.data);
      setData(response.data.results);
    } catch (error: any) {
      console.error('Error fetching video details:', error.response?.data || error.message);
    }
  }

  return { data };
}
