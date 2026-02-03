/**
 * HttpAdapter
 * Interfaz que deben implementar las clases adapter para servicios o librerías http.
 */
export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}