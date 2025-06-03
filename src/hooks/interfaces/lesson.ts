export interface IArticle {
  _id: string;
  vn: string;
  en: string;
  name: string;
  vocabulary: string;
  catId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}
export interface ICategory {
  _id: string;
  title: string;
  topicId: {
    _id: string;
    title: string;
  };
  createdAt: string;
}
export interface IOption {
  label: string;
  value: string | number;
}
export interface ITopic {
  _id: string;
  title: string;
  createdAt: string;
}
