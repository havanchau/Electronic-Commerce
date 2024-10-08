type SupportedAuthProvider = 'google' | 'facebook' | 'twitter';

interface AuthProvider {
    id: SupportedAuthProvider;
    name: string;
}
