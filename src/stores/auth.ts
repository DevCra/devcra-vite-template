import { IS_SERVER } from "@/constants/env";

class Auth {
  private readonly KEY_ACCESS_TOKEN = "access-token";
  private readonly KEY_REFRESH_TOKEN = "refresh-token";
  private readonly KEY_KEEP_LOGIN = "keep-login";
  private readonly KEY_ACTION_TIME = "action-time";

  private accessToken = IS_SERVER ? null : localStorage.getItem(this.KEY_ACCESS_TOKEN) || "";
  private refreshToken = IS_SERVER ? null : localStorage.getItem(this.KEY_REFRESH_TOKEN) || "";

  setAccessToken(accessToken: string) {
    if (IS_SERVER) {
      return;
    }

    this.accessToken = accessToken;
    this.setActionTime(new Date());
    localStorage.setItem(this.KEY_ACCESS_TOKEN, accessToken);
  }

  getAccessToken(): string | null {
    if (IS_SERVER) {
      return null;
    }

    return localStorage.getItem(this.KEY_ACCESS_TOKEN) || "";
  }

  setRefreshToken(refreshToken: string) {
    if (IS_SERVER) {
      return;
    }

    this.refreshToken = refreshToken;
    localStorage.setItem(this.KEY_REFRESH_TOKEN, refreshToken);
  }

  getRefreshToken(): string | null {
    if (IS_SERVER) {
      return null;
    }

    return localStorage.getItem(this.KEY_REFRESH_TOKEN) || "";
  }

  setKeepLogin(isKeep: boolean) {
    if (IS_SERVER) {
      return;
    }

    localStorage.setItem(this.KEY_KEEP_LOGIN, isKeep.toString());
  }

  getKeepLogin(): boolean | null {
    if (IS_SERVER) {
      return null;
    }

    return localStorage.getItem(this.KEY_KEEP_LOGIN || "false") === "true";
  }

  setActionTime(time: Date) {
    if (IS_SERVER) {
      return;
    }

    localStorage.setItem(this.KEY_ACTION_TIME, time.toISOString());
  }

  getActionTime(): Date | null {
    if (IS_SERVER) {
      return null;
    }

    const time = localStorage.getItem(this.KEY_ACTION_TIME) || new Date();

    return new Date(time);
  }

  // TODO
  isLoggedIn(): boolean {
    return false;
  }

  login(accessToken: string, refreshToken: string) {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  logout() {
    this.setAccessToken("");
    this.setRefreshToken("");
  }
}

export const auth: Auth = new Auth();
