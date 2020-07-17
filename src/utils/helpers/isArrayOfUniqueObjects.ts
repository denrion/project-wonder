const isArrayOfUniqueObjects = (array: any[], uniqueKey: string) => {
  const arrayOfUniqueElements = array.map((el) => el[uniqueKey]);
  const setOfUniqueElements = new Set(arrayOfUniqueElements);
  return arrayOfUniqueElements.length === setOfUniqueElements.size;
};

export default isArrayOfUniqueObjects;
