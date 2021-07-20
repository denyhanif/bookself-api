const {addBook,getAllBooks, getBookById, editBuku, hapusBuku} = require ('./handler')
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler : addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler : getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookById
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBuku
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: hapusBuku
    }
    
];
module.exports = routes;