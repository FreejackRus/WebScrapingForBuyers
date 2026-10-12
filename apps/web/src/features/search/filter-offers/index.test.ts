import type { Offer } from "@peremena/contracts";
import { describe, expect, it } from "vitest";

import { channelView } from "./index";

const row = (source: string) => ({ source }) as Offer;

describe("channelView", () => {
  it("counts distributor and marketplace rows", () => {
    expect(channelView([row("NETLAB"), row("СРВТрейд"), row("Ozon")], undefined)).toEqual({
      channel: "marketplace",
      counts: { marketplace: 1, distributor: 2 },
    });
  });

  it("opens distributors when marketplaces found nothing, and keeps the buyer's pick", () => {
    expect(channelView([row("Servermall")], undefined).channel).toBe("distributor");
    expect(channelView([row("Ozon")], "distributor").channel).toBe("distributor");
  });
});
