import useLocalStorageState from '@/hooks/useLocalStorageState';

export function usePriorityFee() {
  const [priorityFee, setPriorityFee] = useLocalStorageState<number>({
    key: 'arcana-priority-fee',
    defaultValue: 10,
    getInitialValueInEffect: false,
  });

  return {
    priorityFee,
    setPriorityFee,
  };
}