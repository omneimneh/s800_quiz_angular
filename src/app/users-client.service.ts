import {Injectable} from '@angular/core';
import {delay, lastValueFrom} from "rxjs";
import {IUserDetailsResponse, IUsersResponse} from "../shared/user.types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersClientService {
  constructor(private http: HttpClient) {
  }

  async getUserById(id: number) {
    return await lastValueFrom(this.http.get<IUserDetailsResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(delay(500))); // simulate additional network delay (to see progress bar)
  }

  async getPaginatedUsers(pageIndex: number, pageSize: number) {
    return await lastValueFrom(this.http.get<IUsersResponse>(`https://reqres.in/api/users?page=${pageIndex}&per_page=${pageSize}`)
      .pipe(delay(500))); // simulate additional network delay (to see progress bar)
  }

  clientSideFilter(res: IUsersResponse, text: string) {
    const {data, ...metadata} = res;
    // since API does not support searching, client side searching is implemented.
    // this will not work across all pages, but it's the best simple solution for our case
    return {
      data: data.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(text.toLowerCase())
        || user.email.toLowerCase().includes(text.toLowerCase())),
      ...metadata
    }
  }
}
