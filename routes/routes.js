import express from 'express'
import {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook
} from '../controllers/bookController.js'

const bookRouter = express.Router()

bookRouter.get('/', getAllBooks)

bookRouter.post('/', createBook)

bookRouter.delete('/:id', deleteBook)

bookRouter.put('/:id', updateBook)

export default bookRouter