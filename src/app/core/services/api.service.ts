import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  /**
   * Führt eine GET-Anfrage auf den angegebenen Endpunkt aus.
   * @param endpoint Der relative Pfad zum Ressourcen-Endpunkt, inklusive eventueller Parameter
   * @param token Optionales Authentifizierungstoken
   * @returns Ein Observable mit dem Antworttyp
   */
  get<T>(endpoint: string, token?: string): Observable<T> {
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : undefined;
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers });
  }

  /**
   * Führt eine POST-Anfrage auf den angegebenen Endpunkt aus.
   * @param endpoint Der relative Pfad zum Ressourcen-Endpunkt
   * @param body Das zu sendende Datenobjekt, beinhaltet die notwendigen Informationen
   * @param token Optionales Authentifizierungstoken
   * @returns Ein Observable mit dem Antworttyp
   */
  post<T>(endpoint: string, body?: any, token?: string): Observable<T> {
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : undefined;
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }

  /**
   * Führt eine PUT-Anfrage auf den angegebenen Endpunkt aus.
   * @param endpoint Der relative Pfad zum Ressourcen-Endpunkt
   * @param body Das zu aktualisierende Datenobjekt
   * @param token Optionales Authentifizierungstoken
   * @returns Ein Observable mit dem Antworttyp
   */
  put<T>(endpoint: string, body: any, token?: string): Observable<T> {
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : undefined;
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { headers });
  }

  /**
   * Führt eine DELETE-Anfrage auf den angegebenen Endpunkt aus.
   * @param endpoint Der relative Pfad zum Ressourcen-Endpunkt
   * @param token Optionales Authentifizierungstoken
   * @returns Ein Observable mit dem Antworttyp
   */
  delete<T>(endpoint: string, token?: string): Observable<T> {
    const headers = token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : undefined;
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { headers });
  }
}
