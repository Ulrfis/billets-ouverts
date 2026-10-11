# Billets ouverts — UX prototype

A single French article page, "Et si… le cinéma embrassait le web ?", with all 10 reading interactions working. The prototype is built for speed and interaction quality, not code quality.

## What gets built

**Article page (at `/`)**
- About 1200 words of invented French essay text, in 5 sections, each split into numbered passages.
- Calm magazine layout: a wide reading column, the right margin kept for marginalia, no sidebar.
- Footer with the CC BY-NC-SA 4.0 notice.

**Interactions**
1. **Avis**: a discreet marker appears on each passage on hover or tap. It offers 4 reactions. Counts show only after you react. A thin margin line marks passages that are getting reactions. A new reaction replaces your previous one (stored in localStorage).
2. **Commentaire**: an optional "Pourquoi ?" field appears after an avis. Submitting sends it to the moderation queue and shows the confirmation message.
3. **Tangente**: from an avis or comment, you can either open a Dialogue seeded with the passage and your reaction, or propose a public tangent, which goes to the moderation queue.
4. **Digressions**: 4 anchored words or passages unfold an inline accordion. It is closed by default, uses a real button with aria-expanded, and works from the keyboard.
5. **Marginalia**: about 6 notes (écho, contrepoint, prolongement), with voice type, source and year, mixing FR/EN sources from before and after 2019. On desktop they sit in the margin, aligned with their passage. On mobile, numbered markers open a bottom panel.
6. **Versions**: a switcher for Original · Brève · Grand format · Relecture · Variation (étudiant en cinéma) · Remix. Versions crossfade, and Original stays pinned as one click away.
7. **Dialogue**: one invitation per section opens a side panel. A consent screen about keeping the transcript comes first; without consent the conversation is ephemeral. Text chat runs through OpenRouter, with a French system prompt limited to the passage, the "carnet" notes and the validated résonances. Voice mode uses Deepgram to transcribe your speech, with a live transcript, and Gradium to speak the answers. If voice fails, the panel falls back to text with a short notice. A mock budget gauge shows "x $ / 30 $ ce mois".
8. **Généalogie**: a small tree panel listing the Original, its versions, remixes and published tangents, with contributors and dates.
9. **Contribution**: a form opened from any passage or from the end of the article. Fields: type (note, commentaire, résonance + URL, tangente), name or pseudonym, optional email, and a checkbox accepting the licence and moderation. Submitting shows the confirmation message.
10. **Modération**: a `/moderation` page showing avis counts per passage and the queue of pending items, with Approuver/Rejeter buttons. Approved résonances feed into the Dialogue context.

**Look and feel**
- Fonts: Playfair Display for titles, Roboto for body text, Oswald for small labels.
- Colors: blue #1e73be, accents #e06f0d / #dd9933 / #d3347b, greys as specified, all mapped to design tokens and kept to AA contrast.
- Motion: soft transitions that turn off when reduced motion is preferred.

## Integrations and keys
- **Notion**: uses Lovable's Notion connector, which replaces NOTION_TOKEN. A NOTION_PAGE_ID secret names the page. The page's text replaces the essay's passages, and the built-in mock text is used whenever the fetch fails or isn't set up.
- **Keys**: OPENROUTER_API_KEY, DEEPGRAM_API_KEY and GRADIUM_API_KEY are stored as secrets and used only on the server.
- **Missing keys**: a small status check tells the app which features are available. Without a key, that feature turns off with a short notice in French.
- **No Lovable Cloud and no accounts**: avis, the moderation queue and consent are stored in localStorage only.

## Technical details
- Routes: `src/routes/index.tsx` (article) and `src/routes/moderation.tsx`.
- Data: `src/data/billet.ts` holds sections, passages, digressions, marginalia, versions, genealogy and carnet.
- State: a small localStorage store (`src/lib/store.ts`) shared through a React hook.
- Server functions (`src/lib/*.functions.ts`):
  - `getNotionContent`: connector gateway, Notion-Version 2025-09-03, fetches the page's child blocks and turns paragraphs into passages.
  - `getFeatureStatus`: reports which secrets are set, as booleans only.
  - `dialogueReply`: OpenRouter chat completions with a cheap fast model, using the passage, carnet and approved résonances as context.
  - `transcribe`: Deepgram pre-recorded `/v1/listen` with the language set to fr. The browser records with MediaRecorder in push-to-talk mode; interim text is shown while recording and the final transcript afterwards.
  - `speak`: Gradium TTS REST, returning audio as base64. The exact endpoint will be confirmed from Gradium's docs during the build.
- UI: shadcn primitives (Sheet, Accordion, Tabs, Dialog, Popover), with aria labels throughout.
- The head metadata on both routes gets French titles and descriptions.
