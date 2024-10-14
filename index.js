import connection_db from './database/connectionDb.js'
import bookModel from './models/bookModel.js'
import express from 'express'
import bookRouter from './routes/routes.js'
import cors from 'cors'

export const app = express()
app.use(express.json())
app.use(cors())
app.get('/Hola', (req, res) => {
    res.send('Hola primera API')
})

app.use('/books', bookRouter)

// Mueve la lógica de inicio del servidor a `startServer` y retorna la instancia del servidor
export const startServer = async () => {
    try {
        await connection_db.authenticate() // Conexión a la base de datos
        console.log('Conexión exitosa 🚀')

        await bookModel.sync({ force: false }) // Sincroniza el modelo de libros
        console.log('La tabla fue creada con éxito')

        // Inicia el servidor y devuelve la instancia
        const server = app.listen(8080, () => {
            console.log('Servidor levantado en http://localhost:8080')
        })

        return server // Retorna la instancia del servidor
    } catch (error) {
        console.error('Conexión fallida 🚫', error)
    }
}