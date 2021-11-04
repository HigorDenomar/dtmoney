import { useEffect, useState } from 'react';

import { api } from '../../services/api';
import {
  Container,
} from './styles';

type Transaction = {
  id: number;
  title: string;
  amount: number,
  type: string,
  category: string,
  createdAt: Date,
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get<Transaction[]>('transactions')
      .then(response => setTransactions(response.data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className="deposit">R$1200,00</td>
              <td>{transaction.category}</td>
              <td>04/11/2021</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
