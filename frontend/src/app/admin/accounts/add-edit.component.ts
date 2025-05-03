import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from "@angular/forms"
import { first } from "rxjs/operators"

import { AccountService, AlertService } from "../../_services"
import { MustMatch } from "../../_helpers"
import { Role } from "../../_models"

@Component({ templateUrl: "add-edit.component.html" })
export class AddEditComponent implements OnInit {
    form!: UntypedFormGroup
    id!: string
    isAddMode!: boolean
    loading = false
    submitted = false
    roles = Object.keys(Role)

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params["id"]
        this.isAddMode = !this.id

        this.form = this.formBuilder.group(
            {
                title: ["", Validators.required],
                firstName: ["", Validators.required],
                lastName: ["", Validators.required],
                email: ["", [Validators.required, Validators.email]],
                role: ["", Validators.required],
                status: ["Inactive"],
                password: [
                    "",
                    [
                        Validators.minLength(6),
                        ...(!this.isAddMode ? [] : [Validators.required]),
                    ],
                ],
                confirmPassword: [""],
            },
            {
                validator: MustMatch("password", "confirmPassword"),
            }
        )

        if (!this.isAddMode) {
            this.accountService
                .getById(this.id)
                .pipe(first())
                .subscribe(account => this.form.patchValue(account))
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.form.controls
    }

    onSubmit() {
        this.submitted = true

        // reset alerts on submit
        this.alertService.clear()

        // stop here if form is invalid
        if (this.form.invalid) {
            return
        }

        this.loading = true
        if (this.isAddMode) {
            this.createAccount()
        } else {
            this.updateAccount()
        }
    }

    private createAccount() {
        this.accountService
            .create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Account created successfully", {
                        keepAfterRouteChange: true,
                    })
                    this.router.navigate(["../"], { relativeTo: this.route })
                },
                error: err => {
                    this.alertService.error(err)
                    this.loading = false
                },
            })
    }

    private updateAccount() {
        this.accountService
            .update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Update successful", {
                        keepAfterRouteChange: true,
                    })
                    this.router.navigate(["../../"], { relativeTo: this.route })
                },
                error: err => {
                    this.alertService.error(err)
                    this.loading = false
                },
            })
    }
}
