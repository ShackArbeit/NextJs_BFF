type DemoHeaderProps = {
  title: string
  description?: string
  concepts?: string[]          
  observe?: string[]          
  warning?: string            
}

export default function DemoHeader({
  title,
  description,
  concepts = [],
  observe = [],
  warning,
}: DemoHeaderProps) {
  return (
    <header
      style={{
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: '1px solid #333',
      }}
    >
      <h1 style={{ margin: 0 }}>{title}</h1>

      {description && (
        <p style={{ marginTop: 6, opacity: 0.85, lineHeight: 1.6 }}>
          {description}
        </p>
      )}

      {concepts.length > 0 && (
        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {concepts.map((c) => (
            <span
              key={c}
              style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 999,
                border: '1px solid #444',
                background: '#111',
                opacity: 0.9,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {observe.length > 0 && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            border: '1px dashed #444',
            background: '#0f0f0f',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            👀 觀察重點
          </div>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {observe.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      )}
      {warning && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            border: '1px solid #553',
            background: '#16110a',
            fontSize: 13,
          }}
        >
          ⚠️ {warning}
        </div>
      )}
    </header>
  )
}
