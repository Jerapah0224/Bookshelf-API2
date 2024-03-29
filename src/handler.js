const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading,} = request.payload;

    if(!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if(readPage>pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const finished = pageCount == readPage ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook ={
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).legth > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan'
    })
    response.code(500);
    return response;

    
};

const getAllBookHandler = (request, h) => {
    const {name, reading, finished} = request.query;

    if(books.length > 0) {
        let booksWithFilter = books;

        if(name) {
            booksWithFilter = bookdWithFilter.filter((book) => books.name.toLowerCase(). includes(name.toLowerCase()));
        }

        if(reading) {
            booksWithFilter = bookdWithFilter.filter((book) => books.reading == Number(reading));
        }

        if(finished) {
            booksWithFilter = bookdWithFilter.filter((book) => books.finished == Number(finished));
        }

        const response = h.response({
            status: 'success',
            data: {
                books: booksWithFilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        });
    }else {
        const response = h.response({
            status: 'success',
            data: {
                books: [],
             }
        });
        response.code(200);
        return response;
    }
};

const getDetailBookByIdHandler = (request, h) => {
    const {Id} = request.params;

    const book = books.filter((book) => book.bookId === bookId)[0];

    if(book) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookByIdHandler = (request, h) => {
    const {Id} = request.params;

    const {name, year, author, summary, publisher, pageCount, readPage, reading,} = request.params;
// const updatedAt = new Date().toISOString(); jangan lupa -------------------------------------------------------------------------------------------------------------------
    const index = books.findIndex((book) => book.bookId === bookId);

    if(index !== -1) {
        if(!name) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        if(readPage>pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        const finished = pageCount == readPage ? true : false;
        const updatedAt = new Date().toISOString();
        books[index] = {...books[index],name, year, author, summary, publisher, pageCount, readPage, reading,};
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const {Id} = request.params;

    const index = books.findIndex((book) => book.bookId === bookId);

    if(index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {addBookHandler, getAllBookHandler, getDetailBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler, };