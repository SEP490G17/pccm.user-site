import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { ImageUpload } from '../models/upload.model';

export default class UploadStore {
  loading: boolean = false;
  imageRegistry = new Map<string, ImageUpload>();
  constructor() {
    console.log('user store initialized');
    makeAutoObservable(this);
    // this.cleanupInterval = window.setInterval(this.cleanUserCache, 30000);
  }

  upImage = async (file: File, fileName: string) => {
    this.loading = true;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const image = await agent.Upload.post(formData);
      runInAction(() => {
        this.setImageRegistry(image, fileName);
      });
      return image;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  private setImageRegistry = (image: ImageUpload, fileName: string) => {
    this.imageRegistry.set(fileName, image);
  };
}
