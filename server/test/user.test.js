const jwt = require('jsonwebtoken');
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/User');

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
     _id: userOneId,
     name: 'Burger King',
     email: 'BurgerKing@yahoo.com',
     password: 'worddomination',
     tokens: [{
          token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
     }]
}

beforeEach(async () => {
     await User.deleteMany();
     await new User(userOne).save()
})

test('Should sign up a new user', async () => {
     await request(app).post("/users").send({
          name: 'Waffle House',
          email: 'Wafflehouse@yahoo.com',
          password: 'worddomination'
     }).expect(201)
})


test('Should login a new user', async () => {
     await request(app).post("/users/login").send({
          email: userOne.email,
          password: userOne.password
     }).expect(200)
})

test('Shouldnt login a nonexsistent user', async () => {
     await request(app).post("/users/login").send({
          email: "fadsfadf",
          password: "adsfadsf23fsf"
     }).expect(400)
})

test('Should get authenticated profile for user', async () => {
     await request(app)
          .get("/users/me")
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .send()
          .expect(200)
})

test('Should not get unauthenticated profile for user', async () => {
     await request(app)
          .get("/users/me")
          .send()
          .expect(401)
})


test('Should delete authenticated profile for user', async () => {
     await request(app)
          .delete("/users/me")
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .send()
          .expect(200)
})

test('Should not delete unauthenticated profile for user', async () => {
     await request(app)
          .delete("/users/me")
          .send()
          .expect(401)
})

test('Should upload avatar image for user', async () => {
     await request(app)
          .post("/users/me/avatar")
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .attach('avatar', 'test/fixture/profile-pic.jpg')
          .expect(200)
     const user = await User.findById(userOneId);
     expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid fields for the user', async () => {
     await request(app)
          .patch('/users/me')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .send({
               name: 'Jess'
          })
          .expect(200)
     const user = await User.findById(userOneId);
     expect(user.name).toEqual('Jess')
})

test('Should not update valid fields for the user', async () => {
     await request(app)
          .patch('/users/me')
          .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
          .send({
               location: 'philly'
          })
          .expect(400)
})