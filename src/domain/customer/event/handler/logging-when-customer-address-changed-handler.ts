import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import eventInterface from "../../../@shared/event/event.interface";
import CustomerChangedAddressEvent from "../customer-changed-address-event";

export default class LoggingWhenCustomerAddressChangedHandler implements EventHandlerInterface<CustomerChangedAddressEvent>
{
  handle(event: CustomerChangedAddressEvent): void {
      throw new Error("Method not implemented.");
  }
  
  handler(event: CustomerChangedAddressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    )
  }
}