'use client';

import { useUser } from "@clerk/nextjs"
import { HiOutlinePhotograph } from "react-icons/hi"
import { useRef, useState, useEffect } from "react"
import { app } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function Input() {
    const { user, isSignedIn, isLoaded } = useUser();
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [text, setText] = useState('');
    const [postLoading, setPostLoading] = useState(false);
    const imagePickRef = useRef(null);

    if (!isSignedIn || !isLoaded) {
        return null;
    }

    const addImageToPost = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (selectedFile){
            uploadImageToStorage();
        }
    }, [selectedFile]);

    const uploadImageToStorage = async () => {
        setImageFileUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + selectedFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = 
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done')
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
                })
            }
        )
    }

    const handleSubmit = async () => {
        setPostLoading(true);
        const response = await fetch('api/post/create', {
            method: 'POST',
            header: {
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
        setText('')
        setSelectedFile(null);
        setImageFileUrl(null);
        // location.reload();
    }

    return (
        <div className="flex border-b border-gray-200 p-3 space-x w-full">
            <img
              src={user.imageUrl}
              alt='user-profile-photo'
              className="h-11 w-11 rounded-full cursor-pointer hover:brightness-90 object-cover mr-2"
            />
            <div className="w-full divide-y divide-gray-200">
                <textarea 
                  className="w-full border-none outline-none tracking-wide min-h-[50px] text-black bg-gray-200"
                  placeholder="Write a caption"
                  rows='2'
                  value={text}
                  onChange={(e) => {setText(e.target.value)}}
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
                <div className="flex items-center justify-between pt-2.5">
                    <HiOutlinePhotograph 
                      className="h-10 w-10 p-2 text-violet-500 hover:text-violet-700 rounded-full cursor-pointer"
                      onClick={() => imagePickRef.current.click()}
                    />
                    <input type='file' 
                      ref={imagePickRef}
                      accept="image/*"
                      hidden
                      onChange={addImageToPost}
                    />
                    <button 
                      disabled={ text.trim() === '' || postLoading || imageFileUploading }
                      className="bg-violet-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:bg-indigo-300 disabled:opacity-50"
                      onClick={handleSubmit}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}
