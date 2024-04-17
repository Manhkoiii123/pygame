export const authRequest = {
  setAccessToken: (access_token: string) => {
    return new Promise((resolve, reject) => {
      fetch("/api/hrAuth", {
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
};
