const { nanoid } = require('nanoid');

const books = require('./books');

const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    // const id = nanoid(16);
    // const insertedAt = new Date().toISOString();
    // const updatedAt = insertedAt;
    // const finished = (pageCount === readPage);
    //  const newBuku = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }
    const id = nanoid(16);
    const finished = (pageCount === readPage);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBuku={id,name,year,author,summary,publisher,pageCount,readPage,reading,finished,insertedAt,updatedAt}
    books.push(newBuku);
    
    const isSuces = books.filter((book) => book.id === id).length > 0;
    

    if (isSuces) {
        const respon = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            }
        });
        respon.code(201);
        return respon;
    }

    const respon = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response;

};

const getAllBooks = (request, h) => {
    
    const { name, reading, finished } = request.query;
    if (name !== undefined) {
        const response = h
            .response({
                status: 'success',
                data: {
                    books: books.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }))
                }
            }).code(200);
        return response;
    }
    if (reading !== null) {
        const response = h
            .response({
                status: 'success',
                data: {
                    books: books.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }))
                }
            }).code(200);
        return response;
    }
    if (finished !== null) {
        const response = h
            .response({
                status: 'success',
                data: {
                    books: books.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }))
                }
            }).code(200);
        return response;
    }

    if (name) {
        const filterbook = books.filter((book) => {
            const namee = new RegExp(name, 'gi');
            return namee.test(book.name);
            
        });

        const response = h
            .response({
                status: 'success',
                data: {
                    books: filterbook.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }))
                }
            }).code(200);
        return response;
    }

    if (reading) {
        const ReadingFilter = books.filter((book) => Number(book.reading) === Number(reading))
        
        const response = h
            .response({
                status: 'success',
                data: {
                    books: ReadingFilter.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }))
                }
            }).code(200);
        return response;
    }

    if (finished) {
        const FinishedFilter = books.filter((book) => Number(book.finished))
        
        const response = h
            .response({
                status: 'success',
                data: {
                    books: FinishedFilter.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }))
                }
            }).code(200);
        return response;
    }

       
}

const getBookById =(request, h) => {

    const { bookId } = request.params;
    const book = books.filter((bk) => bk.id === bookId)[0];

    if (book) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            }
        }).code(200)
        return response
    }
    // if (book !== undefined) {
    //     return {
    //         status: 'success',
    //         data: {
    //             book,
    //         },
    //     }
    // }
    
    
    const response = h
        .response({
            status: "fail",
            message: "Buku tidak ditemukan"
        })
        .code(404);

       return response;
 
    
}

const editBuku = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary,  readPage, reading,publisher, pageCount, } = request.payload;
    //const index = books.findIndex((bk) => bk.id === id);

    if (name == undefined) {
        const respon = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
        return respon;
    }

    if (pageCount < readPage) {
        const respon = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
        return respon;
    }

    const finished = (pageCount === readPage);
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((bk) => bk.id === id);

    if (index !== -1) {
        const respon = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'

        }).code(200);
        return respon;
        books[index] = {
            ...books[index],name,year,author,summary,publisher,pageCount,readPage,reading,finished,updatedAt
        }
    }

    // const finished = pageCount === readPage;
    // const updatedAt = new Date().toISOString();
    // const index = books.findIndex((bk) => bk.id === id);
    
    // books[index] = {
    //     ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading,finished,updatedAt
    // }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',

    }).code(404);

    return response;

}

const hapusBuku = (request, h) => {
    const { id } = request.params;

    const idx = books.findIndex((buku) => buku.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        const respon = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
        return respon;
    }
    const respon = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
    return respon;
}


module.exports = { addBook,getAllBooks, getBookById , editBuku,hapusBuku};