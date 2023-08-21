class ApiRequest<T> {
  private baseUrl: string;
  private path: string;

  /**
   * Constructor function for ApiRequest object.
   * @param {String} baseUrl
   * @param {String} path
   */
  constructor(baseUrl: string, path: string) {
    this.baseUrl = baseUrl;
    this.path = path;
  }

  /**
   * Send GET HTTP request with id param(return an object).
   * @param {String} id
   * @param {String} query
   * @return {Promise<T>} response from server.
   */
  getById = (id: string, query?: string): Promise<T> => {
    return this.sendRequest<T>(`${this.path}/${id}/${query || ''}`, 'GET');
  };

  /**
   * Send GET HTTP request to get a list of object.
   * @param {String} query
   * @return {Promise<T[]>} response from server.
   */
  getList = (query?: string): Promise<T[]> => {
    return this.sendRequest<T[]>(`${this.path}${query ? query : ''}`, 'GET');
  };

  /**
   * Send POST HTTP request.
   * @param {T} data
   */
  post = async <T>(data: T): Promise<void> => {
    await this.sendRequest<T>(`${this.path}`, 'POST', data);
  };

  /**
   * Send PUT HTTP request.
   * @param {String} id
   */
  put = async <T>(id: string, data: T): Promise<void> => {
    await this.sendRequest<T>(`${this.path}/${id}`, 'PUT', data);
  };

  /**
   * Send PATCH HTTP request.
   * @param {String} id
   */
  patch = async <T>(id: string, data: T): Promise<void> => {
    await this.sendRequest<T>(`${this.path}/${id}`, 'PATCH', data);
  };

  /**
   * Send DELETE HTTP request.
   * @param {String} id
   */
  delete = async (id: string): Promise<void> => {
    await this.sendRequest<T>(`${this.path}/${id}`, 'DELETE');
  };

  /**
   * Send the HTTP request to the API_GATEWAY_URL endpoint.
   * @param {String} method
   * @param {T} body(optional)
   * @return {Promise<T>} response from server.
   */
  sendRequest = async <T>(path: string, method: string, body?: T): Promise<T> => {
    const url = `${this.baseUrl}${path}`;

    const response: Response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = (await response.json()) as T;
      return data;
    } else {
      throw new Error('Error while sending request');
    }
  };
}

export default ApiRequest;
