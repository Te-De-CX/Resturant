import {apiClient} from './apiClient';

export const userApi = {
  getAllUsers: async () => {
    const response = await apiClient.get('/users/');
    return response.data;
  },
  getUserById: async (id: number) => {
    const response = await apiClient.get(`/users/${id}/`);
    return response.data;
  },
  //any not string
  updateUser: async (id: number, userData: string) => {
    const response = await apiClient.patch(`/users/${id}/`, userData);
    return response.data;
  },
  uploadProfilePicture: async (id: number, image: File) => {
    const formData = new FormData();
    formData.append('profile_picture', image);
    const response = await apiClient.patch(`/users/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};