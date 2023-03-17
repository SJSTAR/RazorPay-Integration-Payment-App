import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';


declare var Razorpay: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
userName!:any
amount:any=''
dataArr:any[]=[]
constructor(private router:Router){
  this.dataArr
}
  ngOnInit(){

  }
  ngAfterViewInit(){

  }
  logout(){
    sessionStorage.setItem('isLoggedin','false')
    this.router.navigateByUrl('/login');
  }

  message:any = "";
  paymentId = "";
  error = "";
  title = 'razorpay-integration-using-angular';
  options = {
    "key": "rzp_test_pnXQuYSNSbxBAp", // Enter the Key ID generated from the Dashboard
    "amount": "13400000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "The NorthCap University, Gurgaon",
    "description": "Fees Payment",
    "image": "https://upload.wikimedia.org/wikipedia/en/f/fe/The_NorthCap_University_logo.png",
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
  paynow(type:number){
    this.paymentId = '';
    this.error = '';
if(type == 1){
  this.options.amount = '100000';
}else if(type == 2){
  this.options.amount = '50000';
}else if(type == 3){
  this.options.amount = '5000000';
}
else if(type == 4){
  this.options.amount = '50000';
}
    // this.options.amount = '13400000';
    this.options.prefill.name = '';
    this.options.prefill.email = 'ajay@gmail.com';
    this.options.prefill.contact = '9876543210';
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
        rzp1.on('payment.failed', function (response:any){
          window.alert('Payment Failed')
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
      window.alert(this.message)
    }
}



