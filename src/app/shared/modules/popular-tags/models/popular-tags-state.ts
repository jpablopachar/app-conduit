import { PopularTag } from "src/app/shared/models/PopularTag";

export interface PopularTagsState {
  data: PopularTag[] | null;
  isLoading: boolean;
  error: string | null;
}