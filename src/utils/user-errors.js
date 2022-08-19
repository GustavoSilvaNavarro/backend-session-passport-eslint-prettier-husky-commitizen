export class UserError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  setError() {
    return {
      message: this.message,
      status: this.status,
      stack: this.stack,
    };
  }
}

export class PageNotFound extends Error {
  constructor() {
    super('Page Not Found!');
    this.status = 404;
  }

  setError() {
    return {
      message: this.message,
      status: this.status,
      stack: this.stack,
    };
  }
}
