import { Endereco } from './endereco';
export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: Date;
  endereco: Endereco;
}
