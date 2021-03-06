import { User } from '../UserModels/userTypes';

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
  id: number;
  NewsId?: number;
  content: string;
  createdAt: string;
  user: User
}
