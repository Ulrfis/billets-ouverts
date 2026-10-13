<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Billets ouverts prototype: reader state in localStorage (src/lib/store.ts), external APIs (Notion, OpenRouter, Deepgram, Gradium) only via server functions in src/lib/api.functions.ts — keys stay server-side and features degrade when a key is missing.
- Notion integration uses a raw integration key (NOTION_API_KEY) calling api.notion.com directly with Notion-Version 2025-09-03 — NOT the connector gateway. getNotionContent loads the billet page plus its cover and explicitly related category rows; src/data/billet.ts is the fallback when the key is absent or the fetch fails. Only public contributor display fields are returned, keeping contact details private.
- RelatedPanel presents linked reading materials separately from the article header; it does not expose retired journalistic variants, keeping the original article authoritative.
- Notion property parsing lives in a browser-safe utility with focused tests so uploaded and external GIF covers retain their original URLs and animation.
- Maintain README.md as the factual product/reference document, STORY.md as the development narrative, and CHANGELOG.md as the append-only change history; keep regeneration instructions and the Notion sync draft aligned with verified behavior without claiming an external sync occurred.
- ReaderProvider and ReaderFrame wrap the shared Outlet; browser preferences load only after hydration, so sidebar continuity spans routes without SSR storage mismatches.
- Pass reading interactivity explicitly to article and passage renderers: omit application-added paragraph controls in quiet mode while preserving source Notion blocks and editorial annotations.
- Keep interactive passage actions behind an explicitly toggled compact disclosure so saved traces or reactions never automatically expand the reading controls.
- Notion editorial rendering uses browser-safe structured blocks with stable Notion IDs, bounded recursive reads, and separate annotations; never inject markers into original paragraphs. Demo inserts remain only in the fallback article.
- Linked callout reads must re-authorize their block and explicit destination against the pilot on the server; nested linked callouts are inert to prevent cycles and private arbitrary-page reads.
- Only explicit editorial fragment comments or explicitly related fallback rows may become public annotations; ordinary comments and author data stay private, and missing comment permissions must not interrupt reading.
- Uploaded sidebar media uses asset pointers plus fixed-frame derivatives; render only visible media and honor reduced-motion before animation begins.
- Dream and dialogue configuration is resolved from the explicit Organique IA usage row through the existing server API boundary; browser-safe defaults and field validation preserve current behavior when Notion fails, with only public dream control limits exposed to the browser.
- AI generation is awaited without artificial request deadlines; audio and microphone resources stop when their reading panel closes, and async results from closed panels are ignored to prevent surprise playback.
- The dream allowance parser is browser-safe and validates local counters; daily allowances remain prototype-only, never a server spending guarantee.
- Trace transformations stay in the browser-safe pure traces module and are persisted through the existing reader store, keeping compatibility and selection behavior independently testable.
- The day immersion is a lazy, browser-only R3F scene with physical transmission and a locally generated reflection environment; keep the article SSR and all world/jaw layers confined to the reading region so the sidebar remains interactive and no external environment download is required.
- Day-world quotations read the explicitly authorized Résonances source through getIceQuotes, exposing only complete Citation and Année via a tested pure parser; do not broaden other relation-based reads or substitute invented quotations on failure.
