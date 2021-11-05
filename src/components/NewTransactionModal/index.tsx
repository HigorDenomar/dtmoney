import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
}

type FormData = {
  title: string;
  amount: number;
  category: string;
  type: 'deposit' | 'withdraw';
}

export function NewTransactionModal({ isOpen, onRequestClose }: Props) {
  const { createTransaction } = useTransactions();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    amount: 0,
    category: '',
    type: 'deposit',
  });

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction(formData);

    setFormData({
      title: '',
      amount: 0,
      category: '',
      type: 'deposit',
    });
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(event) => setFormData({ ...formData, title: event.target.value })}
        />

        <input
          type="number"
          placeholder="Valor"
          value={formData.amount}
          onChange={(event) => setFormData({ ...formData, amount: Number(event.target.value) })}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setFormData({ ...formData, type: 'deposit' })}
            isActive={formData.type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setFormData({ ...formData, type: 'withdraw' })}
            isActive={formData.type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={formData.category}
          onChange={(event) => setFormData({ ...formData, category: event.target.value })}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
