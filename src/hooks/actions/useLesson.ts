import { IFiltersRequestParams, IPaginationMeta } from "../interfaces/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getAxios } from "./axios";
import { IArticle, ICategory, ITopic } from "../interfaces/lesson";

export function useCategory(filterParams?: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    IPaginationMeta<ICategory>,
    AxiosError
  >({
    queryKey: ["get-categories", filterParams],
    queryFn: () =>
      getAxios({
        url: "/categories/get-all",
        filterParams,
      }),
    gcTime: 600000,
  });

  const isEmpty = Array.isArray(data?.results)
    ? data?.results?.length === 0
    : !data;

  return {
    categories: data,
    catLoading: isLoading,
    catFetching: isFetching,
    catError: error,
    catEmpty: isEmpty,
    catRefetch: refetch,
  };
}

interface ArtProp {
  filterParams?: IFiltersRequestParams;
  catId: string;
}

export function useArticle({ filterParams, catId }: ArtProp) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    IPaginationMeta<IArticle>,
    AxiosError
  >({
    queryKey: ["get-article", catId, filterParams],
    queryFn: () =>
      getAxios({
        url: `/articles/${catId}`,
        filterParams,
      }),
    enabled: !!catId,
  });

  const isEmpty = Array.isArray(data?.results)
    ? data?.results?.length === 0
    : !data;

  return {
    article: data,
    artLoading: isLoading,
    artFetching: isFetching,
    artError: error,
    artEmpty: isEmpty,
    artRefetch: refetch,
  };
}
export function useTopic(filterParams?: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    IPaginationMeta<ITopic>,
    AxiosError
  >({
    queryKey: ["get-topic", filterParams],
    queryFn: () =>
      getAxios({
        url: "/topics/get-all",
        filterParams,
      }),
    gcTime: 600000,
  });

  const isEmpty = Array.isArray(data?.results)
    ? data?.results?.length === 0
    : !data;

  return {
    topic: data,
    topicLoading: isLoading,
    topicFetching: isFetching,
    topicError: error,
    topicEmpty: isEmpty,
    topicRefetch: refetch,
  };
}
