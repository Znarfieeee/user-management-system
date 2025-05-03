<<<<<<< HEAD
import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        // Call refreshToken and add the subscribe to the observable, 
        // then resolve the promise when complete
        accountService.refreshToken()
            .subscribe({
                complete: () => resolve(null)
=======
import { AccountService } from '../_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise<void>((resolve) => {
        accountService.refreshToken()
            .subscribe({
                next: () => resolve(),
                error: () => resolve() // Resolve even on error to allow app to continue
>>>>>>> 31bbe5627f56b9d236520b9b53530357215ec16e
            });
    });
}
