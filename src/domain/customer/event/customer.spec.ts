import Customer from "../entity/customer"
import CustomerChangedAddressEvent from "./customer-changed-address-event"
import CustomerCreatedEvent from "./customer-created-event"


describe('Customer event tests', () => {
  it('should run log when client event constructor is called', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerCreatedEvent(customer)

    expect(customerCreatedEvent.eventData).toStrictEqual(customer)
    expect(customerCreatedEvent.dataTimeOccurred).toBeInstanceOf(Date)
  })

  test('should run log when address change event constructor is called', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerChangedAddressEvent(customer)

    expect(customerCreatedEvent.eventData).toStrictEqual(customer)
    expect(customerCreatedEvent.dataTimeOccurred).toBeInstanceOf(Date)
  })
})