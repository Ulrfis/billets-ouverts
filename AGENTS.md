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
- RelatedPanel presents linked reading materials and version access separately from the article header, keeping the reading view uncluttered.
- Notion property parsing lives in a browser-safe utility with focused tests so uploaded and external GIF covers retain their original URLs and animation.
