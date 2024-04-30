class SessionTokenHr {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("SessionToken can only be set in the browser");
    }
    this.token = token;
  }
}

class SessionTokenUser {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("SessionToken can only be set in the browser");
    }
    this.token = token;
  }
}

export const sessionTokenUser = new SessionTokenUser();
export const sessionTokenHr = new SessionTokenHr();
