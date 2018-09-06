const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

describe('[Authors]', () => {
  it('should get all authors', (done) => {
    request(app)
      .get('/api/authors')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body.authors).to.be.an('array');
        done();
      });
  });

  it('should create author', (done) => {
    request(app)
      .post('/api/authors')
      .send({
        name: 'testName',
        surname: 'testSurName',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, resp) => {
        expect(resp.body).to.be.an('object');
        expect(resp.body).has.property('name');
        expect(resp.body).property('name').eq('testName');
        done();
      });
  });

  it('should add author to req', (done) => {
    request(app)
      .post('/api/authors')
      .send({
        name: 'authorInRequest',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const author = resp.body;
        request(app)
          .get(`/api/authors/${author._id}`)
          .end((err, resp) => {
            expect(resp.body.author).property('name').eq('authorInRequest');
            done();
          });
      });
  });

  it('should delete author', (done) => {
    request(app)
      .post('/api/authors')
      .send({
        name: 'authorToDelete',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const author = resp.body;
        request(app)
          .delete(`/api/authors/${author._id}`)
          .end((err, resp) => {
            expect(resp.body).property('name').eq('authorToDelete');
            expect(resp.body).to.eql(author);
            done();
          });
      });
  });

  it('should update author', (done) => {
    request(app)
      .post('/api/authors')
      .send({
        name: 'authorToUpdate',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const author = resp.body;
        request(app)
          .put(`/api/authors/${author._id}`)
          .send({
            name: 'newAuthorName',
          })
          .end((err, resp) => {
            expect(resp.body.name).to.equal('newAuthorName');
            done();
          });
      });
  });

  it('should set Unknown if user dont set name and surname for author', (done) => {
    request(app)
      .post('/api/authors')
      .send({})
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const author = resp.body;
        request(app)
          .get(`/api/authors/${author._id}`)          
          .end((err, resp) => {
            expect(resp.body.author.name).to.equal('Unknown');
            done();
          });
      });
  });
});
