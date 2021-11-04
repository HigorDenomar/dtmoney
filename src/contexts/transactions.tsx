import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type TransactionsProviderProps = {
  children: ReactNode;
}

type Transaction = {
  id: number;
  title: string;
  amount: number,
  type: 'deposit' | 'withdraw',
  category: string,
  createdAt: string,
}

type TransactionsContextProps = {
  transactions: Transaction[];
}

export const TransactionsContext = createContext({} as TransactionsContextProps);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get<{transactions: Transaction[]}>('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{transactions}}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
