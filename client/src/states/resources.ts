import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosError } from "axios"
import AxiosClient from "./http"
import { Resource } from "@/types"

type Response = {
  result: Resource[]
}

export const useLinks = () => {
  const queryClient = useQueryClient()
  return queryClient.getQueryState<Resource | undefined>(["links"])
}

export const getLinks = () => {
  const query = useQuery<Response, AxiosError>({
    queryKey: ["links"],
    queryFn: () =>
      AxiosClient.get<Response>("/resource/all").then((data) => {
        return data.data
      }),
    retry: 1,
  })

  return query
}

export const createLink = () => {
  const queryClient = useQueryClient()

  const mut = useMutation({
    mutationKey: ["create-link"],
    mutationFn: (link: string) =>
      AxiosClient.post("/resource/shorten", {
        originalURL: link,
      }),

    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["links"] })
    },
  })

  return mut
}
