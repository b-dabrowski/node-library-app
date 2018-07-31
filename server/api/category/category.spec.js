const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

describe('[Category]', () => {
  it('should get all categories', (done) => {
    request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, resp) => {
        expect(resp.body).to.be.an('array');
        done();
      });
  });

  it('should create category', (done) => {
    request(app)
      .post('/api/categories')
      .send({
        name: 'testCategory',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, resp) => {
        expect(resp.body).to.be.an('object');
        expect(resp.body).has.property('name');
        expect(resp.body).property('name').eq('testCategory');
        done();
      });
  });

  it('should add category to req', (done) => {
    request(app)
      .post('/api/categories')
      .send({
        name: 'categoryInRequest',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const category = resp.body;
        request(app)
          .get(`/api/categories/${category._id}`)
          .end((err, resp) => {
            expect(resp.body).property('name').eq('categoryInRequest');
            done();
          });
      });
  });

  it('should delete category', (done) => {
    request(app)
      .post('/api/categories')
      .send({
        name: 'categoryToDelete',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const category = resp.body;
        request(app)
          .delete(`/api/categories/${category._id}`)
          .end((err, resp) => {
            expect(resp.body).property('name').eq('categoryToDelete');
            expect(resp.body).to.eql(category);
            done();
          });
      });
  });

  it('should update category', (done) => {
    request(app)
      .post('/api/categories')
      .send({
        name: 'categoryToUpdate',
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const category = resp.body;
        request(app)
          .put(`/api/categories/${category._id}`)
          .send({
            name: 'newCategoryName',
          })
          .end((err, resp) => {
            expect(resp.body.name).to.equal('newCategoryName');
            done();
          });
      });
  });
});
