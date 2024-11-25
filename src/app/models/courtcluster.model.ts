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
  courts: ICourt[];

}

export interface CourtPriceBooking {
  courtId: number;
  courtName: string;
  time: string;
  price: number;
}

export interface ICourt{
  courtId: number;
  courtName: string;
  courtPrices: CourtPriceResponse[];
  courtCombos: CourtCombo[];
}
export interface CourtPriceResponse {
  price: number;
  fromTime: string;
  toTime: string;
}


export interface CourtCombo {
  id?:number;
  totalPrice: number;
  displayName: string;
  duration: number;
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



export interface CourtPriceBooking {
  courtId: number;
  courtName: string;
  time: string;
  price: number;
}
