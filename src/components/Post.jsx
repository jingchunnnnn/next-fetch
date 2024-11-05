import Link from 'next/link';
import { HiDotsHorizontal } from 'react-icons/hi';
import moment from 'moment';
import Icons from './Icons';

export default function Post({ post }) {
  return (
    <div className='flex p-3 w-full hover:bg-dark-beige'>
      <Link href={`/users/${post?.username}`}>
        <img
          src={post?.profileImg}
          alt='user-img'
          className='h-11 w-11 rounded-full mr-4'
        />
      </Link>
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-xs truncate max-w-32'>
              {post?.name}
            </h4>
            <span className='text-xs truncate max-w-32'>@{post?.username}</span>
            <span className='text-xl text-gray-700'>·</span>
            <span className='text-xs text-gray-700 flex-1 truncate max-w-32'>
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
          <HiDotsHorizontal className='text-sm' />
        </div>
        <Link href={`/posts/${post?._id}`}>
          <p className='text-black text-sm my-3 w-full'>{post?.text}</p>
        </Link>
        <Link href={`/posts/${post?._id}`}>
          <img src={post?.image} className='rounded-2xl mr-2' />
        </Link>
        <Icons post={post} id={post._id} />
      </div>
    </div>
  );
}