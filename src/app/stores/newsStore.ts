import { makeAutoObservable, runInAction } from 'mobx';
import { INews, INewsDto } from '../models/news.model';
import agent from '../api/agent';
import { catchErrorHandle } from '../helper/utils';
import { NewsPageParams, PageParams } from '../models/pageParams.model';
import { toast } from 'react-toastify';

export default class NewsStore {
  newsRegistry = new Map<number, INews>();
  loadingInitial: boolean = false;
  newsDetail: INewsDto | undefined = undefined;
  currentPage: number = 1; // Trang hiện tại cho tin tức
  relatedNewsCurrentPage: number = 1; // Trang hiện tại cho tin liên quan
  pageSize: number = 5; // Số lượng tin tức mỗi trang
  totalPages: number = 0; // Tổng số trang cho tin tức
  newsPageParam = new NewsPageParams();
  commonTags: Map<string, number> = new Map<string, number>();
  anotherTagSet: Set<string> = new Set();

  anotherTagsPageParam = new PageParams();
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
  

  loadAnotherNews = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append('skip', `${this.anotherTagsPageParam.skip}`);
    queryParams.append('pageSize', `${this.anotherTagsPageParam.pageSize}`);
    if (this.anotherTagsPageParam.searchTerm) {
      queryParams.append('search', this.anotherTagsPageParam.searchTerm);
    }

    const [, res] = await catchErrorHandle(agent.News.anotherTags(`?${queryParams.toString()}`));

    runInAction(() => {
      if (res) {
        res.data
          .flatMap((x) => x.tag)
          .forEach((tag) => {
            this.anotherTagSet.add(tag); // Thêm vào Set
          });
        this.anotherTagsPageParam.totalElement = res.count; // Cập nhật theo size của Set
      }
    });
  };

  get anotherTags() {
    return Array.from(this.anotherTagSet);
  }

  loadCommonTags = async () => {
    const [, res] = await catchErrorHandle(agent.News.commonTags());
    runInAction(() => {
      if (res) {
        this.setTags(res);
      }
    });
  };

  get listNews() {
    return Array.from(this.newsRegistry.values());
  }

  detailNews = async (id: number) => {
    this.newsDetail = await agent.News.detail(id);
  };

  setLoadingInitial = (isLoad: boolean) => (this.loadingInitial = isLoad);

  // Thay đổi trang hiện tại cho tin tức
  setCurrentPage = (page: number) => {
    this.currentPage = page;
  };

  // Thay đổi trang hiện tại cho tin liên quan
  setRelatedNewsCurrentPage = (page: number) => {
    this.relatedNewsCurrentPage = page;
  };

  setNews = (news: INews) => {
    this.newsRegistry.set(news.id, news);
  };

  setTags = (tags: Map<string, number>) => {
    const array = Array.from(tags.entries()).map(([key, value]) => ({ key, value }));

    // If the structure is still nested, fix it
    const flattenedArray = array.map((item: any) => ({
      key: item.value.key,
      value: item.value.value,
    }));
    flattenedArray.forEach((item) => {
      this.commonTags.set(item.key, item.value);
    });
    console.log('check commonTags', this.commonTags);
  };

  setTagsTerm = (tag: string) => {
    const check = this.newsPageParam.tagsList.find((value) => value == tag);
    const tagList = [...this.newsPageParam.tagsList];
    if (!check) {
      tagList.push(tag);
      this.newsPageParam.tagsList = tagList;
    } else {
      this.newsPageParam.tagsList = tagList.filter((value) => value != tag);
    }
    console.log(this.newsPageParam.tagsList);
  };

  get tagList() {
    return this.newsPageParam.tagsList.join(',');
  }

  handleChangeTags = (tags: string[]) => {
    this.newsPageParam ={...this.newsPageParam, tagsList: tags};
  };

  handlerSearchTempChange = (searchTemp:string) =>{
    this.newsPageParam = {...this.newsPageParam, searchTerm:searchTemp};
  }
}
