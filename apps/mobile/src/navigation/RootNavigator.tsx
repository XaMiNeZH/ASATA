import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useAuthStore } from '../store/auth.store';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

export function RootNavigator() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}
