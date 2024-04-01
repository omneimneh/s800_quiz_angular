import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {UserCardComponent} from "../user-card/user-card.component";
import {IUsersResponse} from "../../shared/user.types";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {UsersClientService} from "../users-client.service";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    UserCardComponent,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatInput,
    MatPaginator,
    MatProgressBar,
    MatGridList,
    MatGridTile
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private searchText$ = new Subject<string>();

  public data?: IUsersResponse;
  public pageSize: number = 10;
  public pageIndex: number = 1;
  public searchText: string = "";
  public loading: boolean = false;

  constructor(private usersClient: UsersClientService) {}

  ngOnInit() {
    this.fetchData(this.pageIndex, this.pageSize)
      .then(data => this.data = data);

    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(async (text: string) => {
        this.pageIndex = 1;
        const data = await this.fetchData(this.pageIndex, this.pageSize);
        return this.usersClient.clientSideFilter(data, text);
      })
    ).subscribe(data => {
      this.data = data;
    });
  }

  async fetchData(pageIndex: number, pageSize: number) {
    this.loading = true;
    try {
      return await this.usersClient.getPaginatedUsers(pageIndex, pageSize);
    } finally {
      this.loading = false;
    }
  }

  searchTermChanged(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value
    this.searchText$.next(this.searchText);
  }

  async pageChange($event: PageEvent) {
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex + 1;
    this.data = await this.fetchData(this.pageIndex, this.pageSize)
  }
}
