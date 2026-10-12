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
- Notion editorial rendering uses browser-safe structured blocks with stable Notion IDs, bounded recursive reads, and separate annotations; never inject markers into original paragraphs. Demo inserts remain only in the fallback article.
- Linked callout reads must re-authorize their block and explicit destination against the pilot on the server; nested linked callouts are inert to prevent cycles and private arbitrary-page reads.
- Only explicit editorial fragment comments or explicitly related fallback rows may become public annotations; ordinary comments and author data stay private, and missing comment permissions must not interrupt reading.
- Uploaded sidebar media uses asset pointers plus fixed-frame derivatives; render only visible media and honor reduced-motion before animation begins.
