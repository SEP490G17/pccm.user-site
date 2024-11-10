import { makeAutoObservable, runInAction } from 'mobx';
import { INews, INewsDto } from '../models/news.model';
import agent from '../api/agent';

export default class NewsStore {
  listNews: INews[] = [];
  loadingInitial: boolean = false;
  newsDetail: INewsDto | undefined = undefined;
  currentPage: number = 1; // Trang hiện tại cho tin tức
  relatedNewsCurrentPage: number = 1; // Trang hiện tại cho tin liên quan
  pageSize: number = 5; // Số lượng tin tức mỗi trang
  totalPages: number = 0; // Tổng số trang cho tin tức

  constructor() {
    makeAutoObservable(this);
  }

  loadListNews = async () => {
    this.setLoadingInitial(true);

    this.listNews = await agent.News.list();

    this.totalPages = Math.ceil(this.listNews.length / this.pageSize);

    await runInAction(async () => {
      this.setLoadingInitial(false);
    });
  };

  detailNews = async (id: number) => {
    this.newsDetail = await agent.News.detail(id);
  };

  // Tính danh sách tin tức dựa vào trang hiện tại
  get paginatedNews() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.listNews.slice(startIndex, endIndex);
  }

  get paginatedRelatedNews() {
    const startIndex = (this.relatedNewsCurrentPage - 1) * this.pageSize; // Sử dụng pageSize
    const endIndex = startIndex + this.pageSize;
    return this.listNews.slice(startIndex, endIndex); // Có thể sử dụng listNews hoặc shuffledNews tùy theo ý định
  }

  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);

  // Thay đổi trang hiện tại cho tin tức
  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  // Thay đổi trang hiện tại cho tin liên quan
  setRelatedNewsCurrentPage = (page: number) => {
    this.relatedNewsCurrentPage = page;
  };
}
