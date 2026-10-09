import { offerAvailabilityStatus, type AnalysisResult, type AnalyzeRequest, type Offer, type OfferTableFilter, type SearchSnapshot } from "@peremena/contracts";
import { extractSearchQuery, parseMaxPrice, parseSources, wantsInStock } from "./prompt-intent.js";

type Context = AnalyzeRequest["context"];
const explicitSearch = /^(?:найди(?:те)?|найти|поищи(?:те)?|ищи|запусти(?:те)?\s+поиск|новый\s+поиск|собери\s+предложени[а-яё]*|уточни(?:те)?\s+модель|покажи\s+(?:реальн[а-яё]*\s+)?предложени[а-яё]*\s+по)(?=\s|$)/iu;
export function commandText(prompt: string): string {
  return prompt.trim().replace(/^(?:привет|здравствуй(?:те)?|добрый\s+(?:день|вечер|утро))[,! .]+/iu, "").replace(/^пожалуйста[,\s]+/iu, "").replace(/^теперь\s+/iu, "").replace(/^ищем(?=\s|$)/iu, "найди");
}
export function explicitSearchQuery(prompt: string): string | undefined {
  const text = commandText(prompt);
  if (!explicitSearch.test(text) && !/^(?:i[3579][- ])?1\d{4}(?:kf|ks|k|f|t)?[.!?]?$/iu.test(text)) return undefined;
  const query = extractSearchQuery(text).replace(/[.!?]+$/u, "").trim();
  return query.length >= 2 && query.length <= 200 ? query : undefined;
}
export function filterOffers(offers: Offer[], filter: OfferTableFilter = {}): Offer[] {
  return offers.filter(o => o.assessment?.group !== "needs_review" && o.priceAnomaly !== "too_low")
    .filter(o => !filter.realOnly || !o.demo)
    .filter(o => !filter.sources?.length || filter.sources.some(s => o.source.toLocaleLowerCase("ru").includes(s.toLocaleLowerCase("ru"))))
    .filter(o => filter.maxPrice === undefined || o.price <= filter.maxPrice)
    .filter(o => !filter.inStockOnly || offerAvailabilityStatus(o) === "in_stock")
    .filter(o => !filter.packaging || titleHas(o.title,filter.packaging))
    .filter(o => !filter.titleIncludeAny?.length || filter.titleIncludeAny.some(s => titleHas(o.title,s)))
    .filter(o => !filter.titleExcludeAny?.some(s => titleHas(o.title,s)));
}
function titleHas(title: string, token: string): boolean {
  if (/^(?:box|oem)$/iu.test(token)) return new RegExp(`(?:^|[^a-z0-9])${token}(?=$|[^a-z0-9])`,"iu").test(title);
  return title.toLocaleLowerCase("ru").includes(token.toLocaleLowerCase("ru"));
}
function base(summary: string, intent: AnalysisResult["intent"] = "help"): AnalysisResult {
  return {summary,intent,selectedOfferIds:[],appliedFilters:[],warnings:[],citations:[],provider:"Помощник закупок Price Radar"};
}
function clarification(question: string): AnalysisResult {return {...base(question),clarificationQuestion:question};}
function references(rows: Offer[]) {
  return rows.filter(o=>/^https?:\/\//iu.test(o.url)).map(o=>({offerId:o.id,url:o.url,label:`${o.source} — открыть предложение`}));
}
function price(o: Offer): string {return `${o.price.toLocaleString("ru-RU")} ₽`;}

/** Commands use server facts; ambiguous references ask instead of changing the current search. */
export function routeProcurementDialogue(snapshot: SearchSnapshot | undefined, prompt: string, context?: Context): AnalysisResult | undefined {
  const text = commandText(prompt);
  const query = explicitSearchQuery(prompt);
  const detailQuestion = /гарант|комплектац|что.*(?:коробк|входит)|содержим|чем.*отлич|разниц/iu.test(text);
  const packagingValues = [...text.matchAll(/(?:^|[^a-z0-9])(box|oem)(?=$|[^a-z0-9])/giu)].map(m => m[1]!.toUpperCase());
  const budgetValues = [...text.matchAll(/(?:до|дешевле|ниже|меньше|<)\s*\d+(?:[\s\u00a0]?\d+)*(?:[.,]\d{1,2})?(?:\s*(?:тыс[а-яё.]*|k|к))?/giu)].map(m => parseMaxPrice(m[0].toLocaleLowerCase("ru")));
  if (!detailQuestion && (new Set(packagingValues).size > 1 || new Set(budgetValues).size > 1 || (wantsInStock(text.toLocaleLowerCase("ru")) && /под\s+заказ/iu.test(text))))
    return clarification("Какое одно условие оставить: упаковку, предел цены или наличие? Уточните противоречащие условия.");
  if (/до\s*\d+\s*(?:года|год|г\.)/iu.test(text))
    return clarification("Вы имеете в виду год выпуска или ограничение по цене? Уточните это условие.");
  const clearPrice = /^(?:убери|сними)\s+ограничение\s+по\s+цене[.!]?$/iu.test(text);
  const clearAll = /^(?:покажи\s+все\s+варианты|сбрось\s+фильтры)[.!]?$/iu.test(text);
  const allowOrder = /^(?:и\s+)?под\s+заказ\s+тоже[.!]?$/iu.test(text);
  const statusQuestion = /^(?:что\s+мы\s+сейчас\s+ищем|какие\s+фильтры\s+сейчас)[?!.]*$/iu.test(text);
  if (clearPrice || clearAll || allowOrder || statusQuestion) {
    if (!snapshot) return clarification("Какой товар нужно уточнить? Укажите модель или сначала запустите поиск.");
    if (statusQuestion) return {...base(currentDialogueSummary(snapshot, context?.tableFilter)), warnings:collectionWarnings(snapshot)};
    const updated: OfferTableFilter = clearAll ? {realOnly:true} : {...context?.tableFilter,realOnly:true};
    delete updated.selectedOfferIds;
    if (clearPrice) delete updated.maxPrice;
    if (allowOrder) delete updated.inStockOnly;
    return {...base(clearAll ? "Фильтры сброшены. Показываю все реальные варианты текущего товара." : clearPrice ? "Ограничение по цене снято. Остальные условия сохранены." : "Разрешил варианты под заказ и с неизвестным наличием. Остальные условия сохранены.", "filter"), tableFilter:updated, warnings:collectionWarnings(snapshot)};
  }
  if (/^(?:привет|здравствуй(?:те)?|добрый\s+(?:день|вечер|утро)|спасибо|благодарю)[! .]*$/iu.test(prompt.trim()))
    return base(/спасибо|благодарю/iu.test(prompt) ? "Пожалуйста! Можете уточнить условия или попросить объяснить выбор." : snapshot ? `Здравствуйте! Сейчас ищем «${snapshot.product.name}». Чем помочь?` : "Здравствуйте! Напишите модель товара — помогу найти предложения.");
  if (query && /^(?:(?:такой|такой же|другой|этот|подешевле|получше|дешевле|замену)(?:\s+(?:товар|процессор|вариант))?)[?!.]*$/iu.test(query))
    return clarification("Уточнить текущий товар или найти другую модель? Напишите модель либо нужное отличие.");
  if (/\b(?:не|без)\b/iu.test(text) || /(?:^|\s)(?:не|без)\s+(?:box|oem|в наличии|наличи)/iu.test(text)) {
    if (/box|oem|наличи/iu.test(text)) return clarification("Какое условие оставить: BOX, OEM или наличие? Напишите один нужный вариант без отрицания.");
  }
  if (query) {
    const parsed = cpuSearchConditions(query);
    if (!parsed && /(?:^|\s)(?:box|oem|до\s+\d+(?:[.,]\d+)?(?:\s*[kк])?|только\s+в\s+наличии|под\s+заказ)(?=$|\s|[,?!.])/iu.test(query))
      return clarification("Напишите модель отдельно от условий поиска. Какой товар нужно найти?");
    const cleanQuery = parsed?.query ?? query;
    return {...base(`Запускаю поиск «${cleanQuery}». Предложения появятся по мере ответа поставщиков.`,"search"), searchQuery:cleanQuery,tableFilter:parsed?.filter ?? {realOnly:true}, appliedFilters:[`Новый поиск по запросу «${cleanQuery}».`]};
  }
  const packaging = text.match(/(?:^|[^a-z0-9])(box|oem)(?=$|[^a-z0-9])/iu)?.[1]?.toUpperCase();
  const maxPrice = parseMaxPrice(text.toLocaleLowerCase("ru"));
  const stock = wantsInStock(text.toLocaleLowerCase("ru"));
  const why = /почему\s+(?:этот|он|именно)|объясни\s+(?:этот|выбор)/iu.test(text);
  const requestedSources = parseSources(text.toLocaleLowerCase("ru"));
  const refinement = Boolean(packaging && !detailQuestion) || maxPrice !== undefined || stock || (requestedSources.length > 0 && /только|оставь/iu.test(text));
  if (!snapshot && (refinement || why || detailQuestion)) return clarification("Какой товар нужно уточнить? Укажите модель или сначала запустите поиск.");
  if (/(?:другой|такой же|этот|такой)\s*(?:товар|процессор|вариант)?[?!.]*$/iu.test(text) && !why && !refinement && !detailQuestion)
    return clarification("Уточнить текущий товар или найти другую модель? Напишите модель либо нужное отличие.");
  if (!snapshot) return undefined;
  const current = context?.tableFilter ?? {};
  if (refinement && !detailQuestion) {
    const merged: OfferTableFilter = {...current,realOnly:true};
    delete merged.selectedOfferIds;
    if (packaging) {
      merged.packaging=packaging as "BOX"|"OEM";
      const previous=(merged.titleIncludeAny ?? []).filter(t=>!/^(?:BOX|OEM)$/iu.test(t));
      if(previous.length) merged.titleIncludeAny=previous;
      else delete merged.titleIncludeAny;
    }
    if (maxPrice !== undefined) merged.maxPrice = maxPrice;
    if (stock) merged.inStockOnly = true;
    const sources = parseSources(text.toLocaleLowerCase("ru"));
    if(sources.length) merged.sources = sources;
    const rows = filterOffers(snapshot.offers,merged).sort((a,b)=>a.price-b.price);
    // Absence of reported stock must not be mistaken for absence of the product.
    if(stock && rows.length === 0) return {...base("В текущих предложениях нет подтверждённого наличия по этим условиям. Неизвестный остаток и товары под заказ не считаются доступными; результаты сохранены."),warnings:collectionWarnings(snapshot)};
    return {...base(rows.length ? `Фильтр применён. Подходящих предложений: ${rows.length}. Минимальная цена среди них: ${price(rows[0]!)}.` : "По заданным условиям предложений не найдено.","filter"),tableFilter:merged,selectedOfferIds:rows.map(o=>o.id),citations:references(rows),appliedFilters:["Условия применены к текущему товару; прежние ограничения сохранены."],warnings:[...collectionWarnings(snapshot), ...(stock && snapshot.offers.some(o=>offerAvailabilityStatus(o)==="unknown") ? ["Часть источников не сообщает наличие; такие предложения скрыты."] : [])]};
  }
  if (detailQuestion || why) {
    let rows=filterOffers(snapshot.offers,current).filter(o=>!o.demo);
    const ids = context?.selectedOfferIds?.length ? context.selectedOfferIds : current.selectedOfferIds;
    if(ids?.length) rows=rows.filter(o=>ids.includes(o.id));
    if(packaging) rows=rows.filter(o=>titleHas(o.title,packaging));
    rows=rows.sort((a,b)=>a.price-b.price).slice(0,5);
    if(!rows.length) return {...base("В текущих результатах нет подходящего предложения для объяснения. Уточните модель или фильтры."),warnings:collectionWarnings(snapshot)};
    const summary=detailQuestion ? rows.map(o=>`${o.title}: гарантия — ${o.warranty?.trim() || "не указана"}. Комплектация в данных предложения не указана; обозначение BOX/OEM не подтверждает содержимое коробки.`).join("\n")
      : rows.map(o=>`${o.title}: ${price(o)}; наличие по данным источника — ${o.availability}. ${o.assessment?.reasons.join("; ") || "Совпадение по данным карточки"}. Выбор основан на текущих условиях и цене; наличие требует подтверждения перед закупкой.`).join("\n");
    return {...base(summary,"explain"),selectedOfferIds:rows.map(o=>o.id),citations:references(rows),appliedFilters:["Объяснение текущего выбора; фильтры сохранены."],warnings:collectionWarnings(snapshot)};
  }
  return undefined;
}
function collectionWarnings(snapshot: SearchSnapshot): string[] {return snapshot.status === "running" ? ["Сбор ещё идёт — ответ основан только на уже полученных предложениях."] : [];}

/** Only well-known CPU model tokens can be separated safely from spoken conditions. */
function cpuSearchConditions(query: string): {query:string;filter:OfferTableFilter} | undefined {
  const match = query.match(/^((?:процессор\s+)?(?:intel\s+)?(?:core\s+)?(?:i[3579][- ])?1\d{4}(?:kf|ks|k|f|t)?)[`»"”]?\s*(.*)$/iu);
  if (!match) return undefined;
  const suffix = match[2]!.replace(/[,;](?!\d)/gu," ");
  const remaining = suffix.replace(/(?:^|\s)(?:box|oem)(?=$|\s)/giu," ")
    .replace(/(?:до|дешевле|ниже|меньше|<)\s*\d+(?:[\s\u00a0]?\d+)*(?:[.,]\d{1,2})?(?:\s*(?:тыс[а-яё.]*|k|к))?(?:\s*(?:руб(?:лей)?|₽))?/giu," ")
    .replace(/(?:только\s+)?в\s+наличии/giu," ").replace(/(?:^|\s)и(?=$|\s)/giu," ").replace(/[,;.!?]/gu," ").trim();
  if (remaining) return undefined;
  const filter: OfferTableFilter = {realOnly:true};
  const packaging = suffix.match(/(?:^|\s)(box|oem)(?=$|\s)/iu)?.[1];
  if (packaging) filter.packaging=packaging.toUpperCase() as "BOX"|"OEM";
  const maxPrice = parseMaxPrice(suffix.toLocaleLowerCase("ru"));
  if (maxPrice !== undefined) filter.maxPrice=maxPrice;
  if (wantsInStock(suffix.toLocaleLowerCase("ru"))) filter.inStockOnly=true;
  return {query:match[1]!,filter};
}
function currentDialogueSummary(snapshot: SearchSnapshot, filter: OfferTableFilter = {}): string {
  const conditions: string[] = [];
  if (filter.packaging) conditions.push(filter.packaging);
  if (filter.maxPrice !== undefined) conditions.push(`до ${filter.maxPrice.toLocaleString("ru-RU")} ₽`);
  if (filter.inStockOnly) conditions.push("только подтверждённое наличие");
  if (filter.sources?.length) conditions.push(`поставщики: ${filter.sources.join(", ")}`);
  if (filter.titleIncludeAny?.length) conditions.push(`в названии: ${filter.titleIncludeAny.join(", ")}`);
  if (filter.titleExcludeAny?.length) conditions.push(`исключены: ${filter.titleExcludeAny.join(", ")}`);
  if (filter.selectedOfferIds?.length) conditions.push(`выбрано предложений: ${filter.selectedOfferIds.length}`);
  return `Ищем «${snapshot.product.name}». Условия: ${conditions.length ? conditions.join("; ") : "без дополнительных ограничений"}. ${snapshot.status === "running" ? "Сбор ещё идёт." : snapshot.status === "complete" ? "Сбор завершён." : "Сбор завершился с ошибкой."}`;
}
