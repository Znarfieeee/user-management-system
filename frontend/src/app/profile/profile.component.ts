import { Component, OnInit } from "@angular/core"
import { AccountService } from "../_services"
import { Account } from "../_models"
import { first } from "rxjs/operators"

@Component({
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
    account!: Account

    constructor(private accountService: AccountService) {
        this.account = this.accountService.accountValue as Account
    }

    ngOnInit() {
        // Fetch latest account data
        if (this.account && this.account.id) {
            this.accountService
                .getById(this.account.id)
                .pipe(first())
                .subscribe(account => (this.account = account))
        }
    }
}
