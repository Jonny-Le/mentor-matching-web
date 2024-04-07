import { AxiosResponse } from 'axios';
import { UserDto } from '@src/models/user';
import { get, post } from './api';

const getUsers = async (): Promise<AxiosResponse<UserDto[]>> => await get('/users');

const getUserById = async ({ id }: { id: number }): Promise<AxiosResponse<UserDto>> => await get(`/users/${id}`);

const createUser = async (newUser: Omit<UserDto, 'id'>): Promise<AxiosResponse<UserDto>> =>
  await post(`/users`, newUser);

const userApi = {
  getUsers,
  getUserById,
  createUser,
};

export default userApi;
