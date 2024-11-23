export interface IReview {
  id: number;
  phoneNumber: string;
  fullName: string;
  courtClusterId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export class ReviewsDto {
  phoneNumber: string = '';
  courtclusterId: number = 0;
  rating: number = 0;
  comment: string = '';
  createAt: string = '';

  constructor(data?: Partial<ReviewsDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
