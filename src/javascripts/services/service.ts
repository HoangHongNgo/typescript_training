import ApiRequest from "../helpers/apiRequest";

abstract class Service<T> {
  protected apiRequest: ApiRequest<T>;

  /**
   * Constructor of Service object.
   */
  constructor(baseUrl: string, path: string) {
    this.apiRequest = new ApiRequest(baseUrl, path);
  }

  /**
   * Get list of object from database.
   * @returns {Promise<T[]>} list of objects
   */
  getList = async (): Promise<T[]> => {
    const data = await this.apiRequest.getList();
    return data;
  };

  /**
   * Get object by ID from database.
   * @returns {Promise<T>} an objects
   */
  getById = async (id: string): Promise<T> => {
    const data = await this.apiRequest.getById(id);
    return data;
  };

  /**
   * Add an object to database.
   * @returns {Promise<void>} an objects
   */
  add = async (data: T): Promise<void> => {
    await this.apiRequest.post(data);
  };

  /**
   * Update an object from database.
   * @returns {Promise<void>} an objects
   */
  edit = async (id: string, data: T): Promise<void> => {
    await this.apiRequest.patch(id, data);
  };

  /**
   * Delete an object from database.
   * @returns {Promise<void>} an objects
   */
  delete = async (id: string): Promise<void> => {
    await this.apiRequest.delete(id);
  };
}

export default Service;
