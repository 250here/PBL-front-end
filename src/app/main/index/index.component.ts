import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  loginUser={};
  registeStudent={};
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  public doLogin(){
    this.userService.login(this.loginUser)
    .subscribe(data => {

    });
  }

}
