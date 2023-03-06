'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthPosts } from '../Types/AuthPosts';
import EditPost from './EditPost';

const fetchAuthPosts = async () => {
  const response = await axios.get('/api/posts/authPost');
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ['auth-posts'],
  });

  if (isLoading) return <h1>Loading....</h1>;
  console.log(data);
  return (
    <div>
      {data?.Post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
