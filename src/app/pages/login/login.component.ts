import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login/login-form/login-form.component';
import { LoginVisualContainerComponent } from '../../components/login/login-visual-container/login-visual-container.component';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent, LoginVisualContainerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  }
}
