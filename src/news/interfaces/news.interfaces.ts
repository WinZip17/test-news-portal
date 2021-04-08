export interface NewsInterfaces {
  id?: number;
  title: string;
  content: string;
  image: string | null;
  like?: number;
  dislike?: number;
}
