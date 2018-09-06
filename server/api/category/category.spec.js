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
        expect(resp.body.categories).to.be.an('array');
        done();
      });
  });

  it('should create category', (done) => {
    request(app)
      .post('/api/users')
      .send({
        user: {
          username: 'userCategory01',
          password: 'testCategory01'
        }
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const token = resp.body.user.token;

        request(app)
          .post('/api/categories')
          .send({
            name: 'testCategory',
          })
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, resp) => {
            expect(resp.body).to.be.an('object');
            expect(resp.body).has.property('name');
            expect(resp.body).property('name').eq('testCategory');
            done();
          });
      });
  });

  it('should add category to req', (done) => {
    request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const category = resp.body.categories[0];
        request(app)
          .get(`/api/categories/${category._id}`)
          .end((err, resp) => {
            expect(resp.body.category).property('name').eq(category.name);
            done();
          });
      });
  });

  it('should delete category', (done) => {
    request(app)
      .post('/api/users')
      .send({
        user: {
          username: 'userCategory02',
          password: 'testCategory02'
        }
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const token = resp.body.user.token;

        request(app)
          .get('/api/categories')
          .set('Accept', 'application/json')
          .end((err, resp) => {
            const category = resp.body.categories[0];
            request(app)
              .delete(`/api/categories/${category._id}`)
              .set('Authorization', token)
              .end((err, resp) => {
                expect(resp.body).property('name').eq(category.name);
                expect(resp.body).to.eql(category);
                done();
              });
          });
      });
  });  

  it('should update category', (done) => {
    request(app)
      .post('/api/users')
      .send({
        user: {
          username: 'userCategory03',
          password: 'testCategory03'
        }
      })
      .set('Accept', 'application/json')
      .end((err, resp) => {
        const token = resp.body.user.token;

        request(app)
          .get('/api/categories')
          .set('Accept', 'application/json')
          .end((err, resp) => {
            const category = resp.body.categories[0];
            request(app)
              .put(`/api/categories/${category._id}`)
              .send({
                name: 'newCategoryName',
              })
              .set('Authorization', token)
              .end((err, resp) => {
                expect(resp.body.name).to.equal('newCategoryName');
                done();
              });
          });
      });
  });
});