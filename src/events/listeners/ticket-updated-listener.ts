import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@oldledger/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      // Note that this throws an error not just because a ticket with id was
      // not found, but also when a ticket with appropriate version was not found
      console.log("TICKET NOT FOUND");
      // throw new Error("Ticket not found");
      return;
    }

    const { title, price } = data;
    ticket.set({ title, price });
    // Note that the update-if-current plugin will update the version
    // when this record is saved to the database
    await ticket.save();

    msg.ack();
  }
}
