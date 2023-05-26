import { Component } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  forgotPassObj: any = {};
  data: any = {};
  resetPasswordObj: any = { };
  showPassword: boolean = true;
  showPassword1: boolean =true;
  showHideForgotPassword: boolean = true;
  showHideResetPassword: boolean = false;
  counterToShow: number = 0;
  uniqueNo: string = "";


  constructor(private dataService: DataService, private constants: AppConstants, private router: Router) { }



  forgotPassword() {
    this.dataService.postRequest('user/forgot-password', this.forgotPassObj).subscribe((res: any) => {
      this.data = res;
      if (this.data.status == "200") {
        this.startCountdown(120);
        this.uniqueNo = res.result;
        this.showHideForgotPassword = false;
        this.showHideResetPassword = true;
        AppConstants.successMsg(this.data.message);

      } else {
        AppConstants.errorMsg(this.data.message);
      }
    }, (error) => {
      AppConstants.errorMsg(error.error.message)
    });
  }

  startCountdown(seconds: number) {
    var counter = seconds;
    var interval = setInterval(() => {
      counter--;
      this.counterToShow = counter;
      if (counter < 1) {
        clearInterval(interval);
        console.log("OTP expired");
      }
    }, 1000);
  }

  resendOTP(formData: any) {
    this.dataService.postRequest('user/resend-otp', this.forgotPassObj).subscribe((res: any) => {
      this.data = res;
      if (res.status == "200") {
        formData.resetForm();
        this.startCountdown(120);
        this.uniqueNo = res.result;
        AppConstants.successMsg(this.data.message);
      } else {
        AppConstants.errorMsg(this.data.message);
      }
    }, (error) => {
      AppConstants.errorMsg(error.error.message)
    });
  }

  resetPassword() {
    this.resetPasswordObj.uniqueNo = this.uniqueNo;
    this.dataService.postRequest('user/reset-password', this.resetPasswordObj).subscribe((res: any) => {
      this.data = res;
      if (res.status == "200") {
        AppConstants.successMsg(this.data.message);
        this.router.navigate(["/login"]);
      } else {
        AppConstants.errorMsg(this.data.message);

      }
    }, (error) => {
      AppConstants.errorMsg(error.error.message)
    });
  }

  checkIfNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  checkIfNumber2(event: any) {
    const pattern = /[0-9\+\\ ]/;
   let inputChar = String.fromCharCode(event.charCode);
   if (event.keyCode != 8 && !pattern.test(inputChar)) {
     event.preventDefault();
   }
 }




}
