'use client';

import { useUser } from '@clerk/nextjs';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { useRef, useState, useEffect } from 'react';
import { app } from '../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export default function Input() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [text, setText] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const imagePickRef = useRef(null);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setSelectedFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleSubmit = async () => {
    setPostLoading(true);
    const response = await fetch('/api/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMongoId: user.publicMetadata.userMongoId,
        name: user.fullName,
        username: user.username,
        text,
        profileImg: user.imageUrl,
        image: imageFileUrl,
      }),
    });
    setPostLoading(false);
    setText('');
    setSelectedFile(null);
    setImageFileUrl(null);
    location.reload();
  };

  if (!isSignedIn || !isLoaded) {
    return null;
  }

  return (
    <div className='flex p-3 space-x-3 w-full bg-light-brown'>
      <img
        src={user.imageUrl}
        alt='user-img'
        className='h-11 w-11 rounded-full object-cover'
      />
      <div className='w-full border border-light-green bg-beige'>
        <textarea
          className=' ml-1 w-[660px] border-none outline-none tracking-wide min-h-[50px] text-gray-700 bg-beige'
          placeholder='Add your caption'
          rows='3'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {selectedFile && (
          <img
            onClick={() => {
              setSelectedFile(null);
              setImageFileUrl(null);
            }}
            src={imageFileUrl}
            alt='selected-img'
            className={`w-full max-h-[250px] object-cover cursor-pointer ${
              imageFileUploading ? 'animate-pulse' : ''
            }`}
          />
        )}
        <div className='flex items-center justify-between pt-2.5'>
          <HiOutlinePhotograph
            className='h-10 w-10 p-2 transition-transform duration-500 text-dark-green hover:scale-150 hover:text-light-green rounded-full cursor-pointer'
            onClick={() => imagePickRef.current.click()}
          />
          <input
            type='file'
            ref={imagePickRef}
            accept='image/*'
            hidden
            onChange={addImageToPost}
          />
          <button
            disabled={text.trim() === '' || postLoading || imageFileUploading}
            className='bg-light-brown text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50 mr-2 mb-2'
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
