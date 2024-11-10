export interface IReview {
    id: number;
    userId: string;
    fullName: string;
    courtClusterId: number;
    rating: number;
    comment: string;
    createdAt: string;
  }

export class ReviewsDto {
  userId: string = '';
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
