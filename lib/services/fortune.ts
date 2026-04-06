import type { FortuneRequestPayload } from "@/lib/contracts/fortune";
import type { ApiResult } from "@/lib/api-schema";
import type { TuViEngineResult } from "@/lib/bazi/types";
import { postJson } from "@/lib/services/api";

export async function submitFortuneRequest(
  request: FortuneRequestPayload
): Promise<ApiResult<TuViEngineResult>> {
  return postJson<TuViEngineResult, FortuneRequestPayload>("/api/tuvi", request);
}
