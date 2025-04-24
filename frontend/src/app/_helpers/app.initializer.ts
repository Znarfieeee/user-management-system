import { AccountService } from '../_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise<void>((resolve) => {
        accountService.refreshToken()
            .subscribe({
                next: () => resolve(),
                error: () => resolve() // Resolve even on error to allow app to continue
            });
    });
}
