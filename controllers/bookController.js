import bookModel from '../models/bookModel.js';

// Controlador para obtener todos los libros
export const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.findAll(); // Obtiene todos los libros de la base de datos
    res.json(books); // Envía los libros como respuesta JSON
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los libros',
      error: error.message,
    });
  }
};

// Controlador para crear un libro
export const createBook = async (req, res) => {
  try {
    const { bookTitle, authorName, description } = req.body;

    const newBook = await bookModel.create({
      bookTitle,
      authorName,
      description,
    }); // Crea el libro en la base de datos

    res.status(201).json(newBook); // Respuesta con el libro creado
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear el libro',
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await bookModel.destroy({
      where: {
        id,
      },
    });
    // Cambio aquí: enviar código 200 y un mensaje en el cuerpo de la respuesta
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el libro',
      error: error.message,
    });
  }
};

// Controlador para actualizar un libro con save
//
// export const updateBook = async (req, res) => {
//     try {
//       const { id } = req.params; // ID enviado en la URL
//       const { bookTitle, authorName, description } = req.body; // Nuevos datos enviados desde el cliente
//       const book = await bookModel.findByPk(id);

//       if (!book) {
//         return res.status(404).json({ error: 'Book no encontrado' });
//       }
//       book.bookTitle = bookTitle;
//       book.authorName = authorName;
//       book.description = description;

//       await book.save(); // Guarda los cambios en la base de datos

//       res.status(200).json(book); // Respuesta con el book actualizado
//     } catch (error) {
//       res.status(500).json({
//         error: 'Error al actualizar el book ☠️☠️☠️',
//         detalles: error.message,
//       });
//     }
//   };

// Controlador para actualizar un libro con update
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params; // ID enviado en la URL
    const { bookTitle, authorName, description } = req.body; // Nuevos datos enviados desde el cliente
   
   // Actualizar el libro directamente
   const updatedBook = await bookModel.update(
    { bookTitle, authorName, description }, // Datos a actualizar
    { where: { id } } // Condición de actualización
  );

    if (!updatedBook[0]) {
      return res.status(404).json({ error: 'Book no encontrado' });
    }

    const book = await bookModel.findByPk(id); // Guarda los cambios en la base de datos

    res.status(200).json(book); // Respuesta con el book actualizado
  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar el book ☠️☠️☠️',
      detalles: error.message,
    });
  }
};

// Obtener un book por ID
// export const getBookById = async (req, res) => {
//     try {
//       const { id } = req.params; // ID enviado en la URL
//       const book = await bookModel.findByPk(id); // Busca el book por su clave primaria (ID)
//       if (!book) {
//         return res.status(404).json({ error: 'Book no encontrado' });
//       }
//       res.status(200).json(book); // Respuesta con el book encontrado
//     } catch (error) {
//       res.status(500).json({
//         error: 'Error al obtener el book ☠️☠️☠️',
//         detalles: error.message,
//       });
//     }
//   };
