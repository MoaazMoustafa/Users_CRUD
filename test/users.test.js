const { expect } = require('chai');

const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

describe('userController', () => {
    describe('POST /users', () => {

        before(async () => {
            const user = new User({
                email: "existinguser@test.com",
                password: "fasdflka;dsjflpadsjfla;ksdfjasdf",
                fullName: "existingUser"
            })
            user.save();
        })

        after(async () => {
            await User.findOneAndDelete({ email: "newuser@test.com" })
            await User.findOneAndDelete({ email: "existinguser@test.com" })
        });

        it('should create a new user with valid data', async () => {
            const email = 'newUser@test.com';
            const name = 'newUser';
            const password = 'password123';
            const country = 'Egypt';
            const mobile = '01023720099';
            const age = '29';

            const res = await request(app)
                .post('/api/users/signup')
                .send({ email, name, password, passwordConfirmation: password, country, mobile, age });

            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('userId');
            expect(res.body).to.have.property('message', "user created successfuly");
        });

        it('should return an error message if email is already taken', async () => {
            const email = 'existinguser@test.com';
            const name = 'existingUser';
            const password = 'fasdflka;dsjflpadsjfla;ksdfjasdf';

            const res = await request(app)
                .post('/api/users/signup')
                .send({ email, name, password, passwordConfirmation: password });
            expect(res.status).to.equal(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('errors');
        });

        it('should return an error message if email or password is missing', async () => {
            const email = '';
            const name = 'newUser';
            const password = 'password123';

            const res = await request(app)
                .post('/api/users/signup')
                .send({ email, name, password, passwordConfirmation: password });
            expect(res.status).to.equal(422);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('errors').to.be.an('array');
        });
    });
});