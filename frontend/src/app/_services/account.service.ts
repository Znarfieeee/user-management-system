import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable } from "rxjs"
import { map } from "rxjs/operators"

import { environment } from "../environments/environment"
import { Account } from "../_models"

const baseUrl = `${environment.apiUrl}/accounts`

@Injectable({ providedIn: "root" })
export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>
    public account: Observable<Account | null>

    constructor(private router: Router, private http: HttpClient) {
        this.accountSubject = new BehaviorSubject<Account | null>(
            JSON.parse(localStorage.getItem("account") || "null")
        )
        this.account = this.accountSubject.asObservable()
    }

    public get accountValue(): Account | null {
        return this.accountSubject.value
    }

    login(email: string, password: string) {
        return this.http
            .post<Account>(
                `${baseUrl}/authenticate`,
                { email, password },
                { withCredentials: true }
            )
            .pipe(
                map(account => {
                    // store account details and jwt token in local storage to keep account logged in between page refreshes
                    localStorage.setItem("account", JSON.stringify(account))
                    this.accountSubject.next(account)
                    console.log("Login successful, account:", account)
                    this.startRefreshTokenTimer()
                    return account
                })
            )
    }

    logout() {
        this.http
            .post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true })
            .subscribe()
        this.stopRefreshTokenTimer()
        localStorage.removeItem("account")
        this.accountSubject.next(null)
        this.router.navigate(["/account/login"])
    }

    refreshToken() {
        return this.http
            .post<Account>(
                `${baseUrl}/refresh-token`,
                {},
                { withCredentials: true }
            )
            .pipe(
                map(account => {
                    this.accountSubject.next(account)
                    this.startRefreshTokenTimer()
                    return account
                })
            )
    }

    register(account: Account) {
        return this.http.post(`${baseUrl}/register`, account)
    }

    verifyEmail(token: string) {
        return this.http.post(`${baseUrl}/verify-email`, { token })
    }

    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/forgot-password`, { email })
    }

    validateResetToken(token: string) {
        return this.http.post(`${baseUrl}/validate-reset-token`, { token })
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/reset-password`, {
            token,
            password,
            confirmPassword,
        })
    }

    getAll() {
        return this.http.get<Account[]>(`${baseUrl}`)
    }

    getById(id: string) {
        return this.http.get<Account>(`${baseUrl}/${id}`)
    }

    create(params: Partial<Account>) {
        return this.http.post<Account>(`${baseUrl}`, params)
    }

    update(id: string, params: Partial<Account>) {
        return this.http.put<Account>(`${baseUrl}/${id}`, params).pipe(
            map(account => {
                // update the current account if it was updated
                if (account.id === this.accountValue?.id) {
                    // publish updated account to subscribers
                    account = { ...this.accountValue, ...account }
                    this.accountSubject.next(account)
                }
                return account
            })
        )
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`).pipe(
            map(() => {
                // auto logout if the logged in account was deleted
                if (id === this.accountValue?.id) {
                    this.logout()
                }
            })
        )
    }

    // helper methods
    private refreshTokenTimeout: any

    private startRefreshTokenTimer() {
        const account = this.accountValue
        if (!account?.jwtToken) return

        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(account.jwtToken.split(".")[1]))

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000)
        const timeout = expires.getTime() - Date.now() - 60 * 1000
        this.refreshTokenTimeout = setTimeout(
            () => this.refreshToken().subscribe(),
            timeout
        )
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout)
    }
}
