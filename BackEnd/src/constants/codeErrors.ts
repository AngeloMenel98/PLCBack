const codeErrors = {
  GEN_1: (value: any) => `${value} ID no existe.`,
  GEN_2: (value: any) => `No se encontro ningún ${value}.`,
  GEN_3: (value: any) => `${value} ya existe.`,

  USER_1: `El usuario no es ADMIN.`,
};

export default codeErrors;
