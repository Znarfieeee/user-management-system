<<<<<<< HEAD
import { AccountService } from '../_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise<void>((resolve) => {
        accountService.refreshToken()
            .subscribe({
                next: () => resolve(),
                error: () => resolve() // Resolve even on error to allow app to continue
=======
import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        // Call refreshToken and add the subscribe to the observable, 
        // then resolve the promise when complete
        accountService.refreshToken()
            .subscribe({
                complete: () => resolve(null)
>>>>>>> 2383958f5025b1740e163aac0186b6d95c23015e
            });
    });
}
