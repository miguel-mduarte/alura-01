import fs from 'fs';
import { getAllPosts, criarPost, atlPost } from '../models/postModel.js';
import gerarDescricaoComGemini from '../sevices/geminiService.js';

export async function listarPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);  
}

export async function postarPost(req, res) {
    const novoPost = req.body;  
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.messege);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
}

export async function imgUpload(req, res) {
    const novoPost = {
        _desc: "",
        _imgUrl: req.file.originalname,
        _alt: ""
    };  
    
    try {
        const postCriado = await criarPost(novoPost);
        const atlImg = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, atlImg);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.messege);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
}

export async function atlNewPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;
    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            _imgUrl: urlImg,
            _desc: descricao,
            _alt: req.body.alt
        }
        const postCriado = await atlPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.messege);
        res.status(500).json({"Erro" : "Falha na requisição"});
    }
}