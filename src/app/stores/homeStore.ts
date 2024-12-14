import { makeAutoObservable, runInAction } from 'mobx';
import { INews } from '../models/news.model';
import agent from '../api/agent';
import { catchErrorHandle } from '../helper/utils';
import { NewsPageParams } from '../models/pageParams.model';
import { toast } from 'react-toastify';

export default class HomeStore {
  newsRegistry = new Map<number, INews>();
  loadingInitial: boolean = false;
  currentPage: number = 1; // Trang hiện tại cho tin tức
  pageSize: number = 5; // Số lượng tin tức mỗi trang
  totalPages: number = 0; // Tổng số trang cho tin tức
  newsPageParam = new NewsPageParams();

  constructor() {
    makeAutoObservable(this);
  }

  loadNews = async () => {
    this.setLoadingInitial(true);
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.newsPageParam.skip}`);
    queryParams.append('pageSize', `${this.newsPageParam.pageSize}`);
    if (this.newsPageParam.searchTerm) {
      queryParams.append('search', this.newsPageParam.searchTerm);
    }
  
    const tagList: string[] = this.newsPageParam.tagsList || [];
  
    const [err, res] = await catchErrorHandle(
      agent.News.list(`?${queryParams.toString()}`, tagList)
    );
  
    runInAction(() => {
      if (res) {
        res.data.forEach(this.setNews);
        this.newsPageParam.pageSize = res.pageSize;
        this.newsPageParam.totalElement = res.count;
      }
      if (err) {
        toast('Lấy danh sách tin tức thất bại');
      }
      this.setLoadingInitial(false);
    });
  };
  


  get listNews() {
    return Array.from(this.newsRegistry.values());
  }


  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);

 

  setNews = (news: INews) => {
    this.newsRegistry.set(news.id, news);
  };

}
