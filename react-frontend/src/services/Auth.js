import Api from "../services/api";

function store(value) {
  const tokenKey = "ApiTokenValue";
  if (value === undefined) {
    return sessionStorage.getItem(tokenKey);
  }
  sessionStorage.setItem(tokenKey, value);
}

const Auth = {
  get isAuthenticated() {
    return store() !== null;
  },
  async authenticate(pageId, password) {
    let api = new Api();

    await api
      .page({
        id: pageId,
        password: password
      })
      .then(page => {
        store(page.id);
      })
      .catch(error => alert("wachtwoord verkeerd!"));
  },
  signout(fn) {
    sessionStorage.clear();
    localStorage.clear();
  }
};

export default Auth;
