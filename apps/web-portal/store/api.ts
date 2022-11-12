// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),

  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (body) => ({
        url: "/appointment",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateAppointmentMutation } = userApi;
