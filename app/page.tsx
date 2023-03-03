'use client';
import axios from 'axios';
import AddPost from './components/AddPost';
import Post from './components/Post';
import { useQuery } from '@tanstack/react-query';

//Fetch all post

const allPosts = async () => {
  const response = await axios.get('./api/posts/getPost');
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
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
