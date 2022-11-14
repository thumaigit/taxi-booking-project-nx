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
    signIn: builder.mutation({
      query: (body: SignInBody) => ({
        url: "/driver/sign-in",
        method: "POST",
        body,
      }),
    }),

    findById: builder.mutation({
      query: (id: string) => ({
        url: "/driver/sign-in",
        method: "GET",
      }),
    }),

    updateDriver: builder.mutation({
      query: ({ id, body }) => ({
        url: `/driver/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useFindByIdMutation,
  useUpdateDriverMutation,
} = userApi;
