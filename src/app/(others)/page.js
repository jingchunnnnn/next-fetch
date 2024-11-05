import Feed from '@/components/Feed';
import Input from '@/components/Input';

export default async function Home() {
  let data = [];
  try {
    const result = await fetch(process.env.URL + '/api/post/all', {
      method: 'POST',
      cache: 'no-store',
    });
    data = await result.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  return (
    <div className='min-h-screen max-w-screen mx-auto'>
      <div className='py-2 px-3 sticky top-0 z-50 bg-dark-green'>
        <h2 className='text-lg sm:text-xl font-bold text-white'>Home</h2>
      </div>
      <Input />
      <Feed data={data} />
    </div>
  );
}