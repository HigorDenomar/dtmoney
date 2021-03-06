import { useContext } from 'react';
import { TransactionsContext } from '../contexts/transactions';

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}