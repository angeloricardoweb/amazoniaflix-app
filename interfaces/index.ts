export interface IVideoLite {
  id: number;
  slug: string;
  titulo: string;
  categorias: {
    id: number;
    titulo: string;
    slug: string;
  }[];
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

export interface ISecao {
  id: number;
  titulo: string;
  videos: IVideoLite[];
}

export interface IVideo extends IVideoLite {
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

export interface ICategoria {
  id: number;
  titulo: string;
  slug: string;
}

export interface IMe {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  avatar_url: string;
}