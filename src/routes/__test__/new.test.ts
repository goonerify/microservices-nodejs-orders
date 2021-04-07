// TODO: Write tests to ensure the user is authenticated, body has valid ticket id etc

import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

const createOrder = () => {
  return request(app).post("/api/orders").set("Cookie", global.signin()).send({
    title: "asldkf",
    price: 20,
  });
};

it("cannot be accessed if the user is not signed in", async () => {
  request(app).post("/api/orders").send({}).expect(401);
});

it("cannot be accessed if an invalid ticket id is provided", async () => {
  request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({
      ticketId: "asldkf",
    })
    .expect(400);
});

it("returns an error if the ticket does not exist", async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {});

it("reserves a ticket", async () => {});
