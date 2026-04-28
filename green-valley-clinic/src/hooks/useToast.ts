import { useAppContext } from './useAppContext';

export function useToast() {
  const { addToast, removeToast } = useAppContext();
  return { addToast, removeToast };
}
