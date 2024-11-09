import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose.js";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req) => {
    const user = await currentUser();
    try {
        await connect();
        const data = await req.json();
        if (!user){
            return new Response('Unauthorized',{
                status: 401,
            });
        }
        const newPost = await Post.create({
            user: data.userMongoId,
            name: data.name,
            username: data.username,
            text: data.text,
            profileImg: data.profileImg,
            image: data.image,
        });
        await newPost.save();
        return new Response(JSON.stringify(newPost), {
            status:200
        });
    } catch (error) {
        console.log(error);
        return new Response('Error creating post', {
            status: 500
        });
    }
}