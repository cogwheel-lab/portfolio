import { createApi } from "unsplash-js";

export const unsplash = createApi({
  // .env.localに保存した変数名を指定します
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "",
});
