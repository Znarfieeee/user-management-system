import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { Account } from '@app/_models';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    account: Account;

    constructor(private accountService: AccountService) {
        this.account = this.accountService.accountValue;
    }

    ngOnInit() {
        // Fetch latest account data
        this.accountService.getById(this.account.id)
            .pipe(first())
            .subscribe(account => this.account = account);
    }
} 