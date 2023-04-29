import Customer from "../../entity/customer"
import Address from "../../value-object/address"
import CustomerCreatedEvent from "../customer-created-event"
import FirstLoggingWhenCustomerCreatedHandler from "./first-logging-when-customer-created-handler"
import LoggingWhenCustomerAddressChangedHandler from "./logging-when-customer-address-changed-handler"
import SecondLoggingWhenCustomerCreatedHandler from "./second-logging-when-customer-created-handler"

describe('Customer handler tests', () => {
    let spyConsoleLog: any
  
    beforeEach(() => {
      spyConsoleLog = jest.spyOn(console, 'log')
    })
  
    afterEach(() => {
      spyConsoleLog.mockRestore()
    })
  
    it('should run the first log', () => {
      const customer = new Customer('1', 'Customer 1')
      const customerCreatedEvent = new CustomerCreatedEvent(customer)
  
      new FirstLoggingWhenCustomerCreatedHandler().handler(customerCreatedEvent)
  
      expect(spyConsoleLog).toHaveBeenCalledWith(
        'Esse é o primeiro console.log do evento: CustomerCreated'
      )
    })
  
    it('should run the second log', () => {
      const customer = new Customer('1', 'Customer 1')
      const customerCreatedEvent = new CustomerCreatedEvent(customer)
  
      new SecondLoggingWhenCustomerCreatedHandler().handler(customerCreatedEvent)
  
      expect(spyConsoleLog).toHaveBeenCalledWith(
        'Esse é o segundo console.log do evento: CustomerCreated'
      )
    })
  
    it('should run log when address changed', () => {
      const customer = new Customer('1', 'Customer 1')
      const address = new Address('Street 1', 123, '12345-678', 'São Paulo')
      customer.changeAddress(address)
      const customerCreatedEvent = new CustomerCreatedEvent({
        id: customer.id,
        name: customer.name,
        address: customer.Address.toString(),
      })
  
      new LoggingWhenCustomerAddressChangedHandler().handler(
        customerCreatedEvent
      )
  
      expect(spyConsoleLog).toHaveBeenCalledWith(
        `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.Address.toString()}`
      )
    })
  })