export interface BlogPost {
    _id: string;
    _createdAt: string;
    title: string;
    slug: {
      current: string;
      _type: 'slug';
    };
    description1?: string;
    description2?: string;
    quote?: string;
    author?: string;
    images: Array<{
      _key: string;
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
    }>;
  }