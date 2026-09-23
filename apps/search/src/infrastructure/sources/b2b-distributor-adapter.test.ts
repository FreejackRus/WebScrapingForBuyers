import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createDistributorSourcesFromEnv,
  listDistributorSpecs,
} from "./b2b-distributor-adapter.js";
import * as merlion from "./merlion-client.js";
import * as netlab from "./netlab-client.js";
import * as ocs from "./ocs-client.js";

const sampleProduct = {
  id: "x",
  brand: "Logitech",
  model: "G102",
  name: "Мышь",
  mpn: "910-004053",
  category: "Мыши",
  characteristics: {},
};

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.DISTRIBUTOR_SOURCES;
  for (const key of [
    "OCS_API_KEY",
    "OCS_SEARCH_PATH",
    "OCS_API_URL",
    "MERLION_API_LOGIN",
    "MERLION_API_PASSWORD",
    "MERLION_API_TEST",
    "NETLAB_API_LOGIN",
    "NETLAB_API_PASSWORD",
    "NETLAB_CLIENT_CODE",
  ]) {
    delete process.env[key];
  }
});

describe("createDistributorSourcesFromEnv", () => {
  it("mounts nothing by default", () => {
    expect(createDistributorSourcesFromEnv()).toEqual([]);
  });

  it("skips listed sources without credentials", () => {
    process.env.DISTRIBUTOR_SOURCES = "ocs,merlion";
    expect(createDistributorSourcesFromEnv()).toEqual([]);
  });

  it("skips OCS without search path", () => {
    process.env.DISTRIBUTOR_SOURCES = "ocs";
    process.env.OCS_API_KEY = "test-key";
    expect(createDistributorSourcesFromEnv()).toEqual([]);
  });

  it("calls OCS client when key and path are set", async () => {
    process.env.DISTRIBUTOR_SOURCES = "ocs";
    process.env.OCS_API_KEY = "test-key";
    process.env.OCS_SEARCH_PATH = "/v2/catalog/products";
    const spy = vi.spyOn(ocs, "searchOcs").mockResolvedValue([]);
    const sources = createDistributorSourcesFromEnv();
    expect(sources).toHaveLength(1);
    expect(sources[0]?.name).toBe("OCS");
    await expect(sources[0]!.search(sampleProduct)).resolves.toEqual([]);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("mounts MERLION live adapter", async () => {
    process.env.DISTRIBUTOR_SOURCES = "merlion";
    process.env.MERLION_API_LOGIN = "BRT1|API";
    process.env.MERLION_API_PASSWORD = "secret";
    const spy = vi.spyOn(merlion, "searchMerlion").mockResolvedValue([]);
    const sources = createDistributorSourcesFromEnv();
    expect(sources[0]?.name).toBe("MERLION");
    await expect(sources[0]!.search(sampleProduct)).resolves.toEqual([]);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("mounts NETLAB without client code", async () => {
    process.env.DISTRIBUTOR_SOURCES = "netlab";
    process.env.NETLAB_API_LOGIN = "api-user";
    process.env.NETLAB_API_PASSWORD = "secret";
    const spy = vi.spyOn(netlab, "searchNetlab").mockResolvedValue([]);
    const sources = createDistributorSourcesFromEnv();
    expect(sources[0]?.name).toBe("NETLAB");
    await expect(sources[0]!.search(sampleProduct)).resolves.toEqual([]);
    expect(spy).toHaveBeenCalledOnce();
  });

  it("documents the expected distributor set", () => {
    const kinds = listDistributorSpecs().map((spec) => spec.kind);
    expect(kinds).toEqual(
      expect.arrayContaining([
        "ocs",
        "merlion",
        "netlab",
        "servermall",
        "onlinetrade",
        "regard",
        "hardprice",
        "srvtrade",
        "torgpc",
      ]),
    );
  });
});

describe("merlion SOAP helpers", () => {
  it("rejects login without |API suffix", async () => {
    await expect(
      merlion.searchMerlion(
        { login: "BRT1", password: "x" },
        sampleProduct,
      ),
    ).rejects.toThrow(/\|API/);
  });
});
