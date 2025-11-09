import { EHttpStatusCode } from "../constants/enums";
import type { TResponseApi } from "../constants/types";
import { KEY_AUTH_STORE } from "../store/authStore";
import { storageService } from "./storage";

const noCheckEndpoints401ToRedirect = ["/users/login"]

export class Api {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<TResponseApi<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
      ...options,
    });

    if (response.status === EHttpStatusCode.UNAUTHORIZED && !noCheckEndpoints401ToRedirect.includes(endpoint)) {
      storageService.removeItem(KEY_AUTH_STORE)
      window.location.href = "/login"
      return { exito: false, data: {} as T}
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message ?? "Error en la petición");
    }

    if (response.status === EHttpStatusCode.OK_NO_CONTENT) return { exito: true, data: {} as T}

    return response.json();
  }

  get<T>(endpoint: string): Promise<TResponseApi<T>> {
    return this.request(endpoint, { method: "GET" });
  }

  post<T>(endpoint: string, body: any): Promise<TResponseApi<T>> {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T>(endpoint: string, body: any): Promise<TResponseApi<T>> {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  patch<T>(endpoint: string, body: any): Promise<TResponseApi<T>> {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
  }

  delete<T>(endpoint: string): Promise<TResponseApi<T>> {
    return this.request(endpoint, { method: "DELETE" });
  }
}
export const api = new Api(import.meta.env.VITE_API);
