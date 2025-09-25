export interface VideoLite {
  id: number;
  slug: string;
  titulo: string;
  categorias: string[];
  banners: {
    vertical: string;
    horizontal: string;
  };
  classificacao_etaria: {
    id: number;
    titulo: string;
    cor: string;
  };
}

export interface Secao {
  id: number;
  titulo: string;
  videos: VideoLite[];
}

export interface Video extends VideoLite {
  descricao: string;
  video_id: string;
  elenco: [
    {
      nome: string;
      foto: string;
    }
  ];
  duracao: string;
}
