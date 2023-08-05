const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const app = require("../../app");

const { CONNECT_TEST, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(
    () =>
      (server = app.listen(PORT, () => {
        console.log(`Server running. Use our API on port`);
      }))
  );
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(CONNECT_TEST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection("users", () => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route_statusCode", async () => {
    const hashPassword = await bcrypt.hash("dilansangster123", 10);
    const newUser = {
      name: "Veronika Didun",
      email: "veronikanof909@gmail.com",
      password: hashPassword,
      subscription: "starter",
      token: "",
      avatarURL: "123456",
      verify: true,
      verificationToken: "123456",
    };

    await User.create(newUser);

    const loginUser = {
      email: "veronikanof909@gmail.com",
      password: "dilansangster123",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .on("error", (err) => {
        console.log(err);
      })
      .send(loginUser);

    expect(response.statusCode).toBe(200);
  });

  test("test login route_body.token ", async () => {
    const hashPassword = await bcrypt.hash("dilansangster123", 10);
    const newUser = {
      name: "Veronika Didun",
      email: "veronikanof909@gmail.com",
      password: hashPassword,
      subscription: "starter",
      token: "",
      avatarURL: "123456",
      verify: true,
      verificationToken: "123456",
    };

    await User.create(newUser);

    const loginUser = {
      email: "veronikanof909@gmail.com",
      password: "dilansangster123",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .on("error", (err) => {
        console.log(err);
      })
      .send(loginUser);

    const { _body } = response;
    expect(_body.token).toBeTruthy();
  });

  test("test login route_body.token_equal ", async () => {
    const hashPassword = await bcrypt.hash("dilansangster123", 10);
    const newUser = {
      name: "Veronika Didun",
      email: "veronikanof909@gmail.com",
      password: hashPassword,
      subscription: "starter",
      token: "",
      avatarURL: "123456",
      verify: true,
      verificationToken: "123456",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "veronikanof909@gmail.com",
      password: "dilansangster123",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .on("error", (err) => {
        console.log(err);
      })
      .send(loginUser);

    const { token } = await User.findById(user._id);
    const { _body } = response;
    expect(_body.token).toBe(token);
  });
});