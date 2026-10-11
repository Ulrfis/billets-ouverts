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
- Billets ouverts prototype: content is mock data in src/data, reader state in localStorage (src/lib/store.ts), external APIs (Notion, OpenRouter, Deepgram, Gradium) only via server functions in src/lib/api.functions.ts — keys stay server-side and features degrade when a key is missing.
