import { useState } from 'react'
import { Button, Input, InputPassword, InputSearch, Textarea, Tag, Toggle, VegetableCard, HarvestCard, HerbCard, TaskCard, ChoiceBtn, SpeechBubble } from '../../components'
import styles from './DesignSystemPage.module.scss'

// — Icône SVG locale (remplace l'asset Figma)
function IconLeaf() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M17 8C8 10 5.9 16.17 3.82 19.77M3.82 19.77C4.22 18.7 5.15 16.17 7 13M3.82 19.77C2.72 18 2 15.5 2 13C2 7 7.5 2 14 2C17 2 20 3.5 22 6C22 12 18.5 16.5 14 18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// — Bloc de section avec titre et grille de démo
function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionGrid}>{children}</div>
    </section>
  )
}

// — Carte d'un composant avec label
function ComponentCard({ label, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardPreview}>{children}</div>
      <span className={styles.cardLabel}>{label}</span>
    </div>
  )
}

// — Présentation d'un composant Card (pleine largeur, sans centrage)
function CardDemo({ label, children }) {
  return (
    <div className={styles.cardRowItem}>
      {children}
      <span className={styles.cardRowLabel}>{label}</span>
    </div>
  )
}

// — Swatch couleur
function ColorSwatch({ cssVar, label, dark = false }) {
  return (
    <div className={styles.swatch}>
      <div
        className={styles.swatchColor}
        style={{ background: `var(${cssVar})` }}
      />
      <span className={styles.swatchLabel} style={{ color: dark ? 'var(--Colors-Primary-Main)' : 'var(--color-text-dark)' }}>
        {label}
      </span>
      <code className={styles.swatchVar}>{cssVar}</code>
    </div>
  )
}

// — ChoiceBtn avec toggle local (pour la démo)
function ChoiceBtnDemo({ label }) {
  const [selected, setSelected] = useState(false)
  return (
    <ComponentCard label={selected ? 'Select' : 'Default'}>
      <ChoiceBtn
        label={label}
        property1={selected ? 'select' : 'default'}
        onClick={() => setSelected(v => !v)}
      />
    </ComponentCard>
  )
}

// — Toggle avec état local (pour la démo)
function ToggleDemo({ defaultChecked = false, ...props }) {
  const [checked, setChecked] = useState(defaultChecked)
  return <Toggle {...props} checked={checked} onChange={() => setChecked(v => !v)} />
}

// — Token typographie
function TypoSample({ family, cssVar, text = 'Growup — jardinage' }) {
  return (
    <div className={styles.typoRow}>
      <span className={styles.typoText} style={{ fontFamily: `var(${cssVar})` }}>{text}</span>
      <code className={styles.swatchVar}>{family} · {cssVar}</code>
    </div>
  )
}

export default function DesignSystemPage() {
  return (
    <div className={styles.page}>

      {/* ── EN-TÊTE ── */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Design System</h1>
        <p className={styles.headerSubtitle}>Growup — Composants & tokens</p>
      </header>

      <main className={styles.main}>

        {/* ══════════════════════════════════════════
            COULEURS
        ══════════════════════════════════════════ */}
        <Section title="Couleurs — Sémantique">
          <ColorSwatch cssVar="--Colors-Primary-Main"         label="Primary / Main" />
          <ColorSwatch cssVar="--Colors-Primary-Light"        label="Primary / Light" />
          <ColorSwatch cssVar="--Colors-Primary-Dark"         label="Primary / Dark" />
          <ColorSwatch cssVar="--Colors-Secondary-Main"       label="Secondary / Main" />
          <ColorSwatch cssVar="--Colors-Secondary-Light"      label="Secondary / Light" />
          <ColorSwatch cssVar="--Colors-Secondary-Dark"       label="Secondary / Dark" />
          <ColorSwatch cssVar="--Colors-Tertiary-Main"        label="Tertiary / Main" />
          <ColorSwatch cssVar="--Colors-Tertiary-Light"       label="Tertiary / Light" />
          <ColorSwatch cssVar="--Colors-Error-Main"           label="Error / Main" />
          <ColorSwatch cssVar="--Colors-Warning-Main"         label="Warning / Main" />
          <ColorSwatch cssVar="--Colors-Success-Main"         label="Success / Main" />
          <ColorSwatch cssVar="--Colors-Disabled-Bg"          label="Disabled / Bg" />
          <ColorSwatch cssVar="--color-light"                 label="Surface / Light" />
          <ColorSwatch cssVar="--color-dark"                  label="Surface / Dark" />
          <ColorSwatch cssVar="--Colors-Focus-Focus"          label="Focus" />
        </Section>

        <Section title="Couleurs — Primitives (extrait)">
          <ColorSwatch cssVar="--primitive-primary-050"   label="primary-050" />
          <ColorSwatch cssVar="--primitive-primary-100"   label="primary-100" />
          <ColorSwatch cssVar="--primitive-primary-300"   label="primary-300" />
          <ColorSwatch cssVar="--primitive-primary-500"   label="primary-500" />
          <ColorSwatch cssVar="--primitive-primary-700"   label="primary-700" />
          <ColorSwatch cssVar="--primitive-primary-900"   label="primary-900" />
          <ColorSwatch cssVar="--primitive-secondary-300" label="secondary-300" />
          <ColorSwatch cssVar="--primitive-secondary-500" label="secondary-500" />
          <ColorSwatch cssVar="--primitive-secondary-700" label="secondary-700" />
          <ColorSwatch cssVar="--primitive-tertiary-300"  label="tertiary-300" />
          <ColorSwatch cssVar="--primitive-tertiary-500"  label="tertiary-500" />
          <ColorSwatch cssVar="--primitive-gray-100"      label="gray-100" />
          <ColorSwatch cssVar="--primitive-gray-300"      label="gray-300" />
          <ColorSwatch cssVar="--primitive-gray-500"      label="gray-500" />
          <ColorSwatch cssVar="--primitive-gray-700"      label="gray-700" />
          <ColorSwatch cssVar="--primitive-gray-950"      label="gray-950" />
        </Section>

        {/* ══════════════════════════════════════════
            TYPOGRAPHIE
        ══════════════════════════════════════════ */}
        <Section title="Typographie">
          <div className={styles.typoBlock}>
            <TypoSample family="Gabarito"     cssVar="--Font-family-Title"       text="Titre principal — Gabarito" />
            <TypoSample family="Playpen Sans" cssVar="--Font-family-Subtitle"    text="Sous-titre — Playpen Sans" />
            <TypoSample family="Poppins"      cssVar="--Font-family-Text"        text="Corps de texte — Poppins" />
            <TypoSample family="Gabarito"     cssVar="--Font-family-btn"         text="Bouton — Gabarito" />
            <TypoSample family="Playpen Sans" cssVar="--Font-family-Tag"         text="Tag — Playpen Sans" />
            <TypoSample family="Playpen Sans" cssVar="--Font-family-Cards-Title" text="Titre carte — Playpen Sans" />
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            BOUTONS — CONTAINED
        ══════════════════════════════════════════ */}
        <Section title="Button — Contained">
          <ComponentCard label="Primary / Contained">
            <Button variant="primary" fill="contained">Planter</Button>
          </ComponentCard>
          <ComponentCard label="Primary / Contained + icône">
            <Button variant="primary" fill="contained" rightIcon={<IconLeaf />}>Ajouter une plante</Button>
          </ComponentCard>
          <ComponentCard label="Secondary / Contained">
            <Button variant="secondary" fill="contained">Découvrir</Button>
          </ComponentCard>
          <ComponentCard label="Secondary / Contained + icône">
            <Button variant="secondary" fill="contained" rightIcon={<IconLeaf />}>Mon jardin</Button>
          </ComponentCard>
          <ComponentCard label="Tertiary / Contained">
            <Button variant="tertiary" fill="contained">Diagnostiquer</Button>
          </ComponentCard>
          <ComponentCard label="Tertiary / Contained + icône">
            <Button variant="tertiary" fill="contained" rightIcon={<IconArrow />}>Voir le résultat</Button>
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            BOUTONS — OUTLINED
        ══════════════════════════════════════════ */}
        <Section title="Button — Outlined">
          <ComponentCard label="Primary / Outlined">
            <Button variant="primary" fill="outlined">En savoir plus</Button>
          </ComponentCard>
          <ComponentCard label="Primary / Outlined + icône">
            <Button variant="primary" fill="outlined" rightIcon={<IconArrow />}>Explorer</Button>
          </ComponentCard>
          <ComponentCard label="Secondary / Outlined">
            <Button variant="secondary" fill="outlined">Annuler</Button>
          </ComponentCard>
          <ComponentCard label="Secondary / Outlined + icône">
            <Button variant="secondary" fill="outlined" rightIcon={<IconLeaf />}>Modifier</Button>
          </ComponentCard>
          <ComponentCard label="Tertiary / Outlined">
            <Button variant="tertiary" fill="outlined">Avertissement</Button>
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            BOUTONS — GHOST & TEXT
        ══════════════════════════════════════════ */}
        <Section title="Button — Ghost & Text">
          <ComponentCard label="Ghost">
            <Button variant="ghost">Passer</Button>
          </ComponentCard>
          <ComponentCard label="Ghost + icône">
            <Button variant="ghost" rightIcon={<IconLeaf />}>Continuer</Button>
          </ComponentCard>
          <ComponentCard label="Text">
            <Button variant="text">Voir tout</Button>
          </ComponentCard>
          <ComponentCard label="Text + icône">
            <Button variant="text" rightIcon={<IconArrow />}>Détails</Button>
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            BOUTONS — ÉTATS
        ══════════════════════════════════════════ */}
        <Section title="Button — États">
          <ComponentCard label="Disabled / Contained">
            <Button variant="primary" fill="contained" disabled>Indisponible</Button>
          </ComponentCard>
          <ComponentCard label="Disabled / Outlined">
            <Button variant="primary" fill="outlined" disabled>Indisponible</Button>
          </ComponentCard>
          <ComponentCard label="Lien (React Router)">
            <Button variant="secondary" fill="contained" asLink href="/jardin" rightIcon={<IconArrow />}>Mon jardin</Button>
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            BOUTON — FULL WIDTH
        ══════════════════════════════════════════ */}
        <Section title="Button — Full Width">
          <div className={styles.fullWidthRow}>
            <Button variant="primary" fill="contained" fullWidth rightIcon={<IconLeaf />}>
              Commencer mon jardin
            </Button>
            <Button variant="secondary" fill="outlined" fullWidth>
              Importer une plante existante
            </Button>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            TOKENS — SPACING
        ══════════════════════════════════════════ */}
        <Section title="Spacing">
          <div className={styles.spacingBlock}>
            {[1, 2, 3, 4, 6, 8, 10, 12, 16].map(n => (
              <div key={n} className={styles.spacingRow}>
                <div
                  className={styles.spacingBar}
                  style={{ width: `var(--spacing-${n})`, minWidth: '2px' }}
                />
                <code className={styles.swatchVar}>--spacing-{n} · {n * 4}px</code>
              </div>
            ))}
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            TOKENS — BORDER RADIUS
        ══════════════════════════════════════════ */}
        <Section title="Border Radius">
          <ComponentCard label="--Radius-Button-btn · 128px">
            <div className={styles.radiusSample} style={{ borderRadius: 'var(--Radius-Button-btn)' }} />
          </ComponentCard>
          <ComponentCard label="--Radius-Card-M · 16px">
            <div className={styles.radiusSample} style={{ borderRadius: 'var(--Radius-Card-M)' }} />
          </ComponentCard>
          <ComponentCard label="--Radius-Card-L · 24px">
            <div className={styles.radiusSample} style={{ borderRadius: 'var(--Radius-Card-L)' }} />
          </ComponentCard>
          <ComponentCard label="--Radius-Input · 8px">
            <div className={styles.radiusSample} style={{ borderRadius: 'var(--Radius-Input)' }} />
          </ComponentCard>
          <ComponentCard label="--Radius-Tag · 6px">
            <div className={styles.radiusSample} style={{ borderRadius: 'var(--Radius-Tag)' }} />
          </ComponentCard>
          <ComponentCard label="--Radius-Card-xS · 4px">
            <div className={styles.radiusSample} style={{ borderRadius: 'var(--Radius-Card-xS)' }} />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            INPUTS — VARIANTES
        ══════════════════════════════════════════ */}
        <Section title="Input — Variantes">
          <ComponentCard label="Outline / Default">
            <Input variant="outline" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Outline / Success">
            <Input variant="outline" state="success" placeholder="Placeholder" helperText="Champ valide" />
          </ComponentCard>
          <ComponentCard label="Outline / Error">
            <Input variant="outline" state="error" placeholder="Placeholder" helperText="Champ invalide" />
          </ComponentCard>
          <ComponentCard label="Outline / Disabled">
            <Input variant="outline" disabled placeholder="Placeholder" helperText="Non disponible" />
          </ComponentCard>
          <ComponentCard label="Filled / Default">
            <Input variant="filled" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Filled / Success">
            <Input variant="filled" state="success" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Filled / Error">
            <Input variant="filled" state="error" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Filled / Disabled">
            <Input variant="filled" disabled placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Borderless / Default">
            <Input variant="borderless" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Borderless / Success">
            <Input variant="borderless" state="success" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Borderless / Error">
            <Input variant="borderless" state="error" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Underline / Default">
            <Input variant="underline" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Underline / Success">
            <Input variant="underline" state="success" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Underline / Error">
            <Input variant="underline" state="error" placeholder="Placeholder" />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            INPUTS — TYPES (layout)
        ══════════════════════════════════════════ */}
        <Section title="Input — Types">
          <ComponentCard label="Default (sans icône)">
            <Input label="Titre" placeholder="Placeholder" />
          </ComponentCard>
          <ComponentCard label="Avec label + requis">
            <Input label="Nom de la plante" required placeholder="Ex: Basilic" />
          </ComponentCard>
          <ComponentCard label="Avec label + info">
            <Input label="Surface (m²)" info placeholder="Ex: 2.5" />
          </ComponentCard>
          <ComponentCard label="Icône gauche">
            <Input
              label="Jardin"
              placeholder="Rechercher…"
              leftIcon={
                <svg viewBox="0 0 16 16" fill="none" style={{width:16,height:16}}>
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
          </ComponentCard>
          <ComponentCard label="Icône droite">
            <Input
              label="Plante"
              placeholder="Placeholder"
              rightIcon={
                <svg viewBox="0 0 16 16" fill="none" style={{width:16,height:16}}>
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
            />
          </ComponentCard>
          <ComponentCard label="Suffix · km">
            <Input label="Distance" placeholder="0" suffix="km" />
          </ComponentCard>
          <ComponentCard label="Prefix · €">
            <Input label="Prix" placeholder="0.00" prefix="€" />
          </ComponentCard>
          <ComponentCard label="Avec helper text">
            <Input label="Email" placeholder="vous@email.fr" helperText="Nous ne partageons jamais votre email." />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            INPUTS SPÉCIAUX
        ══════════════════════════════════════════ */}
        <Section title="Input — Spéciaux">
          <ComponentCard label="Password / Default">
            <InputPassword label="Mot de passe" />
          </ComponentCard>
          <ComponentCard label="Password / Success">
            <InputPassword label="Mot de passe" state="success" helperText="Mot de passe fort" />
          </ComponentCard>
          <ComponentCard label="Password / Error">
            <InputPassword label="Mot de passe" state="error" helperText="Trop court (min. 8 car.)" />
          </ComponentCard>
          <ComponentCard label="Password / Disabled">
            <InputPassword label="Mot de passe" disabled />
          </ComponentCard>
          <ComponentCard label="Email">
            <Input
              type="email"
              label="Adresse email"
              placeholder="vous@email.fr"
              leftIcon={
                <svg viewBox="0 0 16 16" fill="none" style={{width:16,height:16}}>
                  <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              }
            />
          </ComponentCard>
          <ComponentCard label="Textarea">
            <Textarea label="Message" placeholder="Décrivez votre jardin…" rows={3} />
          </ComponentCard>
          <ComponentCard label="Textarea / Disabled">
            <Textarea label="Message" disabled placeholder="Non disponible" rows={3} />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            BARRE DE RECHERCHE
        ══════════════════════════════════════════ */}
        <Section title="Search Bar">
          <ComponentCard label="Search / Filled">
            <InputSearch variant="filled" placeholder="Rechercher une plante…" />
          </ComponentCard>
          <ComponentCard label="Search / Outline">
            <InputSearch variant="outline" placeholder="Rechercher une plante…" />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            TAGS — FILLED
        ══════════════════════════════════════════ */}
        <Section title="Tag — Filled">
          <ComponentCard label="Primary">
            <Tag color="primary" variant="filled">Plante</Tag>
          </ComponentCard>
          <ComponentCard label="Secondary">
            <Tag color="secondary" variant="filled">Catégorie</Tag>
          </ComponentCard>
          <ComponentCard label="Tertiary">
            <Tag color="tertiary" variant="filled">Nouveau</Tag>
          </ComponentCard>
          <ComponentCard label="Success">
            <Tag color="success" variant="filled">Sain</Tag>
          </ComponentCard>
          <ComponentCard label="Warning">
            <Tag color="warning" variant="filled">À arroser</Tag>
          </ComponentCard>
          <ComponentCard label="Error">
            <Tag color="error" variant="filled">Malade</Tag>
          </ComponentCard>
          <ComponentCard label="Neutral">
            <Tag color="neutral" variant="filled">Inactif</Tag>
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            TAGS — OUTLINE
        ══════════════════════════════════════════ */}
        <Section title="Tag — Outline">
          <ComponentCard label="Primary">
            <Tag color="primary" variant="outline">Plante</Tag>
          </ComponentCard>
          <ComponentCard label="Secondary">
            <Tag color="secondary" variant="outline">Catégorie</Tag>
          </ComponentCard>
          <ComponentCard label="Tertiary">
            <Tag color="tertiary" variant="outline">Nouveau</Tag>
          </ComponentCard>
          <ComponentCard label="Success">
            <Tag color="success" variant="outline">Sain</Tag>
          </ComponentCard>
          <ComponentCard label="Warning">
            <Tag color="warning" variant="outline">À arroser</Tag>
          </ComponentCard>
          <ComponentCard label="Error">
            <Tag color="error" variant="outline">Malade</Tag>
          </ComponentCard>
          <ComponentCard label="Neutral">
            <Tag color="neutral" variant="outline">Inactif</Tag>
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            TAGS — AVEC ICÔNE / SUPPRESSION
        ══════════════════════════════════════════ */}
        <Section title="Tag — Avec icône & suppression">
          <ComponentCard label="Icône gauche">
            <Tag
              color="primary"
              variant="filled"
              leftIcon={
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 4V6.5L7.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              }
            >
              En cours
            </Tag>
          </ComponentCard>
          <ComponentCard label="Supprimable">
            <Tag color="error" variant="filled" onRemove={() => {}}>Supprimer</Tag>
          </ComponentCard>
          <ComponentCard label="Outline + supprimable">
            <Tag color="secondary" variant="outline" onRemove={() => {}}>Retirer</Tag>
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            TOGGLE — COULEURS (ON)
        ══════════════════════════════════════════ */}
        <Section title="Toggle — Couleurs (ON)">
          <ComponentCard label="Primary">
            <ToggleDemo defaultChecked color="primary" label="Activé" />
          </ComponentCard>
          <ComponentCard label="Secondary">
            <ToggleDemo defaultChecked color="secondary" label="Activé" />
          </ComponentCard>
          <ComponentCard label="Tertiary">
            <ToggleDemo defaultChecked color="tertiary" label="Activé" />
          </ComponentCard>
          <ComponentCard label="Success">
            <ToggleDemo defaultChecked color="success" label="Activé" />
          </ComponentCard>
          <ComponentCard label="Warning">
            <ToggleDemo defaultChecked color="warning" label="Activé" />
          </ComponentCard>
          <ComponentCard label="Error">
            <ToggleDemo defaultChecked color="error" label="Activé" />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            TOGGLE — ÉTATS
        ══════════════════════════════════════════ */}
        <Section title="Toggle — États">
          <ComponentCard label="OFF / Default">
            <ToggleDemo color="primary" label="Désactivé" />
          </ComponentCard>
          <ComponentCard label="ON / Default">
            <ToggleDemo defaultChecked color="primary" label="Activé" />
          </ComponentCard>
          <ComponentCard label="Disabled OFF">
            <ToggleDemo color="primary" label="Inactif" disabled />
          </ComponentCard>
          <ComponentCard label="Disabled ON">
            <ToggleDemo defaultChecked color="primary" label="Inactif" disabled />
          </ComponentCard>
          <ComponentCard label="Avec helper">
            <ToggleDemo defaultChecked color="primary" label="Notifications" helperText="Recevoir les rappels d'arrosage" />
          </ComponentCard>
          <ComponentCard label="Requis + info">
            <ToggleDemo color="primary" label="Conditions" required info />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            TOGGLE — LABEL EN HAUT
        ══════════════════════════════════════════ */}
        <Section title="Toggle — Label en haut">
          <ComponentCard label="Top / ON">
            <ToggleDemo defaultChecked color="primary" label="Mode sombre" labelPosition="top" />
          </ComponentCard>
          <ComponentCard label="Top / OFF">
            <ToggleDemo color="secondary" label="Rappels" labelPosition="top" />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            VEGETABLE CARD
        ══════════════════════════════════════════ */}
        <Section title="Vegetable Card — Horizontal">
          <div className={styles.cardRow}>
            <CardDemo label="Défaut">
              <VegetableCard name="Tomate cerise" zone="Balcon Sud" growthStage="Croissance" status="good" />
            </CardDemo>
            <CardDemo label="Avec tags">
              <VegetableCard name="Basilic" zone="Fenêtre Est" growthStage="Floraison" harvestType="Récolte étalée" status="warning" />
            </CardDemo>
            <CardDemo label="Alerte">
              <VegetableCard name="Menthe" zone="Pot intérieur" growthStage="Semis" statusAlert="À surveiller" status="danger" />
            </CardDemo>
          </div>
        </Section>

        <Section title="Vegetable Card — Vertical">
          <div className={styles.cardRow}>
            <CardDemo label="Défaut">
              <VegetableCard layout="vertical" name="Tomate cerise" zone="Balcon Sud" growthStage="Récolte" status="good" />
            </CardDemo>
            <CardDemo label="Avec tag récolte">
              <VegetableCard layout="vertical" name="Courgette" zone="Jardinière" growthStage="Floraison" harvestType="Récolte groupée" status="good" />
            </CardDemo>
            <CardDemo label="Placeholder" />
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            HARVEST CARD
        ══════════════════════════════════════════ */}
        <Section title="Harvest Card">
          <div className={styles.cardRow}>
            <CardDemo label="Récolte étalée">
              <HarvestCard
                name="Tomate cerise" harvestType="Récolte étalée" harvestDate="27 Fév." datePrefix="Jusqu'au :"
                icon={<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="20" r="10" fill="var(--Colors-Error-Main)" opacity="0.85" /><path d="M24 10C24 10 26 6 30 6" stroke="var(--Colors-Primary-Main)" strokeWidth="1.5" strokeLinecap="round" /></svg>}
              />
            </CardDemo>
            <CardDemo label="Récolte groupée">
              <HarvestCard
                name="Basilic" harvestType="Récolte groupée" harvestDate="15 Mars" datePrefix="Prévu :"
                icon={<svg viewBox="0 0 48 48" fill="none"><ellipse cx="24" cy="28" rx="10" ry="8" fill="var(--Colors-Primary-Main)" opacity="0.8" /><path d="M24 20C24 16 28 12 32 14C28 14 26 18 24 20Z" fill="var(--Colors-Primary-State-Selected)" /></svg>}
              />
            </CardDemo>
            <CardDemo label="Sans icône">
              <HarvestCard name="Menthe" harvestType="Récolte de fin de culture" harvestDate="30 Avr." datePrefix="Avant le :" />
            </CardDemo>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            HERB CARD
        ══════════════════════════════════════════ */}
        <Section title="Herb Card">
          <div className={styles.cardRow}>
            <CardDemo label="Menthe">
              <HerbCard name="Menthe" icon={<svg viewBox="0 0 32 32" fill="none"><path d="M16 28C16 20 8 12 8 12C8 12 14 10 16 14C18 10 24 12 24 12C24 12 16 20 16 28Z" fill="var(--Colors-Primary-Main)" /></svg>} />
            </CardDemo>
            <CardDemo label="Persil">
              <HerbCard name="Persil" icon={<svg viewBox="0 0 32 32" fill="none"><path d="M16 26C12 20 8 16 10 10C12 8 14 10 16 14C18 10 20 8 22 10C24 16 20 20 16 26Z" fill="var(--Colors-Primary-State-Selected)" /></svg>} />
            </CardDemo>
            <CardDemo label="Sans icône">
              <HerbCard name="Basilic" />
            </CardDemo>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            TASK CARD
        ══════════════════════════════════════════ */}
        <Section title="Task Card">
          <div className={styles.cardRow}>
            <CardDemo label="Non réalisée">
              <TaskCard
                title="Arroser les plants" frequency="Quotidien" duration="~2 min"
                icon={<svg viewBox="0 0 40 40" fill="none"><rect x="8" y="24" width="24" height="8" rx="2" fill="var(--primitive-secondary-400)" /><rect x="14" y="12" width="4" height="12" rx="2" fill="var(--Colors-Primary-Main)" /><rect x="20" y="8" width="4" height="16" rx="2" fill="var(--Colors-Primary-State-Selected)" /></svg>}
              />
            </CardDemo>
            <CardDemo label="Réalisée">
              <TaskCard
                title="Arroser les plants" frequency="Quotidien" duration="~2 min" checked
                icon={<svg viewBox="0 0 40 40" fill="none"><rect x="8" y="24" width="24" height="8" rx="2" fill="var(--primitive-secondary-400)" /><rect x="14" y="12" width="4" height="12" rx="2" fill="var(--Colors-Primary-Main)" /><rect x="20" y="8" width="4" height="16" rx="2" fill="var(--Colors-Primary-State-Selected)" /></svg>}
              />
            </CardDemo>
            <CardDemo label="Avec conseil + tip">
              <TaskCard
                title="Tailler le basilic" frequency="Demain" duration="~5 min"
                conseil="Couper au-dessus d'une paire de feuilles"
                tip="Pincer les fleurs pour prolonger la production !"
                icon={<svg viewBox="0 0 40 40" fill="none"><path d="M20 32C16 24 10 18 12 12C14 9 17 11 20 16C23 11 26 9 28 12C30 18 24 24 20 32Z" fill="var(--Colors-Primary-Main)" /></svg>}
              />
            </CardDemo>
            <CardDemo label="Dans 2 jours">
              <TaskCard
                title="Vérifier l'humidité" frequency="Dans 2 jours" conseil="Sol trop sec détecté"
                icon={<svg viewBox="0 0 40 40" fill="none"><path d="M20 8C20 8 12 18 12 24C12 28.4 15.6 32 20 32C24.4 32 28 28.4 28 24C28 18 20 8 20 8Z" fill="var(--Colors-Primary-State-Selected)" /></svg>}
              />
            </CardDemo>
          </div>
        </Section>

        {/* ══════════════════════════════════════════
            CHOICE BTN
        ══════════════════════════════════════════ */}
        <Section title="ChoiceBtn">
          <ChoiceBtnDemo label="Tomate cerise" />
          <ChoiceBtnDemo label="Basilic" />
          <ComponentCard label="Disable">
            <ChoiceBtn label="Menthe" property1="disable" onClick={() => {}} />
          </ComponentCard>
        </Section>

        {/* ══════════════════════════════════════════
            SPEECH BUBBLE
        ══════════════════════════════════════════ */}
        <Section title="SpeechBubble">
          <ComponentCard label="Courte">
            <SpeechBubble>Bonjour, je suis Bruno !</SpeechBubble>
          </ComponentCard>
          <ComponentCard label="Longue">
            <SpeechBubble>Dis-moi, quelles plantes souhaites-tu cultiver cette saison ?</SpeechBubble>
          </ComponentCard>
          <ComponentCard label="Avec emphase">
            <SpeechBubble>Super choix ! 🌱 Tu vas adorer cultiver ces légumes.</SpeechBubble>
          </ComponentCard>
        </Section>

      </main>
    </div>
  )
}
