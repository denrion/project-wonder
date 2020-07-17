const setCorrectPluralSuffix = (string: string) => {
  const suffix =
    string.endsWith('ch') || string.endsWith('sh') || string.endsWith('x')
      ? 'es'
      : string.endsWith('s')
      ? 'ses'
      : string.endsWith('z')
      ? 'zes'
      : 's';

  return `${string}${suffix}`;
};

export default setCorrectPluralSuffix;
