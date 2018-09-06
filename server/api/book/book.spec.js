/* eslint no-undef: 0 */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

describe('[Books]', () => {

    it('should get all books', (done) => {
        request(app)
            .get('/api/books')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                expect(resp.body.books).to.be.an('array');
                done();
            });
    });

    it('should delete book', (done) => {
        request(app)
            .post('/api/users')
            .send({
                user: {
                    username: 'userBook',
                    password: 'testBook'
                }
            })
            .set('Accept', 'application/json')
            .end((err, resp) => {
                const token = resp.body.user.token;

                request(app)
                    .get('/api/books')
                    .set('Accept', 'application/json')
                    .end((err, resp) => {
                        const book = resp.body.books[0];

                        request(app)
                            .delete(`/api/books/${book._id}`)
                            .set('Authorization', token)
                            .end((err, resp) => {
                                expect(resp.body).property('title').eq(book.title);
                                done();
                            });
                    });
            });
    });

    it('should update book', (done) => {
        request(app)
            .post('/api/users')
            .send({
                user: {
                    username: 'userBook01',
                    password: 'testBook01'
                }
            })
            .set('Accept', 'application/json')
            .end((err, resp) => {
                const token = resp.body.user.token;

                request(app)
                    .get('/api/books')
                    .set('Accept', 'application/json')
                    .end((err, resp) => {
                        const book = resp.body.books[0];

                        request(app)
                            .put(`/api/books/${book._id}`)
                            .send({
                                book: {
                                    title: 'newTitle',
                                    category: book.category._id,
                                    author: book.author._id,
                                    description: book.description,
                                }
                            })
                            .set('Authorization', token)
                            .end((err, resp) => {
                                expect(resp.body.book.title).to.equal('newTitle');
                                done();
                            });
                    });
            });
    });

    it('should create book', (done) => {
        request(app)
            .post('/api/users')
            .send({
                user: {
                    username: 'userBook02',
                    password: 'testBook02'
                }
            })
            .set('Accept', 'application/json')
            .end((err, resp) => {
                const token = resp.body.user.token;

                request(app)
                    .get('/api/books')
                    .set('Accept', 'application/json')
                    .end((err, resp) => {
                        const book = resp.body.books[0];

                        request(app)
                            .post('/api/books')
                            .send({
                                book: {
                                    title: 'title',
                                    description: 'description',
                                    available: true,
                                    category: book.category._id,
                                    author: book.author._id,
                                }
                            })
                            .set('Authorization', token)
                            .end((err, resp) => {
                                expect(resp.body.book.title).to.equal('title');
                                done();
                            });
                    });
            });
    });
});
