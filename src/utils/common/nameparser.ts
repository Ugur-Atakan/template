const nameParser = (fullName: string) => {
  const parts = fullName?.split(' ');
  const firstName = parts?.shift();
  const lastName = parts?.join(' ');

  if (fullName?.split(' ') === undefined) {
    return {
      firstName: fullName,
    };
  } else {
    return {
      firstName,
      lastName,
    };
  }
};

export default nameParser;
