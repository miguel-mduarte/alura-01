import { getAllPosts } from '../models/postModel.js';

export async function listarPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);  
} 