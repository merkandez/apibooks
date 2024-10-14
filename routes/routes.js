import express from 'express'
import {
    getAllBooks,
    createBook,
    deleteBook,
} from '../controllers/bookController.js'

const bookRouter = express.Router()

bookRouter.get('/', getAllBooks)

bookRouter.post('/', createBook)

bookRouter.delete('/:id', deleteBook)

export default bookRouter