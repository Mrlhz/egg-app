'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/ctx', controller.home.see);
  router.get('/ua', controller.home.ua);
  router.get('/news', controller.news.list);
  router.get('/books', controller.books.index);
  router.post('/books/search', controller.books.search);
  router.get('/books/:isbn/detail', controller.books.detail);
  // router.get('/search', controller.books.search);
  router.get('/isbn/:isbn', controller.books._isbn);
  router.get('/tags', controller.bookTags.getBookTags);
  router.get('/goods', controller.home.goods);

  // api
  router.get('/v1/books', controller.books.getBooks);
  router.get('/v1/books/search', controller.books.searchBooks);
  router.get('/v1/books/:isbn', controller.books.getBookDetail);
};
