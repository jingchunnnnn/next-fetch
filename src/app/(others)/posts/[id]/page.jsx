import Comments from '@/components/Comments';
import Post from '@/components/Post';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

export const generateMetadata = async ({ params }) => {
  const res = await fetch(`${process.env.URL}/api/post/get`, {
      method: 'POST',
      body: JSON.stringify({ postId: params.id }),
      cache: 'no-store',
  });

  if (!res.ok) {
      return {
          title: 'Post not found',
          description: 'The requested post is not available.',
      };
  }

  const data = await res.json();

  return {
      title: data.username ? `Post by ${data.name}` : 'Post not found',
      description: 'Fetch! post page',
  };
};

export default async function PostPage({ params }) {
  let data = null;
  try {
    const result = await fetch(process.env.URL + '/api/post/get', {
      method: 'POST',
      body: JSON.stringify({ postId: params.id }),
      cache: 'no-store',
    });
    data = await result.json();
  } catch (error) {
    console.log('Error getting post:', error);
    data = { text: 'Failed to load post' };
  }

  return (
    <div className='max-w-screen mx-auto min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-light-green'>
        <Link href={'/'} className='rounded-full p-2'>
          <HiArrowLeft className='h-5 w-5' />
        </Link>
        <h2 className='sm:text-lg'>Back</h2>
      </div>
      {!data && <h2 className='text-center mt-5 text-lg'>Post not found</h2>}
      {data && <Post post={data}/>}
      {data && <Comments comments={data.comments} />}
    </div>
  );
}