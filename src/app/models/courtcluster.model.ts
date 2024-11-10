export interface ICourtCluster {
  id: number;
  courtClusterName: string;
  title: string;
  address: string;
  province: string;
  provinceName: string;
  district: string;
  districtName: string;
  ward: string;
  wardName: string;
  description: string;
  images: string[];
  services: IService[];
  openTime: string;
  closeTime: string;
  numbOfCourts: number;
  products: IProduct[];
}

// export interface ILocation {
//   tinh: string;
//   thanhpho: string;
//   diachi: string;
// }

export interface IService {
  id: number;
  serviceName: string;
  price: number;
  courtClusterName: string;
  courtClusterId: number;
  description: string;
}

export interface IProduct {
  id: number;
  productName: string;
  quantity: number;
  priceBuy: number;
  priceSell: number;
  categoryName: string;
  categoryId: number;
  thumbnailUrl: string;
}


