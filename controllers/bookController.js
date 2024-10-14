import bookModel from '../models/bookModel.js'

// Controlador para obtener todos los libros
export const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.findAll() // Obtiene todos los libros de la base de datos
        res.json(books) // Envía los libros como respuesta JSON
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los libros',
            error: error.message,
        })
    }
}

// Controlador para crear un libro
export const createBook = async (req, res) => {
    try {
        const { bookTitle, authorName, description } = req.body

        const newBook = await bookModel.create({ bookTitle, authorName, description }) // Crea el libro en la base de datos

        res.status(201).json(newBook) // Respuesta con el libro creado
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear el libro',
            error: error.message,
        })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        await bookModel.destroy({
            where: {
                id,
            },
        })
        // Cambio aquí: enviar código 200 y un mensaje en el cuerpo de la respuesta
        res.status(200).json({ message: 'Book deleted successfully' })
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el libro',
            error: error.message,
        })
    }
}