export interface INews {
  id: number;
  thumbnail: string;
  title: string;
  status: number;
  tags: string[];
  createdAt: string;
}

export interface INewsDto {
  id: number;
  thumbnail: string;
  title: string;
  tags: string[];
  createdAt: string;
  description: string;
  content: string;
  location: string;
}
