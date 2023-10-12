import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  constructor(private router: Router) {
  }

  menuItems = [
    { label: 'Home', icon: 'account_balance', link: '/' },
    { label: 'Transactions', icon: 'swap_horiz',link: '/transfer' },
    { label: 'History', icon: 'history', link: '/history' },
    { label: 'Profile', icon: 'person', link:'/profile' }
  ];

  // Handle menu item clicks
  onItemClick(item: any) {
    this.router.navigate([item.link])

  }

  ngOnInit(): void {
  }
}
