export interface NewsListInterfaces {
  id?: number;
  title: string;
  content: string;
  image: string | null;
  like: number[];
  dislike: number[];
  comments: number;
}
