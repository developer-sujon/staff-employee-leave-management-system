const ChangeBodyAttribute = (attribute, value): void => {
  if (document.body) document.body.setAttribute(attribute, value);
};

export { ChangeBodyAttribute };
