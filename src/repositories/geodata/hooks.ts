import { ApiResponse } from "@/utils/apiResponse"
import {
  UseMutationOptions, UseQueryOptions, useMutation, useQuery,
} from "react-query"
import { GeoData } from "./schema"

export const useGetGeodatas = (
  opts?: UseQueryOptions<ApiResponse<GeoData[]>, Error>,
) => {
  const dataFetching = async () => {
    const response = await fetch("/api/geodatas")
    const data = await response.json()
    return data
  }

  return useQuery<ApiResponse<GeoData[]>, Error>(
    ["GeoData.get.list"],
    async () => {
      return dataFetching()
    },
    opts,
  )
}

export const useGetGeodataById = (
  id: string,
  opts?: UseQueryOptions<ApiResponse<GeoData[]>, Error>,
) => {
  const dataFetching = async () => {
    const response = await fetch(`/api/geodatas/${id}`)
    const data = await response.json()
    return data
  }

  return useQuery<ApiResponse<GeoData[]>, Error>(
    ["GeoData.get.detail", id],
    async () => {
      return dataFetching()
    },
    opts,
  )
}

export const useAddGeodata = (
  opts?: UseMutationOptions<
    ApiResponse<GeoData>,
    Error,
    { body: GeoData }
  >,
) => {
  const saveData = async (body: GeoData) => {
    const response = await fetch("/api/geodatas", {
      method: "POST",
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return data
  }

  return useMutation(async ({ body }) => saveData(body), opts)
}
