export class ApiException extends Error {
  public readonly message: string = '';
  public readonly response?: any; // Adicione uma propriedade para armazenar a resposta da API

  constructor(message: string, response?: any) {
    super();

    this.message = message;
    this.response = response;
  }
}
