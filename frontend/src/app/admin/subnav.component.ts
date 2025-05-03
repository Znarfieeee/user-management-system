import { Component } from "@angular/core"

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
export class SubNavComponent { }