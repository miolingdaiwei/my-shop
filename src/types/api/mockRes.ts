/* eslint-disable prettier/prettier */
export interface mockRespondDataObj {
  name: string;
  url: string;
  email: string;
  address: string;
  string: string;
  number: number;
  boolean: boolean;
  object: object;
}

export interface mockRespondData<T = mockRespondDataObj> {
  projects: T[];
}

export interface mockRespond<T = mockRespondData> {
  success: string;
  data: T;
}
