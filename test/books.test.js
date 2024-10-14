import request from 'supertest';
import { app, startServer } from '../index.js';
import connection_db from '../database/connectionDb.js';
import bookModel from '../models/bookModel.js'; // Asegúrate de importar el modelo de libro correctamente

let server;

describe('CRUD Books', () => {
  beforeAll(async () => {
    server = await startServer(); // Inicia el servidor antes de ejecutar las pruebas
  });
  test('should return a response with status 200 and type json', async () => {
    const response = await request(app).get('/books'); // Prueba de obtener todos los libros

    expect(response.status).toBe(200); // Verifica el estado 200
    expect(response.type).toBe('application/json'); // Verifica que el tipo sea JSON
  });

  test('should create a book', async () => {
    const bookData = {
      bookTitle: 'Test title',
      authorName: 'Test Author',
      description: 'This is a test description',
    };

    const response = await request(app).post('/books').send(bookData); // Prueba de creación de un libro

    expect(response.statusCode).toBe(201); // Verifica que el código de estado sea 201 (creado)
    expect(response.body.bookTitle).toBe(bookData.bookTitle); // Verifica que el título coincida
    expect(response.body.authorName).toBe(bookData.authorName); // Verifica que el autor coincida
    expect(response.body.description).toBe(bookData.description); // Verifica que la descripción coincida
  });

  test('should delete a book', async () => {
    const book = await bookModel.create({
      bookTitle: 'Test title',
      authorName: 'Test Author',
      description: 'This is a delete test',
    });

    const response = await request(app).delete(`/books/${book.id}`); // Corrige la sintaxis de la plantilla de cadena

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Book deleted successfully');
  });

  // Test para la petición PUT (actualización)
  test('should update a meme and return it with status 200', async () => {
    // Crear un meme usando el modelo directamente
    const bookToUpdate = await bookModel.create({
      bookTitle: 'Test title',
      authorName: 'Test Author',
      description: 'Test description',
    });

    // Datos actualizados
    const updatedBook = {
      bookTitle: 'Updated Book',
      authorName: 'Updated Author',
      description: 'This is a updated description',
    };

    // Actualizamos el meme
    const response = await request(app)
      .put(`/books/${bookToUpdate.id}`)
      .send(updatedBook);
    expect(response.statusCode).toBe(200);
    expect(response.body.bookTitle).toBe(updatedBook.bookTitle);
    expect(response.body.authorName).toBe(updatedBook.authorName);
    expect(response.body.description).toBe(updatedBook.description);
  });

  test('should return 404 if book is not found for updating', async () => {
    const updatedBook = {
      bookTitle: 'Updated Book',
      authorName: 'Updated Author',
      description: 'This is a updated description',
    };

    const response = await request(app).put('/books/999').send(updatedBook);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Book no encontrado');
  });
});
// // Test para la petición GET con un ID
// test('should return a response with status 200 and type JSON for a specific meme', async () => {
//   // Crear un meme usando el modelo directamente
//   const createdMeme = await MinionModel.create({
//     nombre: 'Test Meme for GET by ID',
//     descripcion: 'Test description',
//     url: 'http://example.com/meme.png',
//   });

//   // Ahora hacer GET por ID
//   const response = await request(app).get(`/memes/${createdMeme.id}`);
//   expect(response.statusCode).toBe(200);
//   expect(response.body.id).toBe(createdMeme.id);
//   expect(response.headers['content-type']).toContain('application/json');
// });

// test('should return 404 if meme is not found', async () => {
//   const response = await request(app).get('/memes/999'); // ID que no existe
//   expect(response.statusCode).toBe(404);
//   expect(response.body.error).toBe('Meme no encontrado');
// });

afterAll(async () => {
  await server.close(); // Cierra el servidor al final de las pruebas
  await connection_db.close(); // Cierra la conexión con la base de datos
});
afterEach(async () => {
  await bookModel.destroy({ where: {} }); // Elimina todos los libros después de cada prueba
});
