import { QueryClient, queryOptions } from "@tanstack/react-query";
import { fetchCake, fetchCakes } from "./http";

export const queryClient = new QueryClient();

export const cakeDetailsQuery = (cakeID) =>
  queryOptions({
    queryKey: ["cake", cakeID],
    queryFn: ({ signal }) => fetchCake({ signal, cakeID: cakeID }),
    staleTime: 1000 * 60 * 2, //two minutes
  });

export const cakesListQuery = () =>
  queryOptions({
    queryKey: ["cakes"],
    queryFn: ({signal})=>fetchCakes({signal}),//get and pass abort signal if navigating away from page before result has been returned.
    staleTime: 1000 * 60 * 2, //two minutes
  });
