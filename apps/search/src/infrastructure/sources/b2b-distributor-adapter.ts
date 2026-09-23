import type { Product } from "@peremena/contracts";

import type { SourceAdapter } from "../../domain/source-adapter.js";
import { merlionConfigFromEnv, searchMerlion } from "./merlion-client.js";
import { netlabConfigFromEnv, searchNetlab } from "./netlab-client.js";
import { ocsConfigFromEnv, searchOcs } from "./ocs-client.js";

/**
 * Official RU IT B2B / shop integrations. No fake prices.
 * Mounted only when listed in DISTRIBUTOR_SOURCES and required env is present.
 * Without credentials the source stays out of the live collect path.
 * See docs/DISTRIBUTORS.md.
 */
export type DistributorKind =
  | "ocs"
  | "merlion"
  | "netlab"
  | "servermall"
  | "onlinetrade"
  | "regard"
  | "hardprice"
  | "srvtrade"
  | "torgpc";

interface DistributorSpec {
  kind: DistributorKind;
  name: string;
  /** Env keys that must all be non-empty to mount (credentials). */
  requiredEnv: string[];
  status: "needs_credentials" | "stub_pending_api" | "partner_portal" | "live_client";
  hint: string;
}

const DISTRIBUTORS: DistributorSpec[] = [
  {
    kind: "ocs",
    name: "OCS",
    requiredEnv: ["OCS_API_KEY", "OCS_SEARCH_PATH"],
    status: "live_client",
    hint: "OCS B2B REST ready when OCS_API_KEY + OCS_SEARCH_PATH are set.",
  },
  {
    kind: "merlion",
    name: "MERLION",
    requiredEnv: ["MERLION_API_LOGIN", "MERLION_API_PASSWORD"],
    status: "live_client",
    hint: "MERLION SOAP mlservice3 ready when credentials are set.",
  },
  {
    kind: "netlab",
    name: "NETLAB",
    requiredEnv: ["NETLAB_API_LOGIN", "NETLAB_API_PASSWORD"],
    status: "live_client",
    hint: "NETLAB NLDealer REST ready when credentials are set.",
  },
  {
    kind: "servermall",
    name: "Servermall",
    requiredEnv: ["SERVERMALL_API_TOKEN"],
    status: "partner_portal",
    hint: "Servermall: partner/API access required. Stub only.",
  },
  {
    kind: "onlinetrade",
    name: "Онлайнтрейд",
    requiredEnv: ["ONLINETRADE_API_TOKEN"],
    status: "partner_portal",
    hint: "Онлайнтрейд: partner feed/API. Stub only — prefer official channel over scrape.",
  },
  {
    kind: "regard",
    name: "Регард",
    requiredEnv: ["REGARD_API_TOKEN"],
    status: "partner_portal",
    hint: "Регард: no public catalog API in-repo. Stub only.",
  },
  {
    kind: "hardprice",
    name: "Хардпрайс",
    requiredEnv: ["HARDPRICE_API_TOKEN"],
    status: "partner_portal",
    hint: "Хардпрайс: aggregator — needs partner terms. Stub only.",
  },
  {
    kind: "srvtrade",
    name: "СРВТрейд",
    requiredEnv: ["SRVTRADE_API_TOKEN"],
    status: "partner_portal",
    hint: "СРВТрейд: partner access. Stub only.",
  },
  {
    kind: "torgpc",
    name: "ТоргPC",
    requiredEnv: ["TORGPC_API_TOKEN"],
    status: "partner_portal",
    hint: "ТоргPC: partner access. Stub only.",
  },
];

const ALIASES: Record<string, DistributorKind> = {
  ocs: "ocs",
  merlion: "merlion",
  netlab: "netlab",
  servermall: "servermall",
  onlinetrade: "onlinetrade",
  "онлайнтрейд": "onlinetrade",
  regard: "regard",
  "регард": "regard",
  hardprice: "hardprice",
  "хардпрайс": "hardprice",
  srvtrade: "srvtrade",
  "срвтрейд": "srvtrade",
  torgpc: "torgpc",
  "торгpc": "torgpc",
};

export class B2bDistributorStubAdapter implements SourceAdapter {
  readonly name: string;

  constructor(private readonly spec: DistributorSpec) {
    this.name = spec.name;
  }

  async search(_product: Product, _signal?: AbortSignal): Promise<never> {
    throw new Error(this.spec.hint);
  }
}

export class MerlionSourceAdapter implements SourceAdapter {
  readonly name = "MERLION";

  async search(product: Product, signal?: AbortSignal) {
    const config = merlionConfigFromEnv();
    if (!config) throw new Error("MERLION: MERLION_API_LOGIN / MERLION_API_PASSWORD не заданы");
    return searchMerlion(config, product, signal);
  }
}

export class OcsSourceAdapter implements SourceAdapter {
  readonly name = "OCS";

  async search(product: Product, signal?: AbortSignal) {
    const config = ocsConfigFromEnv();
    if (!config) throw new Error("OCS: OCS_API_KEY не задан");
    return searchOcs(config, product, signal);
  }
}

export class NetlabSourceAdapter implements SourceAdapter {
  readonly name = "NETLAB";

  async search(product: Product, signal?: AbortSignal) {
    const config = netlabConfigFromEnv();
    if (!config) throw new Error("NETLAB: NETLAB_API_LOGIN / NETLAB_API_PASSWORD не заданы");
    return searchNetlab(config, product, signal);
  }
}

function envFilled(keys: string[]): boolean {
  return keys.every((key) => Boolean(process.env[key]?.trim()));
}

/**
 * Opt-in via DISTRIBUTOR_SOURCES=ocs,merlion,netlab,...
 * Mounts only when requiredEnv keys are set. No fake prices.
 */
export function createDistributorSourcesFromEnv(): SourceAdapter[] {
  const raw = process.env.DISTRIBUTOR_SOURCES?.trim();
  if (!raw) return [];
  const wanted = new Set(
    raw
      .split(",")
      .map((value) => value.trim().toLocaleLowerCase("ru"))
      .filter(Boolean)
      .map((value) => ALIASES[value] ?? (value as DistributorKind)),
  );
  return DISTRIBUTORS.filter((spec) => wanted.has(spec.kind) && envFilled(spec.requiredEnv)).map(
    (spec) => {
      if (spec.kind === "merlion") return new MerlionSourceAdapter();
      if (spec.kind === "ocs") return new OcsSourceAdapter();
      if (spec.kind === "netlab") return new NetlabSourceAdapter();
      return new B2bDistributorStubAdapter(spec);
    },
  );
}

export function listDistributorSpecs(): readonly DistributorSpec[] {
  return DISTRIBUTORS;
}
