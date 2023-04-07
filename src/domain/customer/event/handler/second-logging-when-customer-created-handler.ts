import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import eventInterface from "../../../@shared/event/event.interface";


export default class SecondLoggingWhenCustomerCreatedHandler implements EventHandlerInterface
{
    handle(event: eventInterface): void {
        throw new Error("Method not implemented.");
    }
    
    handler(event: eventInterface): void {
        console.log('Esse é o segundo console.log do evento: CustomerCreated')
    }
}