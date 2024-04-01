import {Component, Input} from '@angular/core';
import {IUser} from "../../shared/user.types";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle, MatCardTitleGroup
} from "@angular/material/card";
import {MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatLabel,
    MatCardHeader,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCardTitle,
    MatCardSubtitle,
    MatCardTitleGroup,
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() user!: IUser;


}
