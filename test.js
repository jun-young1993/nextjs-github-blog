// Single Responsibility Principle (SRP)
// 각 클래스는 하나의 책임만 가집니다.

// Order class is responsible for managing order details
class Order {
    constructor(items, total) {
        this.items = items;
        this.total = total;
    }
}

// OrderRepository class is responsible for saving orders to the database
class OrderRepository {
    save(order) {
        console.log('Order saved to the database:', order);
    }
}

// EmailService class is responsible for sending emails to customers
class EmailService {
    sendEmail(email, message) {
        console.log(`Email sent to ${email}: ${message}`);
    }
}

// Open/Closed Principle (OCP)
// PaymentProcessor 클래스는 확장에는 열려 있고 수정에는 닫혀 있습니다.

// PaymentProcessor interface
class PaymentProcessor {
    processPayment(amount) {
        throw new Error('Method not implemented');
    }
}

// PayPalPaymentProcessor class for processing PayPal payments
class PayPalPaymentProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing PayPal payment of ${amount}`);
    }
}

// CreditCardPaymentProcessor class for processing credit card payments
class CreditCardPaymentProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing credit card payment of ${amount}`);
    }
}

// Liskov Substitution Principle (LSP)
// 모든 PaymentProcessor의 서브 클래스는 PaymentProcessor를 대체할 수 있어야 합니다.

// This function can accept any subclass of PaymentProcessor
function processOrder(paymentProcessor, amount) {
    paymentProcessor.processPayment(amount);
}

// Interface Segregation Principle (ISP)
// 클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 합니다.

// OrderProcessor interface
class OrderProcessor {
    processOrder(order) {
        throw new Error('Method not implemented');
    }
}

// EmailSender interface
class EmailSender {
    sendOrderEmail(email, order) {
        throw new Error('Method not implemented');
    }
}

// Concrete implementation of OrderProcessor
class ConcreteOrderProcessor extends OrderProcessor {
    processOrder(order) {
        console.log('Processing order:', order);
    }
}

// Concrete implementation of EmailSender
class ConcreteEmailSender extends EmailSender {
    sendOrderEmail(email, order) {
        console.log(`Sending email to ${email} about order:`, order);
    }
}

// Dependency Inversion Principle (DIP)
// 고수준 모듈은 저수준 모듈에 의존해서는 안 되고, 둘 다 추상화된 인터페이스에 의존해야 합니다.

// OrderService depends on abstractions (OrderProcessor, EmailSender) instead of concrete implementations
class OrderService {
    constructor(orderProcessor, emailSender) {
        this.orderProcessor = orderProcessor;
        this.emailSender = emailSender;
    }

    placeOrder(order, email) {
        this.orderProcessor.processOrder(order);
        this.emailSender.sendOrderEmail(email, order);
    }
}

// Usage example
const order = new Order([{ item: 'Laptop', price: 1000 }], 1000);
const orderRepository = new OrderRepository();
const emailService = new EmailService();
const paypalProcessor = new PayPalPaymentProcessor();
const creditCardProcessor = new CreditCardPaymentProcessor();

orderRepository.save(order);
processOrder(paypalProcessor, order.total);
processOrder(creditCardProcessor, order.total);
emailService.sendEmail('customer@example.com', 'Your order has been placed!');

const orderProcessor = new ConcreteOrderProcessor();
const emailSender = new ConcreteEmailSender();
const orderService = new OrderService(orderProcessor, emailSender);
orderService.placeOrder(order, 'customer@example.com');