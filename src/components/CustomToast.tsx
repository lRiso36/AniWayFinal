// components/CustomToast.tsx
type ToastType = 'error' | 'success'

type CustomToastProps = {
    message: string
    type: ToastType
}

export const CustomToast = ({ message, type }: CustomToastProps) => {
    const isError = type === 'error'

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#1a1a2e', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px 16px', minWidth: '280px', maxWidth: '320px' }}>
            <div style={{
                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                background: isError ? 'rgba(220,38,38,0.15)' : 'rgba(147,51,234,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {isError ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </div>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 500, color: 'white' }}>{message}</p>
        </div>
    )
}