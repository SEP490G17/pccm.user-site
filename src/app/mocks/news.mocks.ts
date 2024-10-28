import { News } from "@/app/models/news.model";
import image1 from "@/assets/images/san1.png";


export const listNewsMock: News[] = [
  {
    id: 1,
    thumbnail: image1,
    title: 'Breaking News: Sports Event',
    description: 'A major sports event is happening...',
    status: 1,
    tags: ['Sports', 'Event'],
    createdAt: '2024-10-21',
  },
  {
    id: 2,
    thumbnail: image1,
    title: 'Tech Innovations in 2024',
    description: 'New tech trends are emerging...',
    status: 1,
    tags: ['Technology', 'Innovation'],
    createdAt: '2024-10-20',
  },
  {
    id: 3,
    thumbnail: image1,
    title: 'Local Festival This Weekend',
    description: 'A local festival will take place...',
    status: 1,
    tags: ['Festival', 'Local'],
    createdAt: '2024-10-19',
  },
   {
    id: 4,
    thumbnail: image1,
    title: 'Breaking News: Sports Event',
    description: 'A major sports event is happening...',
    status: 1,
    tags: ['Sports', 'Event'],
    createdAt: '2024-10-21',
  },
  {
    id: 5,
    thumbnail: image1,
    title: 'Tech Innovations in 2024',
    description: 'New tech trends are emerging...',
    status: 1,
    tags: ['Technology', 'Innovation'],
    createdAt: '2024-10-20',
  },
  {
    id: 6,
    thumbnail: image1,
    title: 'Local Festival This Weekend',
    description: 'A local festival will take place...',
    status: 1,
    tags: ['Festival', 'Local'],
    createdAt: '2024-10-19',
  }
];
