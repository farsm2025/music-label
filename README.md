# Governance Records

Site musical migré vers **Next.js 16 (App Router) et React 19**, prêt à être déployé sur Vercel. Interface sombre et éditoriale, responsive, sans jQuery ni serveur PHP.

## Développement

Node.js 20.9 ou supérieur (Node.js 24 recommandé), npm.

```bash
npm ci
npm run dev
```

Ouvrir `http://localhost:3000` sur la machine où le serveur tourne.

```bash
npm test        # validation et comportement de la route contact, fournisseur simulé
npm run build  # build de production
npm start      # exécution du build de production
```

## Déploiement Vercel

1. Pousser cette migration dans votre dépôt GitHub.
2. Importer le dépôt dans Vercel, avec **Next.js** comme framework et la racine du dépôt comme Root Directory.
3. Choisir Node.js 24. Les commandes détectées sont `npm run build` et `npm ci`. Ne pas utiliser un export statique : `/api/contact` est une fonction serveur.
4. Déployer. Vercel fournit une URL publique et des URLs de prévisualisation pour les changements suivants.

Aucun déploiement ni push n’est réalisé par ces instructions. Le site et le lecteur musical fonctionnent sans service externe ; l’envoi des formulaires demande la configuration ci-dessous.

## Formulaires et e-mails

Le formulaire PHP est remplacé par `POST /api/contact`, qui utilise l’API HTTPS de **Resend** côté serveur. Copier `.env.example` vers `.env.local` pour un développement local, ou configurer ces variables dans Vercel pour les environnements souhaités :

| Variable | Usage |
| --- | --- |
| `RESEND_API_KEY` | Clé privée Resend, uniquement côté serveur |
| `CONTACT_FROM` | Expéditeur sur un domaine vérifié dans Resend, par exemple `Governance Records <contact@votre-domaine.fr>` |
| `CONTACT_TO` | Adresse qui reçoit les messages et les demandes d’inscription |

Ne jamais utiliser de préfixe `NEXT_PUBLIC_` pour la clé, ni versionner les valeurs. Après un changement de variables dans Vercel, redéployer.

Sans ces variables, le serveur retourne **503** et l’interface indique que l’envoi n’est pas activé. Un fournisseur défaillant retourne **502**, sans fausse confirmation. Les tests simulent Resend : ils ne prouvent pas une livraison réelle. Après configuration, vérifier une livraison dans votre boîte de réception.

La section newsletter transmet une **demande d’inscription** au label par e-mail. Elle ne stocke aucune adresse et n’inscrit pas automatiquement dans une liste. Une confirmation manuelle ou l’intégration ultérieure d’un fournisseur de newsletters reste nécessaire. L’ancien endpoint public Google Sheets n’est plus utilisé.

La route vérifie les champs, les tailles, le type de contenu et l’origine lorsqu’elle est fournie. Un champ invisible filtre certains robots. Pour un trafic public important, activer une protection anti-abus persistante ou les règles Vercel adaptées ; ce filtre ne constitue pas un limiteur de débit.

## Personnalisation

- `app/page.js` : présentation et sections de la page d’accueil.
- `app/globals.css` : palette, typographie et mise en page responsive.
- `lib/content.js` : morceaux, articles et photos.
- `public/pictures/` et `public/music/` : images et fichiers audio servis par Next.js.
- `lib/legacy-content.json` : articles et crédits d’origine conservés comme archives.

Les articles de 2018 restent identifiés comme archives. Les dates de concerts anciennes ne sont pas présentées comme des dates à venir. Le merch reste une sélection visuelle avec la mention « Bientôt disponible », sans achat fictif. Les vidéos s’ouvrent sur YouTube. Les profils sociaux et liens d’écoute du modèle étaient des liens vers sa propre page : ils ne sont pas présentés comme des profils réels dans cette version.

Les URLs HTML historiques sont redirigées vers les nouvelles routes. Les anciens fichiers HTML/CSS/JS/PHP sont conservés à la racine pour référence, mais Next.js ne les exécute pas et ne les expose pas comme pages statiques. Le code actif se trouve dans `app/`, `components/` et `lib/`.

## Validation

- `npm test` : 8 tests, couvrant données invalides, limites, origine, configuration manquante, envoi simulé, demande newsletter et erreurs du fournisseur.
- `npm run build` : compilation des pages et de la fonction contact pour la production.
- Vérifications navigateur : ordinateur et mobile, chargement des images, lecture/changement/pause audio, galerie et fermeture clavier, menu mobile, affichage de l’état non configuré du formulaire, routes d’archives et page 404.

## Crédits

Modèle original par **Matthew Waldron**, sous licence MIT. Les crédits du modèle sont conservés sur `/credits`, avec un lien « Website Credits » dans le pied de page. La licence originale est conservée dans `LICENSE`.

La documentation originale se trouve dans [docs/legacy-template.md](docs/legacy-template.md). Avant de publier votre marque, adapter le nom, les textes d’exemple, les conditions et les informations de confidentialité à votre activité.
