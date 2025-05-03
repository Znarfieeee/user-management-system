import { Component, OnInit } from "@angular/core"
import { first } from "rxjs/operators"

import { AccountService } from "../../_services"
import { Account } from "../../_models"

@Component({ templateUrl: "list.component.html" })
export class ListComponent implements OnInit {
    accounts: Account[] = []

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService
            .getAll()
            .pipe(first())
            .subscribe(
                accounts => {
                    this.accounts = accounts
                    console.log("Loaded accounts:", accounts)
                },
                error => {
                    console.error("Error loading accounts:", error)
                }
            )
    }
}
