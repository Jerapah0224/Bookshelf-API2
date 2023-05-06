const { 
    addBookHandler, 
    getAllBookHandler, 
    getDetailBookByIdHandler, 
    editBookByIdHandler, 
    deleteBookByIdHandler, } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },

    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },

    {
        method: 'GET',
        path: '/books/{Id}',
        handler: getDetailBookByIdHandler,
    },

    {
        method: 'PUT',
        path: '/books/{Id}',
        handler: editBookByIdHandler,
    },

    {
        method: 'DELETE',
        path: '/books/{Id}',
        handler: deleteBookByIdHandler,
    }
];

module.exports = routes;