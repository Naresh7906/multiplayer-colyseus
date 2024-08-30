export const baseUtilities = {
  messageBuilder: (
    response: object | string,
    error: boolean = false,
    errorMessage: string = "",
    successMessage: string = ""
  ) => {
    return {
      data: response,
      error: error,
      errorMessage: errorMessage,
      successMessage: successMessage,
    };
  },
};
