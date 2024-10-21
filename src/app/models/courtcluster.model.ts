export interface ICourtCluster {
  id: number;
  title: string;
  location: string;
  ownerid: string;
  description: string;
  images: string[];
  services: IServices[];
  createAt: string;
  openHours: string[];
  addresss: string;
  quantity: number;
  products: IProducts[];
}

export interface IServices {
  id: number;
  name: string;
}

export interface IProducts {
  category: ICategory[];
  id: number;
  name: string;
}

export interface ICategory {
  id: number;
  name: string;
}
