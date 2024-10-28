import { Banner, BannerStatus } from '@/app/models/banner.model';
import bannerImage from "@/assets/images/san1.png";

export const listBannerMock: Banner[] = [
  {
    id: 1,
    imageUrl: bannerImage,
    title: 'Big Sale 2024',
    description: 'Huge discounts on products!',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    status: BannerStatus.Display,
    linkUrl: 'https://example.com',
  },
  {
    id: 2,
    imageUrl: bannerImage,
    title: 'New Year Sale',
    description: 'Start the new year with amazing offers!',
    startDate: '2025-01-01',
    endDate: '2025-01-10',
    status: BannerStatus.Hidden,
    linkUrl: 'https://example.com',
  }
];