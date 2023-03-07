'use client';

import Post from '@/app/components/Post';
import { PostType } from '@/app/Types/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType[]>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ['detail-post'],
  });
  if(isLoading) return 'Loading...'
  console.log(data)
  return (
    <div>
      <Post />
    </div>
  );
}
