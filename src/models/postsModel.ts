export type CategoriesType =
  | 'HTML / Git'
  | 'CSS'
  | 'JavaScript'
  | 'Front-End'
  | 'Back-End'
  | 'Algorithm'
  | 'Life'
  | 'Book / Learn';

export interface PostsType {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  catName: CategoriesType | string;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
