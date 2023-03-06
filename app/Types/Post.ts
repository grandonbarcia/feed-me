export type PostType = {
  title: string;
  id: string;
  createdAt: string;
  name: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};
