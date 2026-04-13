# README — Pont Figma ↔ React/Next.js · Composant `Button`

> **Destinataire principal :** IA (Claude, Copilot, Cursor…) appelée pour générer ou modifier ce composant.  
> **Règle absolue :** ne jamais hardcoder une valeur. Toujours utiliser `var(--token-*)`.

---

## 0. Origine Figma

| Champ | Valeur |
|---|---|
| Fichier | `Design-system PFE — Composant — Variable` |
| Node ID | `2013-696` |
| Nom du nœud Figma | `Button` |
| URL directe | `https://www.figma.com/design/4dqv7v5U4SKfIdqY3fzmtU/-Design-system--PFE---Composant---Variable?node-id=2013-696` |

---

## 1. Capture visuelle de référence

Le composant rendu dans Figma (état `Secondary / Contained / Enabled`) :

```
[ button  🌿 ]   ← fond brun-olive arrondi, texte clair, icône droite
```

Couleur de fond : `var(--colors-secondary-main)` → `#5A4C39`  
Couleur texte : `var(--colors-secondary-contrasttext)` → `#F8F7F7`  
Rayon : `var(--radius-button-btn)` → `128px` (pill)  
Police : `Gabarito`, weight `400`  
Ombre interne (texture 3D) : `inset -4px -4px 4px rgba(37,35,35,0.25), inset 3px 4px 4px rgba(248,247,247,0.2)`

---

## 2. Anatomie du composant Figma → divergences React

### 2.1 Structure des couches Figma

```
Button (frame wrapper)            node 2013:696
└── __master-btn (frame)          node 2013:697   ← conteneur principal
    ├── [fond absolu]                              ← div bg avec border-radius
    ├── label (texte)             I2013:697;11:370
    ├── Right Icon (frame)        I2013:697;57:857
    │   └── default_icons (frame)
    │       └── grass (mask)                      ← icône via CSS mask + image
    └── [ombre interne absolue]                    ← div pointer-events:none
```

### 2.2 Table des divergences critiques

| # | Élément Figma | Comportement dans Figma | Traduction React/Next.js | Raison de la divergence |
|---|---|---|---|---|
| 1 | **Fond coloré** | Div absolue séparée avec `bg-color` + `border-radius` | `background-color` sur le conteneur principal + `border-radius` → pas de div dédiée | Figma sépare fond et forme pour permettre la surcharge de composant. En CSS, c'est une propriété native du conteneur |
| 2 | **Icône `grass`** | Image bitmap masquée via `mask-image` + `mask-*` CSS | Remplacer par un composant `<Icon>` passé en prop (`rightIcon`) ou une `<svg>` inline | Le mask CSS Figma est fragile, dépend d'une URL d'asset MCP qui expire sous 7 jours. Utiliser une icône SVG locale ou une librairie |
| 3 | **Ombre interne** | Div absolue `pointer-events:none` avec `box-shadow: inset` | `box-shadow: inset` sur le pseudo-élément `::after` du conteneur, ou directement sur le bouton | Figma génère une div pour l'ombre car il ne supporte pas les pseudo-éléments. En CSS, `::after` est plus propre |
| 4 | **Wrapper externe** | Frame `w-[133px]` fixe autour du bouton | Supprimer le wrapper, laisser le bouton gérer sa propre largeur via `width: fit-content` | La largeur fixe Figma sert à la démo. En React, le bouton doit s'adapter à son contenu (ou recevoir une prop `fullWidth`) |
| 5 | **Élément HTML** | `<div>` dans le code généré par Figma | `<button>` natif avec `type="button"` (ou `type="submit"`) | Accessibilité : un bouton cliquable doit être un `<button>` pour le clavier, le focus, et les lecteurs d'écran |
| 6 | **Texte** | Nœud texte statique `"button"` | Prop `children` (ou `label: string`) | Figma représente le contenu figé. React injecte du contenu dynamique via props |
| 7 | **États visuels** | Variantes Figma séparées (Hover, Focus, Disabled, Active) | CSS pseudo-classes `:hover`, `:focus-visible`, `:active`, `[disabled]` + gestion via props | Les variantes Figma ne génèrent pas automatiquement les pseudo-classes CSS |
| 8 | **Variante `type`** | Prop Figma `type: Primary / Secondary / Ghost / Text` | Prop React `variant: "primary" \| "secondary" \| "ghost" \| "text"` | Renommage : `type` est réservé en HTML (`type="button"`). Utiliser `variant` pour éviter le conflit |
| 9 | **Variante `fill`** | Prop Figma `fill: Contained / Outlined` | Prop React `fill: "contained" \| "outlined"` | Identique, mais en camelCase lowercase pour la cohérence React |
| 10 | **Variante `link`** | Prop Figma `link: True / False` | Prop React `asLink?: boolean` + rendu conditionnel `<a>` vs `<button>` | En React/Next.js, un lien doit être un `<Link>` de `next/link`, pas un `<div>` |
| 11 | **Effet Grain** | `GRAIN` effect (radius 0.75) sur la texture globale | SVG `<feTurbulence>` filter ou `noise.png` en `background-image` avec `mix-blend-mode` | Figma gère les effets de texture nativement. CSS requiert un filtre SVG ou une image de bruit |

---

## 3. Interface du composant React cible

```tsx
// Button.tsx — Next.js 14+ / React 18

import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text'
type ButtonFill    = 'contained' | 'outlined'

interface ButtonProps {
  // Contenu
  children: ReactNode
  rightIcon?: ReactNode        // ← remplace l'icône "grass" Figma

  // Variantes (= variantes Figma, renommées)
  variant?: ButtonVariant      // Figma : type (Primary/Secondary…)
  fill?: ButtonFill            // Figma : fill (Contained/Outlined)

  // Comportement
  asLink?: boolean             // Figma : link = True → rendu <Link>
  href?: string                // requis si asLink = true
  disabled?: boolean           // Figma : state = Disabled
  type?: 'button' | 'submit' | 'reset'  // ← n'existe pas dans Figma

  // Stylisation
  fullWidth?: boolean          // override de la largeur fixe Figma
  className?: string

  // Events
  onClick?: () => void
}
```

---

## 4. Mapping tokens Figma → CSS Custom Properties

Ces tokens sont définis dans `tokens/tokens.scss` (généré depuis `Design_System_-_Variable_-_Tokens.json`).

### Couleurs utilisées par Button

| Variable Figma (chemin JSON) | CSS Custom Property | Valeur résolue |
|---|---|---|
| `Colors.Secondary.Main` | `--colors-secondary-main` | `#5A4C39` |
| `Colors.Secondary.contrastText` | `--colors-secondary-contrasttext` | `#F8F7F7` |
| `Colors.Primary.Main` | `--colors-primary-main` | *(voir tokens)* |
| `Colors.Primary.contrastText` | `--colors-primary-contrasttext` | *(voir tokens)* |

### Radius

| Variable Figma | CSS Custom Property | Valeur |
|---|---|---|
| `Radius.button.btn` | `--radius-button-btn` | `128px` |

### Typographie

| Variable Figma | CSS Custom Property | Valeur |
|---|---|---|
| `Font family.btn` | `--font-family-btn` | `'Gabarito', sans-serif` |
| `Font weight.font-weight-400` | `--font-weight-400` | `400` |

### Spacing (padding interne du bouton)

| Usage | CSS Custom Property | Valeur Figma |
|---|---|---|
| Padding horizontal | `--spacing-button-px` | `24px` |
| Padding vertical | `--spacing-button-py` | `8px` |
| Gap (icône/texte) | `--spacing-button-gap` | `8px` |

---

## 5. Squelette de code React/Next.js

```tsx
// components/Button/Button.tsx
import Link from 'next/link'
import styles from './Button.module.scss'
import type { ButtonProps } from './Button.types'

export function Button({
  children,
  rightIcon,
  variant = 'secondary',
  fill = 'contained',
  asLink = false,
  href,
  disabled = false,
  type = 'button',
  fullWidth = false,
  className,
  onClick,
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${fill}`],
    fullWidth && styles['btn--full'],
    disabled && styles['btn--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <span className={styles.btn__label}>{children}</span>
      {rightIcon && (
        <span className={styles.btn__icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </>
  )

  if (asLink && href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
```

```scss
// components/Button/Button.module.scss
// ⚠️ Jamais de valeur hardcodée — toujours var(--token-*)

.btn {
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  gap:             var(--spacing-button-gap, 8px);
  padding:         var(--spacing-button-py, 8px) var(--spacing-button-px, 24px);
  border-radius:   var(--radius-button-btn, 128px);
  border:          none;
  cursor:          pointer;
  font-family:     var(--font-family-btn, 'Gabarito', sans-serif);
  font-weight:     var(--font-weight-400, 400);
  font-size:       16px;          // ← À transformer en token si défini
  line-height:     1.5;
  white-space:     nowrap;
  position:        relative;
  width:           fit-content;
  text-decoration: none;

  // Ombre interne (remplace la div absolue Figma)
  &::after {
    content:       '';
    position:      absolute;
    inset:         0;
    border-radius: inherit;
    box-shadow:    inset -4px -4px 4px rgba(37, 35, 35, 0.25),
                   inset  3px  4px 4px rgba(248, 247, 247, 0.2);
    pointer-events: none;
  }

  // --- Variantes ---

  &--secondary#{&}--contained {
    background-color: var(--colors-secondary-main);
    color:            var(--colors-secondary-contrasttext);
  }

  &--primary#{&}--contained {
    background-color: var(--colors-primary-main);
    color:            var(--colors-primary-contrasttext);
  }

  &--secondary#{&}--outlined {
    background-color: transparent;
    border:           1px solid var(--colors-secondary-main);
    color:            var(--colors-secondary-main);
  }

  // --- États ---

  &:hover:not(&--disabled) {
    filter: brightness(1.08);
  }

  &:focus-visible {
    outline:        2px solid var(--colors-secondary-main);
    outline-offset: 2px;
  }

  &:active:not(&--disabled) {
    filter: brightness(0.92);
  }

  &--disabled,
  &[disabled] {
    opacity: 0.4;
    cursor:  not-allowed;
    pointer-events: none;
  }

  // --- Full width ---

  &--full {
    width: 100%;
  }
}

.btn__icon {
  display:     inline-flex;
  align-items: center;
  width:       24px;
  height:      24px;
  flex-shrink: 0;
}
```

---

## 6. Usage — exemples

```tsx
import { Button } from '@/components/Button'
import { LeafIcon } from '@/components/Icons'   // SVG local

// Bouton secondaire par défaut (= état Figma de référence)
<Button rightIcon={<LeafIcon />}>
  Ajouter une plante
</Button>

// Bouton primaire
<Button variant="primary" fill="contained">
  Commencer
</Button>

// Bouton lien (Next.js <Link>)
<Button asLink href="/diagnostic" variant="secondary">
  Diagnostiquer
</Button>

// Bouton désactivé
<Button disabled>
  Indisponible
</Button>

// Bouton full width
<Button fullWidth>
  Valider
</Button>
```

---

## 7. Ce que l'IA NE doit PAS reproduire depuis le code Figma généré

| Pattern Figma généré | Raison d'ignorer | Ce qu'il faut faire |
|---|---|---|
| `<div data-node-id="...">` | Attributs debug Figma inutiles en prod | Ne pas inclure les `data-node-id` |
| `w-[133px]` sur le wrapper | Largeur de démo Figma | `width: fit-content` |
| Classes Tailwind (`flex`, `items-center`…) | Stack ≠ Tailwind | SCSS module avec tokens |
| URL d'asset MCP `https://www.figma.com/api/mcp/asset/...` | Expire sous 7 jours | SVG local dans `/public/icons/` ou composant `<Icon>` |
| Div dédiée pour le fond coloré | Artefact Figma | `background-color` sur le bouton directement |
| Div absolue pour l'ombre | Artefact Figma | `::after` pseudo-élément |
| `mask-image` avec URL externe | Fragile + expire | `<svg>` inline ou `background-image: url('/icons/leaf.svg')` |

---

## 8. Checklist avant commit

- [ ] Aucune valeur hardcodée (`px`, `#hex`, `'Gabarito'` brut) → tout passe par `var(--token-*)`
- [ ] L'élément HTML est `<button>` (ou `<Link>` si `asLink`)
- [ ] Les états `:hover`, `:focus-visible`, `:active`, `[disabled]` sont stylisés
- [ ] L'icône est un SVG local, pas une URL MCP
- [ ] Le composant est accessible : `aria-disabled` si lien désactivé, `type="button"` par défaut
- [ ] Aucun `data-node-id` en prod
- [ ] Testé avec `variant="primary"` et `variant="secondary"`

---

## 9. Fichiers liés

| Fichier | Rôle |
|---|---|
| `Design_System_-_Variable_-_Tokens.json` | Source de vérité des tokens (export Figma) |
| `Design_System_-_Variables_-_Primitives.json` | Primitives de couleur (palette brute) |
| `tokens/tokens.scss` | CSS Custom Properties générées depuis le JSON |
| `components/Button/Button.tsx` | Composant React |
| `components/Button/Button.module.scss` | Styles scoped |
| `components/Button/Button.types.ts` | Types TypeScript |
| `components/Icons/LeafIcon.tsx` | Icône SVG locale (remplace l'asset MCP) |

---

*Dernière synchronisation Figma : node `2013-696` — avril 2026*
