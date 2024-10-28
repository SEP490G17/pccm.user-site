import { makeAutoObservable } from 'mobx';
import { User } from '../models/user.model';
import { router } from '../router/Routes';

export default class AuthStore {
    userApp: User | null = null;
    rememberMe: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.userApp;
    }

    setRememberMe = () => {
        this.rememberMe = !this.rememberMe;
        console.log(this.rememberMe);
    };

    // Mock login function
    login = async (creds: { username: string; password: string }) => {
        const mockUsername = 'testuser';
        const mockPassword = 'testpass';

        // Simulate validation
        if (creds.username === mockUsername && creds.password === mockPassword) {
            this.userApp = {
                username: mockUsername,
                displayName: 'Test User', // Mock display name
                token: 'mock-token-12345', // Mock token
                // Include any additional properties required by the User interface
            };
            router.navigate('/');
        } else {
            throw new Error('Invalid credentials');
        }
    };

    logout = () => {
        this.userApp = null;
        router.navigate('/login');
    };
}
