import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://autok.ifleet.hu',
  prepareHeaders: (headers) => {
    const credentials = btoa('icelldeveltest:jUXgTtluAgshn1mDZnkB');
    headers.set('Authorization', `Basic ${credentials}`);
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery,
  keepUnusedDataFor: 86400,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: (builder) => ({
    getCars: builder.query<any, string>({
      query: (sessionId) => `/develbeugro?sessionId=${sessionId}`,
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;
