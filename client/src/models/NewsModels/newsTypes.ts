export interface AddNewsTypes {
  title: string;
  content: string;
  image?: any
}

export interface ReactionNewsTypes {
  reaction: string;
  id: number;
}

export interface CommentType {
  NewsId?: number;
  content: string;
}
