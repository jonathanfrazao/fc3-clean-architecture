import EventHandlerInterface from "../../../@shared/event/event-handler.interface"
import eventInterface from "../../../@shared/event/event.interface"


export default class FirstLoggingWhenCustomerCreatedHandler implements EventHandlerInterface
{
    handle(event: eventInterface): void {
        throw new Error("Method not implemented.")
    }
    
    handler(event: eventInterface): void {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated')
    }
}