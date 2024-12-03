import { compareSync } from 'bcrypt';
import { genSaltSync, hashSync } from 'bcryptjs';

export const getHashPassword = (palainpassword: string): string => {
  const salt = genSaltSync(10);
  const hash = hashSync(palainpassword, salt); // Đúng: sử dụng tham số password
  return hash;
};

export const comparePassword = (
  palainpassword: string,
  hashPassword: string,
): boolean => {
  const comparePassword = compareSync(palainpassword, hashPassword);
  console.log(palainpassword, hashPassword);
  return comparePassword;
};
