import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import eventInterface from "../../../@shared/event/event.interface";
import CustomerCreatedEvent from "../customer-created-event";


export default class SecondLoggingWhenCustomerCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>
{
    handle(event: CustomerCreatedEvent): void {
        throw new Error("Method not implemented.");
    }
    
    handler(event: CustomerCreatedEvent): void {
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}