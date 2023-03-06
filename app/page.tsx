'use client';
import axios from 'axios';
import AddPost from './components/AddPost';
import Post from './components/Post';
import { useQuery } from '@tanstack/react-query';
import { PostType } from './Types/Post';

//Fetch all post

const allPosts = async () => {
  const response = await axios.get('./api/posts/getPost');
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ['posts'],
  });
  if (error) return error;
  if (isLoading) return 'Loading...';
  console.log(data);
  return (
    <main>
      <AddPost />
      {data?.map((post) => (
        <Post
          comments={post.comments}
          key={post.id}
          id={post.id}
          name={post.name}
          avatar={post.user.image}
          postTitle={post.title}
        />
      ))}
    </main>
  );
}
