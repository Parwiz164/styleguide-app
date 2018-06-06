const baseUrl = "http://localhost:8080/wp-json/wp/v2/";
const authUrl = "https://styleguide.localhost/wp-json/jwt-auth/v1";

export default class Api {
  // Get all subpages
  subPages(options = {}) {
    let url = `${baseUrl}pages`;

    if (options.name !== undefined) {
      url += `?search=${options.name}`;
    }

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Project doesnt exist ...");
      }
    });
  }

  // Get project page
  page(options = {}) {
    let url = `${baseUrl}pages`;

    if (options.name !== undefined) {
      url += `?slug=${options.name}`;
    }

    if (options.id !== undefined) {
      url += `/${options.id}`;
    }

    if (options.password !== undefined) {
      url += `?password=${options.password}`;
    }

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Project doesnt exist ...");
      }
    });
  }

  posts(options = {}) {
    let url = `${baseUrl}posts`;

    if (options.id !== undefined) {
      url += `/${options.id}`;
    }

    if (options.password !== undefined) {
      url += "?_embed";
    }

    if (options.category !== undefined) {
      url += `&categories=${options.category}`;
    }

    return fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong ...");
      }
    });
  }

  categories() {
    let url = `${baseUrl}categories`;

    // if (id !== undefined) {
    //     url += `/${id}`;
    // }

    return fetch(url).then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }

      return res.json();
    });
  }

  authenticate(username, password) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return fetch(`${authUrl}/token`, {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password })
    }).then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }

      return res.json();
    });
  }

  deletePost(token, id) {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    return fetch(`${baseUrl}posts/${id}`, {
      method: "DELETE",
      headers
    }).then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }

      return res.json();
    });
  }
}
