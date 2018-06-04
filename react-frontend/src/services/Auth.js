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
  async authenticate(pageId, password, history) {
    let api = new Api();

    await api
      .pages({
        id: pageId,
        password: password
      })
      .then(page => {
        store(page.id);
        console.log(page.id); // change the page to /project/whatever-they-entered
      })
      .catch(error => alert(error + "wachtwoord verkeerd!"));
  },
  signout(fn) {
    store(null);
    sessionStorage.clear();
  }
};

export default Auth;
