export const authRequest = {
  setEmail: (email: string) => {
    return new Promise((resolve, reject) => {
      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
