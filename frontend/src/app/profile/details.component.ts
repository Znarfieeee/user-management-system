import { Component, OnInit } from "@angular/core"

import { AccountService } from "../_services"
import { Account } from "../_models"
import { first } from "rxjs/operators"

@Component({ templateUrl: "details.component.html" })
export class DetailsComponent implements OnInit {
    account!: Account

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.account = this.accountService.accountValue as Account

        // Refresh the data from the API to ensure we have the latest
        if (this.account && this.account.id) {
            this.accountService
                .getById(this.account.id)
                .pipe(first())
                .subscribe(account => {
                    this.account = account
                    console.log("Profile details loaded:", account)
                })
        } else {
            console.error(
                "Cannot load profile: No account or account ID available"
            )
        }
    }
}
