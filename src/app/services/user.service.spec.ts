import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { User } from 'src/app/models/user.model';
import { first } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class MockUser extends User {
}

describe('UserService', () => {
  let service: UserService;
  let mockUser: MockUser;

  let token: any;
  let httpController: HttpTestingController;

  let mockToken = {
    "success": true,
    "expires_at": "2022-07-01 21:43:10 UTC",
    "request_token": "85e77807e6b16171c4e044eb03a98da791cf870e"
  };

  let mockNoAuth = {
    "success": false,
    "status_code": 33,
    "status_message": "Invalid request token: The request token is either expired or invalid."
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);

    mockUser = new MockUser();
    

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should not login', () => {
    mockUser.username = 'incorrect login';
    mockUser.password = 'incorrect password';

    mockUser.request_token = '';
    service.login( mockUser.username , mockUser.password, mockUser.request_token)
      .pipe(first())
      .subscribe({
        next: (res) => {
          
          expect(res).toEqual(mockNoAuth);
        },
        error: error => {
         
          expect(error).not.toEqual(mockNoAuth);
        }
      });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${environment.apiUrl}/3/authentication/token/validate_with_login?api_key=${environment.apiKey}`,
    });

    req.flush(mockNoAuth);

  });
  it('should get token', () => {


    service.getToken().subscribe((res) => {
      expect(res).toEqual(mockToken);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/3/authentication/token/new?api_key=${environment.apiKey}`,
    });

    req.flush(mockToken);
  });


  it('should login', () => {
    mockUser.username = 'correct login';
    mockUser.password = 'correct password';
    mockUser.request_token = 'correct token';

    service.login( mockUser.username , mockUser.password, mockUser.request_token)
      .pipe(first())
      .subscribe({
        next: (res) => {
          
          expect(res).toEqual(mockToken);
        },
        error: error => {
         
          expect(error).not.toEqual(mockToken);
        }
      });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${environment.apiUrl}/3/authentication/token/validate_with_login?api_key=${environment.apiKey}`,
    });

    req.flush(mockToken);

  });


});
