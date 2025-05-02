import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
        // Call refreshToken and add the subscribe to the observable, 
        // then resolve the promise when complete
        accountService.refreshToken()
            .subscribe({
                complete: () => resolve(null)
            });
    });
}
