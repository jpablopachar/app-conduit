import { GetFeedResponse } from "./GetFeedResponse";

export interface FeedState {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponse | null;
}