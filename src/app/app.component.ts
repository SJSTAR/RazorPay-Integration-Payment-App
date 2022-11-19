import { Component,HostListener } from '@angular/core';

declare var Razorpay: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message:any = "Payment not yet started";
  paymentId = "";
  error = "";
  title = 'razorpay-integration-using-angular';
  options = {
    "key": "RAZORPAY_KEY_ID", // Enter the Key ID generated from the Dashboard
    "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "W2P IT Solutions & Services",
    "description": "W2P IT Solutions & Services",
    "image": "https://example.com/your_logo",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response : any){
      var event = new CustomEvent("payment.success",
        {
            detail: response,
            bubbles: true,
            cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    "notes": {
        "address": ""
    },
    "theme": {
        "color": "#3399cc"
    }
};
  paynow(){
    this.paymentId = '';
    this.error = '';
    this.options.amount = '100';
    this.options.prefill.name = 'your name';
    this.options.prefill.email = 'youremail@gmail.com';
    this.options.prefill.contact = '9876543210';
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
        rzp1.on('payment.failed', function (response:any){
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
    });
  }
    @HostListener('window:payment.success', ['$event'])
    onPaymentSuccess(event: any): void {
      this.message = "Payment Done Successfully";
    }
}
