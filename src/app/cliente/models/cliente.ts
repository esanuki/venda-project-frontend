import { Endereco } from './endereco';
export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dataNascimento: Date;
  endereco: Endereco;
}
