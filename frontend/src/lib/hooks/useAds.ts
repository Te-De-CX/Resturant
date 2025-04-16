import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdsApi } from '../api/ads';
import { Ads } from '../types/api/ads';

export const useAds = () => {
  const queryClient = useQueryClient();

  // Get all ads
  const useGetAllAds = () => {
    return useQuery<Ads[], Error>({
      queryKey: ['ads'],
      queryFn: AdsApi.getAllOrders,
    });
  };

  // Get ad by ID
  const useGetAdById = (id: number) => {
    return useQuery<Ads, Error>({
      queryKey: ['ads', id],
      queryFn: () => AdsApi.getOrderById(id),
      enabled: !!id, // Only fetch if ID exists
    });
  };

  // Get ads by user
  const useGetAdsByUser = (userId: number) => {
    return useQuery<Ads[], Error>({
      queryKey: ['ads', 'user', userId],
      queryFn: () => AdsApi.getAdsByUser(userId),
      enabled: !!userId, // Only fetch if userId exists
    });
  };

  // Create new ad
//   const useCreateAd = () => {
//     return useMutation<Ads, Error, CreateAdsData>({
//       mutationFn: AdsApi.createAds,
//       onSuccess: (newAd) => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries({ queryKey: ['ads'] });
//         // Optionally update cache directly for immediate UI update
//         queryClient.setQueryData<Ads[]>(['ads'], (oldAds = []) => [...oldAds, newAd]);
//       },
//     });
//   };

  // Update ad status
//   const useUpdateAdStatus = (id: number) => {
//     return useMutation<Ads, Error, { status: 'active' | 'inactive' | 'pending' }>({
//       mutationFn: (data) => AdsApi.updateAdstatus(id, data.status),
//       onSuccess: (updatedAd) => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries({ queryKey: ['ads'] });
//         queryClient.invalidateQueries({ queryKey: ['ads', id] });
//         // Optionally update cache directly
//         queryClient.setQueryData<Ads>(['ads', id], updatedAd);
//       },
//     });
//   };

  // Delete ad
  const useDeleteAd = () => {
    return useMutation<void, Error, number>({
      mutationFn: AdsApi.deleteAds,
      onSuccess: (_, id) => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['ads'] });
        // Optionally remove from cache
        queryClient.setQueryData<Ads[]>(['ads'], (oldAds = []) => 
          oldAds.filter(ad => ad.id !== id)
        );
      },
    });
  };

  return {
    useGetAllAds,
    useGetAdById,
    useGetAdsByUser,
    // useCreateAd,
    // useUpdateAdStatus,
    useDeleteAd,
  };
};