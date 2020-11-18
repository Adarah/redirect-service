class ApiError extends Error {

  public status: number;

  public name: string;

  public reason: string;

  constructor(status: number, name: string, message: string = '') {
    super(message);
    this.status = status;
    this.name = name;
    this.reason = message;
  }
}

export default ApiError;
