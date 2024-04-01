import {Component} from '@angular/core';
import {IUser} from "../../shared/user.types";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {UsersClientService} from "../users-client.service";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatProgressBar,
    NgIf
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  public loading: boolean = false;
  public user?: IUser;

  constructor(private usersClient: UsersClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchData(this.route.snapshot.params['id'])
      .then(res => this.user = res.data)
  }

  async fetchData(id: number) {
    this.loading = true;
    try {
      return await this.usersClient.getUserById(id);
    } finally {
      this.loading = false;
    }
  }
}
