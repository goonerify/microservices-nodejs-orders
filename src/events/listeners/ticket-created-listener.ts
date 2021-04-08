import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@oldledger/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  // msg contains the ack method that we use to acknowledge an
  // event after it has been successfully processed
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {}
}
