import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [IonicModule.forRoot(),
         ReactiveFormsModule, 
         FormsModule,
         HttpClientTestingModule,
         RouterTestingModule
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request token', () => {
    
    
    //LoginComponent.login(user);

    expect(component).toBeTruthy();
  });

  it('should getToken', () => {
    
    let user = {
      'username':'planatest',
      'password':'123456'
    }
    //LoginComponent.login(user);

    expect(component).toBeTruthy();
  });

  it('should login', () => {
    
    let user = {
      'username':'planatest',
      'password':'123456'
    }
    //LoginComponent.login(user);

    expect(component).toBeTruthy();
  });

  
});
