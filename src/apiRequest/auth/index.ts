export const authRequest = {
  setCookie: (access_token: string) => {
    return new Promise((resolve, reject) => {
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token }),
      })
        .then((response) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject("Error occurred during fetch");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  logoutUser: () => {
    return new Promise((resolve, reject) => {
      fetch("/api/logoutUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject("Error occurred during fetch");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
