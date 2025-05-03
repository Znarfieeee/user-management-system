import { Component, OnInit, OnDestroy, Input } from "@angular/core"
import { Router, NavigationStart } from "@angular/router"
import { Subscription } from "rxjs"

import { Alert, AlertType } from "../_models"
import { AlertService } from "../_services"

@Component({ selector: "alert", templateUrl: "alert.component.html" })
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = "default-alert"
    @Input() fade = true

    alerts: Alert[] = []
    alertSubscription!: Subscription
    routeSubscription!: Subscription

    constructor(private router: Router, private alertService: AlertService) {}
    ngOnInit() {
        // subscribe to new alert notifications
        this.alertSubscription = this.alertService
            .onAlert(this.id)
            .subscribe(alert => {
                if (!alert.message) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(
                        x => x.keepAfterRouteChange
                    )

                    // remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(x => (x.keepAfterRouteChange = false))
                    return
                }

                // add alert to array
                this.alerts.push(alert)

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000)
                }
            })

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id)
            }
        })
    }

    ngOnDestroy() {
        // unsubscribe to avoid memory leaks
        this.alertSubscription.unsubscribe()
        this.routeSubscription.unsubscribe()
    }

    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return

        if (this.fade) {
            // fade out alert
            alert.fade = true

            //remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert)
            }, 250)
        } else {
            // remove alert without fade
            this.alerts = this.alerts.filter(x => x !== alert)
        }
    }

    // New method that returns CSS classes as object for ngClass
    getCssClass(alert: Alert) {
        if (!alert) return {}

        const cssClass = {
            "alert-success": alert.type === AlertType.Success,
            "alert-danger": alert.type === AlertType.Error,
            "alert-info": alert.type === AlertType.Info,
            "alert-warning": alert.type === AlertType.Warning,
            fade: alert.fade,
        }

        return cssClass
    }

    // Keep this for backward compatibility
    cssClass(alert: Alert) {
        if (!alert) return

        const classes = ["alert", "alert-dismissable"]

        const alertTypeClass = {
            [AlertType.Success]: "alert-success",
            [AlertType.Error]: "alert-danger",
            [AlertType.Info]: "alert-info",
            [AlertType.Warning]: "alert-warning",
        }

        classes.push(alertTypeClass[alert.type])

        if (alert.fade) {
            classes.push("fade")
        }

        return classes.join(" ")
    }
}
