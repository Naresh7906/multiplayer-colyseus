const messageBuilder = (
  response: object | string | null = null,
  error: boolean = false,
  errorMessage: string | any = "",
  successMessage: string = ""
) => {
  return {
    data: response,
    error: error,
    errorMessage: errorMessage,
    successMessage: successMessage,
  };
};

export {messageBuilder};
