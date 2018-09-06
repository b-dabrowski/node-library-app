/* eslint no-undef: 0 */
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server');

describe('[Users]', () => {
    it('should register user', (done) => {
        request(app)
            .post('/api/users')
            .send({
                user: {
                    username: 'user01',
                    password: 'test01'
                }
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                expect(resp.body.user).has.property('token');
                done();
            });
    });

    it('should signin user', (done) => {
        request(app)
            .post('/auth/signin')
            .send({
                user: {
                    username: 'user01',
                    password: 'test01'
                }
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                expect(resp.body.user).has.property('token');
                done();
            });
    });
});
