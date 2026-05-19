import glossaire from '../data/glossaire.json'
import GlossaryTerm from '../components/GlossaryTerm/GlossaryTerm'

// Patterns ordered longest-first to avoid partial overlaps
const TERM_PATTERNS = [
  { key: 'stress_hydrique', regex: /\bstress\s+hydrique\b/gi },
  { key: 'transplantation', regex: /\btransplantation\b/gi },
  { key: 'repiquage',       regex: /\brepiqu\w*/gi },
  { key: 'tuteurage',       regex: /\btuteur(?:age|er|s)?\b/gi },
  { key: 'gourmand',        regex: /\bgourmands?\b/gi },
  { key: 'substrat',        regex: /\bsubstrats?\b/gi },
  { key: 'fongique',        regex: /\bfongiques?\b/gi },
  { key: 'drainage',        regex: /\bdrainé[es]?\b|\bdrainage\b|\bdrainant\b/gi },
  { key: 'pincer',          regex: /\bpince[rz]?\b|\bpincé[es]?\b/gi },
  { key: 'motte',           regex: /\bmottes?\b/gi },
  { key: 'semis',           regex: /\bsemis\b/gi },
  { key: 'plant',           regex: /\bplants?\b/gi },
  { key: 'stolon',          regex: /\bstolons?\b/gi },
  { key: 'paillage',        regex: /\bpaillis\b|\bpaille[rz]?\b|\bpaillage\b|\bpaillé[es]?\b/gi },
]

// seenTerms: optional Set shared across all parseGlossaryText calls in the same render.
// Each term key is added on first use — subsequent occurrences render as plain text.
export function parseGlossaryText(text, seenTerms = null) {
  if (!text || typeof text !== 'string') return text

  const matches = []
  for (const { key, regex } of TERM_PATTERNS) {
    regex.lastIndex = 0
    let m
    while ((m = regex.exec(text)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, word: m[0], key })
    }
  }

  if (matches.length === 0) return text

  matches.sort((a, b) => a.start - b.start || b.end - a.end)

  const filtered = []
  let lastEnd = 0
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m)
      lastEnd = m.end
    }
  }

  const nodes = []
  let cursor = 0
  for (const m of filtered) {
    if (m.start > cursor) nodes.push(text.slice(cursor, m.start))

    if (seenTerms?.has(m.key)) {
      nodes.push(m.word)
    } else {
      seenTerms?.add(m.key)
      const term = glossaire.termes[m.key]
      nodes.push(
        <GlossaryTerm
          key={`${m.key}-${m.start}`}
          titre={term.tooltip_fiche.titre}
          definition={term.tooltip_fiche.definition}
        >
          {m.word}
        </GlossaryTerm>
      )
    }
    cursor = m.end
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))

  return nodes
}
