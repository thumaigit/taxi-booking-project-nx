// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SignInBody {
  phone: string;
  password: string;
}

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

    GetAllAppointment: builder.mutation({
      query: () => ({
        url: "/appointment",
        method: "GET",
      }),
    }),

    updateAppointment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/appointment/${id}`,
        method: "PUT",
        body,
      }),
    }),

    findDriverByAppointment: builder.mutation({
      query: (id) => ({
        url: `/driver-appointment?appointmentId=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentMutation,
  useUpdateAppointmentMutation,
  useFindDriverByAppointmentMutation,
} = userApi;
