import express from "express"
import blogPostModel from "./schema.js"
import createHttpError from "http-errors"

const blogPostsRouter = express.Router()

blogPostsRouter.get("/", async (req,res,next)=>{
    try {
        const blogPosts = await blogPostModel.find({})
        res.send(blogPosts)
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.get("/:blogPostId", async (req,res,next)=>{
    try {
        const paramsID = req.params.blogPostId
        const blogPost = await blogPostModel.findById(paramsID)
        if (blogPost) {
            res.send(blogPost)
        } else {
            next(createHttpError(404, `User with id ${paramsID} not found`))
        }
    } catch (error) {
         next(error)
    }
})

blogPostsRouter.post("/", async (req,res,next)=>{
    try {
        const newBlogPost = new blogPostModel(req.body)
        const { _id } = await newBlogPost.save()
        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.put("/:blogPostId", async (req,res,next)=>{
    try {
        const paramsID = req.params.blogPostId
        const upBlogPost = await blogPostModel.findByIdAndUpdate(paramsID, req.body, {new: true})
        if (upBlogPost) {
            res.send(upBlogPost)
        } else {
            next(createHttpError(404, `User with id ${paramsID} not found`))
        }
    } catch (error) {
        next(error)
    }
})

blogPostsRouter.delete("/:blogPostId", async (req,res,next)=>{
    try {
        const paramsID = req.params.blogPostId
        const delBlogPost = await blogPostModel.findByIdAndDelete(paramsID)
        if (delBlogPost) {
            res.status(204).send(delBlogPost)
        } else {
            next(createHttpError(404, `User with id ${paramsID} not found`))
        }
    } catch (error) {
        next(error)
    }
})

export default blogPostsRouter