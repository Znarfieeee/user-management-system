import { Component, OnInit } from "@angular/core"
import { Router, ActivatedRoute } from "@angular/router"
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from "@angular/forms"
import { first } from "rxjs/operators"
import { AccountService, AlertService } from "../_services"
import { MustMatch } from "../_helpers"
import { Account } from "../_models"


@Component({ templateUrl: 'update.component.html' })
export class UpdateComponent implements OnInit {
    account: Account | null = null;
    form!: UntypedFormGroup;
    loading = false;
    submitted = false;
    deleting = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.account = this.accountService.accountValue;
        if (!this.account) {
            this.router.navigate(['/account/login']);
            return;
        }

        this.form = this.formBuilder.group(
            {
                title: [this.account.title, Validators.required],
                firstName: [this.account.firstName, Validators.required],
                lastName: [this.account.lastName, Validators.required],
                email: [
                    this.account.email,
                    [Validators.required, Validators.email],
                ],
                password: ["", [Validators.minLength(6)]],
                confirmPassword: [""],
            },
            {
                validator: MustMatch("password", "confirmPassword"),
            }
        );
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls}

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit 
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid || !this.account) {
            return;
        }

        this.loading = true;
        this.accountService.update(this.account.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success("Update successful", {
                        keepAfterRouteChange: true,
                    })
                    this.router.navigate(['../'], { relativeTo: this.route })
                },
                error: err => {
                    this.alertService.error(err);
                    this.loading = false;
                }
            })
    }

    onDelete() {
        if (!this.account) return;

        if (confirm('Are you sure?')) {
            this.deleting = true;
            this.accountService.delete(this.account.id)
                .pipe(first())
                .subscribe(() => {
                    this.alertService.success("Account deleted successfully", { keepAfterRouteChange: true})
                })
        }
    }
}
