import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import eventInterface from "../../../@shared/event/event.interface";

export default class LoggingWhenCustomerAddressChangedHandler implements EventHandlerInterface
{
  handle(event: eventInterface): void {
      throw new Error("Method not implemented.");
  }
  
  handler(event: eventInterface): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    )
  }
}