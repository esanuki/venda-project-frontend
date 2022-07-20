export class LocalStorageUtil {

  saveUser(user: string) {
    localStorage.setItem('vendas.user', JSON.stringify(user));
  }

  saveToken(token: string) {
    localStorage.setItem('vendas.token', token);
  }

  saveRefreshToken(token: string) {
    localStorage.setItem('vendas.refreshToken', token);
  }

  getToken() {
    return localStorage.getItem('vendas.token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('vendas.user'));
  }

  getRefreshToken() {
    return localStorage.getItem('vendas.refreshToken');
  }

  public saveLocalStorage(response: any) {
    this.saveToken(response.accessToken);
    this.saveUser(response.login);
    this.saveRefreshToken(response.refreshToken)
  }

  public clearLocalStorage() {
    localStorage.removeItem('vendas.user');
    localStorage.removeItem('vendas.token');
    localStorage.removeItem('vendas.refreshToken');
  }
}
