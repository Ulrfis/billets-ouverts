import { queryOptions } from "@tanstack/react-query";
import { getDreamSettings } from "./api.functions";

export const dreamSettingsQuery = queryOptions({
  queryKey: ["organique-ia", "reve.nuit"],
  queryFn: () => getDreamSettings(),
  staleTime: 0,
  refetchOnWindowFocus: true,
});