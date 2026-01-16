export interface AuthState {
  token: string | null;
  memberId: number | null;
  isAuthenticated: boolean;
}
