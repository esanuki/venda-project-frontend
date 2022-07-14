export class LocalStorageUtil {

  saveUser(user: string) {
    localStorage.setItem('vendas.user', JSON.stringify(user));
  }

  saveToken(token: string) {
    localStorage.setItem('vendas.token', token);
  }

  getToken() {
    return localStorage.getItem('vendas.token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('vendas.user'));
  }

  public saveLocalStorage(response: any) {
    this.saveToken(response.accessToken);
    this.saveUser(response.userToken);
  }

  public clearLocalStorage() {
    localStorage.removeItem('vendas.user');
    localStorage.removeItem('vendas.token');
  }
}
