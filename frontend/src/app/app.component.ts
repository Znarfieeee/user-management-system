import { Component, OnDestroy } from "@angular/core"
import { Subscription } from "rxjs"

import { AccountService } from "./_services"
import { Account, Role } from "./_models"

@Component({ selector: "app", templateUrl: "app.component.html" })
export class AppComponent implements OnDestroy {
    Role = Role
    account: Account | null = null
    private subscription: Subscription

    constructor(private accountService: AccountService) {
        this.subscription = this.accountService.account.subscribe(x => this.account = x)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

    logout() {
        this.accountService.logout()
    }
}
