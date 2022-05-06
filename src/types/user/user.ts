export interface userList {
  user: [
    {
      username: string;
      password: number;
    }
  ];
}
export interface userRes<T = userList> {
  success: boolean;
  data: T;
}
