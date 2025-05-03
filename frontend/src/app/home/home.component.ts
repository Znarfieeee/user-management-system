import { Component, OnInit } from "@angular/core"

import { AccountService } from "../_services"
import { Account } from "../_models"

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit {
    account: Account | null = null

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.account = this.accountService.accountValue
        console.log("Home Component - Account:", this.account)
    }
}
