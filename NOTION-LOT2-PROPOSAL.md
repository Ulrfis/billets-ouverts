# Lot 2 — ajouts éditoriaux proposés, non envoyés

## État vérifié le 2026-10-12

Lecture seule du billet pilote : 14 citations, 88 paragraphes, 6 titres, 2 images, 3 éléments de liste, 1 callout avec 3 citations enfants et 1 séparateur. Le callout actuel n’a pas de lien vers une autre page. Les commentaires répondent `403 restricted_resource` : leur capacité de lecture n’est pas accordée à l’intégration actuelle.

Les blocs existants sont rendus avec leurs identifiants, liens et mise en forme. Le séparateur ouvre la porte de démonstration. Les 106 blocs textuels non vides (paragraphes, citations et listes, enfants compris) ont été comparés à Notion et sont identiques. Aucun bloc, commentaire ou base Notion n’a été créé/modifié.

## Ajouts à approuver séparément

1. Ajouter un **nouveau callout**, sans modifier le callout existant, avec une mention de page Notion ou un lien Notion vers une page éditoriale explicitement publique. Proposition de libellé : « Du château fort à la ville moderne ». La destination doit être confirmée avant écriture ; aucune page privée ne doit être liée. Le lecteur charge son corps à l’ouverture, ne permet pas d’ouvrir les callouts imbriqués et refuse un lien vers le billet lui-même.
2. Ajouter un **second séparateur**, à un emplacement validé par Ulrich ; ne déplacer ni réécrire les phrases. Le premier séparateur existe déjà.
3. Ajouter une petite table **Repères éditoriaux**, reliée au billet par une propriété relation portant ce nom, puisque les commentaires ne sont pas accessibles. Champs proposés : `Titre` (titre), `Bloc` (texte contenant l’ID Notion), `Extrait exact` (texte), `Mot-clé` (texte), `Lien` (URL facultative). Seules les lignes explicitement reliées au billet sont lues.

### Trois fragments candidats

| Extrait proposé | Mot-clé proposé | Validation requise |
|---|---|---|
| « une énorme photocopieuse » | Distribution | Vérifier l’extrait exact et confirmer le bloc cible |
| « coup de réglementations » | Réglementation | Vérifier l’extrait exact et confirmer le bloc cible |
| « Walking the Edit » | Expérience | Vérifier l’extrait exact et confirmer le bloc cible |

Les extraits ne sont jamais injectés dans le texte. Si l’extrait manque ou apparaît plusieurs fois dans le bloc cible, aucun repère n’est affiché. La collecte personnelle appartient au lot 3, pas à ce lot.

### Option commentaires si la capacité est accordée

Seuls les commentaires explicitement désignés par cette grammaire sont interprétés :

```text
billet-fragment: {"extrait":"une énorme photocopieuse","motCle":"Distribution","lien":"https://exemple-public.fr"}
```

Le lien ci-dessus illustre le format ; il ne sera pas écrit tel quel. Aucun commentaire ordinaire, auteur, e-mail ou autre donnée privée n’est renvoyé au lecteur. Les commentaires résolus ne sont pas pris en charge. Le repli relationnel évite de dépendre des commentaires.

## Structures futures proposées, non créées

- **Citations** : texte exact, auteur, œuvre/source, date ou année, URL publique, mots-clés, validation éditoriale, billet lié. Alimentera les glaçons au lot 4 ; aucune attribution inventée.
- **Prompts** : nom, texte du prompt, usage (rêve), statut validé, version, références publiques. Ne contient aucune clé privée ; activation IA et protection des coûts relèvent du lot 5.

## Validation encore attendue

Accord distinct sur les ajouts, pages cibles et emplacements. Après les écritures approuvées, vérifier une vraie page liée et les repères par relecture dans l’interface, sans changement de code. Tant qu’ils ne sont pas créés, le parcours réel callout lié/fragments du pilote reste non validé ; les tests automatisés utilisent des fixtures.