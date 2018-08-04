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
                expect(resp.body).to.be.an('array');
                done();
            });
    });

    it('should create book', (done) => {
        request(app)
            .post('/api/authors')
            .send({
                name: 'name',
                surname: 'surname'
            })
            .set('Accept', 'application/json')
            .end((err, resp) => {
                const author = resp.body;
                request(app)
                    .post('/api/categories')
                    .send({
                        name: 'category',
                    })
                    .end((err, resp) => {
                        const category = resp.body;
                        request(app)
                            .post('/api/books')
                            .send({
                                title: 'title',
                                description: 'description',
                                available: true,
                                category: category._id,
                                author: author._id
                            })
                            .end((err, resp) => {
                                expect(resp.body.title).to.equal('title');
                                done();
                            });
                    });
            });
    });

    it('should delete book', (done) => {
        request(app)
            .get('/api/books')
            .set('Accept', 'application/json')
            .end((err, resp) => {
                const book = resp.body[0];
                request(app)
                    .delete(`/api/books/${book._id}`)
                    .end((err, resp) => {
                        expect(resp.body).property('title').eq(book.title);
                        done();
                    });
            });
    });

    it('should update book', (done) => {
        request(app)
            .get('/api/books')
            .set('Accept', 'application/json')            
            .end((err, resp) => {
                const book = resp.body[0];
                request(app)
                    .put(`/api/books/${book._id}`)
                    .send({
                        title: 'newTitle',
                    })
                    .end((err, resp) => {
                        expect(resp.body.title).to.equal('newTitle');
                        done();
                    });
            });
    });
});
