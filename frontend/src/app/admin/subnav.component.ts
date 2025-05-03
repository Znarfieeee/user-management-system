import { Component } from "@angular/core"

<<<<<<< HEAD
@Component({ templateUrl: './subnav.component.html' })
=======
@Component({
    selector: "app-subnav",
    template: `
        <nav class="navbar navbar-expand navbar-light bg-light">
            <div class="container-fluid">
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a
                                routerLink="overview"
                                routerLinkActive="active"
                                class="nav-link"
                                >Overview</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `,
})
>>>>>>> 31bbe5627f56b9d236520b9b53530357215ec16e
export class SubNavComponent { }