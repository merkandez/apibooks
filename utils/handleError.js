export const handleHttpError = (
  res,
  message = 'Internal Server Error',
  code = 403
) => {
  res.status(code);
  res.send({ error: message });
};
