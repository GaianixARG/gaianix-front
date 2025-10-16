import { EHttpStatusCode } from "../constants/enums";
import type { TResponseApi } from "../constants/types";
import { authService } from "./authService";

const noCheckEndpoints401ToRedirect = ["/users/login", "/users/me"]

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
      await authService.logout()
      window.location.href = "/login"
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

  delete<T>(endpoint: string): Promise<TResponseApi<T>> {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export const api = new Api("http://localhost:3000/api");
