import type { DisabledSearchSource } from "@peremena/contracts";

/** Temporary product policy; leave the DNS adapter intact for a later reactivation. */
const disabledSources: readonly DisabledSearchSource[] = [
  { name: "DNS", reason: "Временно недоступен" },
];

export function isSourceDisabled(name: string): boolean {
  return ["dns", "днс", "dns-shop", "dns-shop.ru", "www.dns-shop.ru"].includes(name.trim().toLocaleLowerCase("ru"));
}

export function listDisabledSources(): DisabledSearchSource[] {
  return disabledSources.map((source) => ({ ...source }));
}
