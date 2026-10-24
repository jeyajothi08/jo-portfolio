// Splits on [UPPERCASE PLACEHOLDERS]; the captured tokens land on the odd indexes.
const PLACEHOLDER = /(\[[A-Z][^\]]*\])/

/** Renders text, highlighting any [PLACEHOLDER] so it is easy to spot and replace. */
export default function Rich({ text }) {
  if (typeof text !== 'string') return text
  return text.split(PLACEHOLDER).map((part, i) =>
    i % 2 ? (
      <mark key={i} className="ph">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
