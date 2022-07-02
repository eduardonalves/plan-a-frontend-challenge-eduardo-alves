import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loader:any;
  public hasAuthErrors=false;
  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private loadingCtrl: LoadingController,
    private router: Router  
  ) { }
  

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      //username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login = () => {
    this.hasAuthErrors=false;
    if(this.loginForm.valid){

      this.showLoading();
      this.userService.getToken().subscribe((res) => {
       
        let user = new User();
        user.username =this.loginForm.value.username;
        user.password = this.loginForm.value.password;
        user.request_token= res.request_token;

        this.userService.login(
          this.loginForm.value.username,
          this.loginForm.value.password,
          res.request_token
        ).pipe(first()).subscribe({
          next: (login) => {
            this.loader.dismiss();
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.loader.dismiss();
            this.hasAuthErrors=true;
          }
        });
        
      });
      
     
    }
    
  }

  async showLoading () {
    this.loader = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles'
    });
    
    this.loader.present();
  }


}
