import { useState, useEffect, useRef } from "react"

/* ── Design tokens ── */
const V = "hsl(263, 82%, 62%)"
const V_BRIGHT = "hsl(263, 90%, 68%)"
const V_DIM = "hsla(263, 82%, 62%, 0.12)"
const V_BORDER = "rgba(138, 79, 255, 0.22)"
const BG = "#0B0A10"
const BG2 = "#111019"
const BG3 = "#16141f"
const SURFACE = "#1a1826"
const SURFACE2 = "#211e2e"
const BORDER = "rgba(255, 255, 255, 0.065)"
const TEXT = "#ECE8F5"
const MUTED = "#7A7590"
const FAINT = "#3d3a50"

/* ── Reusable micro-components ── */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em",
      textTransform: "uppercase", color: V_BRIGHT,
      background: V_DIM, border: `1px solid ${V_BORDER}`,
      borderRadius: "4px", padding: "3px 8px",
      fontFamily: "var(--font-sans)",
    }}>
      {children}
    </span>
  )
}

function Btn({ children, primary, small, href }: {
  children: React.ReactNode
  primary?: boolean
  small?: boolean
  href?: string
}) {
  const [hovered, setHovered] = useState(false)
  const style: React.CSSProperties = primary ? {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: small ? "10px 20px" : "14px 28px",
    fontSize: small ? "13px" : "14px", fontWeight: 600,
    fontFamily: "var(--font-sans)", letterSpacing: "0.01em",
    background: hovered ? V_BRIGHT : V,
    color: "#fff", borderRadius: "6px", border: "none",
    cursor: "pointer", textDecoration: "none",
    transition: "background 0.2s, transform 0.15s",
    transform: hovered ? "translateY(-1px)" : "translateY(0)",
  } : {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: small ? "9px 20px" : "13px 28px",
    fontSize: small ? "13px" : "14px", fontWeight: 500,
    fontFamily: "var(--font-sans)", letterSpacing: "0.01em",
    background: "transparent",
    color: hovered ? TEXT : MUTED,
    borderRadius: "6px", border: `1px solid ${hovered ? "rgba(255,255,255,0.15)" : BORDER}`,
    cursor: "pointer", textDecoration: "none",
    transition: "color 0.2s, border-color 0.2s, transform 0.15s",
    transform: hovered ? "translateY(-1px)" : "translateY(0)",
  }

  const El = href ? "a" : "button"
  return (
    <El
      href={href}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </El>
  )
}

/* ── 1. Header ── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(11, 10, 16, 0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      transition: "background 0.35s, border-color 0.35s, backdrop-filter 0.35s",
    }}>
      <div style={{
        maxWidth: "1440px", margin: "0 auto",
        padding: "0 64px",
        height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Wordmark */}
        <a href="#" style={{ textDecoration: "none" }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700, fontSize: "18px",
            letterSpacing: "-0.03em", color: TEXT,
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            HUE
            <span style={{
              color: V, fontSize: "15px", fontWeight: 700,
              background: V_DIM, border: `1px solid ${V_BORDER}`,
              padding: "2px 7px", borderRadius: "4px",
            }}>263</span>
          </div>
        </a>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {["Work", "About", "Services", "Contact"].map(item => (
            <NavLink key={item} label={item} />
          ))}
        </nav>

        {/* CTA */}
        <Btn primary small>
          Let's Talk
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Btn>
      </div>
    </header>
  )
}

function NavLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={`#${label.toLowerCase()}`}
      style={{
        fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400,
        color: hovered ? TEXT : MUTED,
        textDecoration: "none",
        transition: "color 0.2s",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {hovered && (
        <span style={{
          position: "absolute", bottom: "-4px", left: 0,
          width: "100%", height: "1px", background: V,
        }} />
      )}
    </a>
  )
}

/* ── Hero UI Composition ── */
function UIComposition() {
  return (
    <div style={{ position: "relative", width: "440px", height: "400px", flexShrink: 0 }}>
      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "16px",
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Corner markers */}
      {[
        { top: 0, left: 0 },
        { top: 0, right: 0 },
        { bottom: 0, left: 0 },
        { bottom: 0, right: 0 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos,
          width: "10px", height: "10px",
          borderTop: i < 2 ? `1px solid ${FAINT}` : "none",
          borderBottom: i >= 2 ? `1px solid ${FAINT}` : "none",
          borderLeft: i % 2 === 0 ? `1px solid ${FAINT}` : "none",
          borderRight: i % 2 === 1 ? `1px solid ${FAINT}` : "none",
        }} />
      ))}

      {/* Main phone frame */}
      <div style={{
        position: "absolute", top: "32px", left: "24px",
        width: "176px", height: "320px",
        background: SURFACE,
        border: `1px solid rgba(255,255,255,0.1)`,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: `0 0 0 1px ${BORDER}, 0 24px 48px rgba(0,0,0,0.5)`,
      }}>
        {/* Phone notch */}
        <div style={{
          height: "32px", display: "flex", alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${BORDER}`,
          gap: "6px",
        }}>
          <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: BG3 }} />
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: BG3 }} />
        </div>
        {/* App header */}
        <div style={{ padding: "14px 14px 10px", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <div style={{ width: "60px", height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.12)" }} />
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: V }} />
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {["All", "Recent", "Saved"].map((t, i) => (
              <div key={t} style={{
                padding: "3px 8px", borderRadius: "4px", fontSize: "9px",
                fontFamily: "var(--font-sans)", fontWeight: 500,
                background: i === 0 ? V_DIM : "transparent",
                border: `1px solid ${i === 0 ? V_BORDER : BORDER}`,
                color: i === 0 ? V_BRIGHT : MUTED,
              }}>{t}</div>
            ))}
          </div>
        </div>
        {/* App content blocks */}
        <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              background: BG3, borderRadius: "8px", padding: "10px",
              border: `1px solid ${BORDER}`,
            }}>
              <div style={{ width: `${50 + i * 14}px`, height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.1)", marginBottom: "6px" }} />
              <div style={{ display: "flex", gap: "4px" }}>
                <div style={{ width: "32px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.06)" }} />
                <div style={{ width: "24px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.04)" }} />
              </div>
              {i === 2 && (
                <div style={{ marginTop: "8px", display: "flex", gap: "6px", alignItems: "center" }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: V_DIM, border: `1px solid ${V_BORDER}` }} />
                  <div style={{ flex: 1, height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.04)" }}>
                    <div style={{ width: "68%", height: "100%", borderRadius: "2px", background: V, opacity: 0.7 }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Bottom nav */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "44px", borderTop: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-around",
          padding: "0 16px",
        }}>
          {[
            <path key="a" d="M3 9l3-3 2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />,
            <circle key="b" cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />,
            <path key="c" d="M4 7h6M7 4v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />,
          ].map((icon, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 14 14"
              style={{ color: i === 0 ? V_BRIGHT : FAINT }}>
              {icon}
            </svg>
          ))}
        </div>
      </div>

      {/* Floating metrics card */}
      <div style={{
        position: "absolute", top: "48px", right: "16px",
        width: "200px",
        background: SURFACE2,
        border: `1px solid ${V_BORDER}`,
        borderRadius: "12px",
        padding: "16px",
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${V_BORDER}`,
      }}>
        <div style={{
          fontSize: "10px", fontFamily: "var(--font-sans)", fontWeight: 500,
          textTransform: "uppercase", letterSpacing: "0.08em", color: MUTED,
          marginBottom: "12px",
        }}>User Retention</div>
        {/* Chart bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "52px", marginBottom: "10px" }}>
          {[40, 60, 45, 80, 68, 90, 72].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: `${h}%`,
              background: i === 5 ? V : `rgba(138, 79, 255, 0.2)`,
              borderRadius: "3px 3px 0 0",
              border: `1px solid ${i === 5 ? V_BORDER : "transparent"}`,
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: TEXT }}>94%</div>
            <div style={{ fontSize: "10px", color: MUTED, fontFamily: "var(--font-sans)" }}>Monthly avg</div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "4px",
            color: "#4ade80", fontSize: "11px", fontFamily: "var(--font-sans)", fontWeight: 500,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 7L5 3l3 4" stroke="#4ade80" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            +12.4%
          </div>
        </div>
      </div>

      {/* Cursor element */}
      <div style={{
        position: "absolute", bottom: "100px", right: "52px",
        display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px",
      }}>
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
          <path d="M2 2L8.5 20L11 12L20 9L2 2Z" fill={V} fillOpacity="0.9" stroke={V_BRIGHT} strokeWidth="1" />
        </svg>
        <div style={{
          background: V, color: "#fff",
          fontSize: "9px", fontWeight: 600, fontFamily: "var(--font-sans)",
          padding: "2px 6px", borderRadius: "3px",
          whiteSpace: "nowrap",
        }}>
          Interactive
        </div>
      </div>

      {/* Color palette strip */}
      <div style={{
        position: "absolute", bottom: "24px", left: "24px",
        display: "flex", gap: "6px", alignItems: "center",
      }}>
        <div style={{ fontSize: "9px", color: FAINT, fontFamily: "var(--font-sans)", marginRight: "2px", letterSpacing: "0.05em" }}>PALETTE</div>
        {[V, "hsl(263, 40%, 35%)", "hsl(263, 20%, 20%)", "#1a1826", TEXT].map((c, i) => (
          <div key={i} style={{
            width: i === 0 ? "20px" : "14px",
            height: i === 0 ? "20px" : "14px",
            borderRadius: "50%",
            background: c,
            border: `1px solid rgba(255,255,255,0.1)`,
            boxShadow: i === 0 ? `0 0 8px ${V}60` : "none",
          }} />
        ))}
      </div>

      {/* Label annotation */}
      <div style={{
        position: "absolute", top: "20px", left: "24px",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <div style={{
          width: "5px", height: "5px", borderRadius: "50%", background: V,
          boxShadow: `0 0 6px ${V}`,
        }} />
        <span style={{ fontSize: "10px", color: MUTED, fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}>DESIGN PREVIEW</span>
      </div>
    </div>
  )
}

/* ── 2. Hero ── */
function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      padding: "0 64px",
      maxWidth: "1440px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "80px",
      paddingTop: "72px",
    }}>
      {/* Left: Text content */}
      <div style={{ flex: 1, maxWidth: "660px" }}>
        {/* Availability badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(74, 222, 128, 0.06)", border: "1px solid rgba(74, 222, 128, 0.18)",
          borderRadius: "100px", padding: "6px 14px 6px 10px",
          marginBottom: "48px",
        }}>
          <span style={{
            display: "inline-block", width: "7px", height: "7px", borderRadius: "50%",
            background: "#4ade80",
            boxShadow: "0 0 0 2px rgba(74,222,128,0.2)",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500,
            color: "#4ade80", letterSpacing: "0.03em",
          }}>
            Available for freelance projects
          </span>
        </div>

        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>

        {/* Hero headline */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(48px, 5.5vw, 80px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: TEXT,
          margin: "0 0 24px",
        }}>
          Designing digital
          <br />
          experiences that{" "}
          <span style={{ color: V, position: "relative", display: "inline-block" }}>
            feel
            <svg style={{ position: "absolute", bottom: "-4px", left: 0, width: "100%" }}
              viewBox="0 0 80 8" fill="none" height="8">
              <path d="M0 6 Q20 2 40 5 Q60 8 80 4" stroke={V} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
            </svg>
          </span>
          <br />
          as good as they look.
        </h1>

        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 300,
          color: MUTED, lineHeight: 1.65, margin: "0 0 48px",
          maxWidth: "480px",
        }}>
          UI/UX Designer focused on creating intuitive, memorable and visually refined digital products.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <Btn primary>
            View My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Btn>
          <Btn>About Me</Btn>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: "32px", marginTop: "64px",
          paddingTop: "32px", borderTop: `1px solid ${BORDER}`,
        }}>
          {[
            { num: "3+", label: "Years Experience" },
            { num: "20+", label: "Projects Delivered" },
            { num: "10+", label: "Happy Clients" },
          ].map(s => (
            <div key={s.label}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "28px", color: TEXT, letterSpacing: "-0.03em",
              }}>{s.num}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: MUTED }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: UI Composition */}
      <UIComposition />
    </section>
  )
}

/* ── Project Card Mockups ── */
function FintechMockup() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(135deg, #0f0d18 0%, #1a1530 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 30% 50%, hsla(263,82%,62%,0.08) 0%, transparent 60%)`,
      }} />
      {/* Phone mockup */}
      <div style={{
        width: "140px", height: "260px",
        background: "#0e0c1a",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "12px",
        boxShadow: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(138,79,255,0.1)",
        position: "relative",
      }}>
        <div style={{ background: SURFACE, borderRadius: "14px", height: "100%", padding: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ textAlign: "center", paddingBottom: "8px", borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ fontSize: "9px", color: MUTED, fontFamily: "var(--font-sans)", marginBottom: "4px" }}>Balance</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "20px", color: TEXT }}>$12,840</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "3px", marginTop: "2px" }}>
              <span style={{ fontSize: "8px", color: "#4ade80" }}>↑ 8.2%</span>
            </div>
          </div>
          {[70, 45, 85].map((w, i) => (
            <div key={i} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: i === 0 ? V_DIM : BG3, border: `1px solid ${i === 0 ? V_BORDER : BORDER}` }} />
              <div style={{ flex: 1 }}>
                <div style={{ width: `${w}%`, height: "5px", borderRadius: "3px", background: i === 0 ? V : "rgba(255,255,255,0.08)" }} />
              </div>
            </div>
          ))}
          <div style={{
            marginTop: "auto", display: "flex", gap: "4px",
            padding: "6px 0 0", borderTop: `1px solid ${BORDER}`,
          }}>
            {["Send", "Receive", "More"].map((t, i) => (
              <div key={t} style={{
                flex: 1, padding: "5px", background: i === 0 ? V_DIM : BG3,
                border: `1px solid ${i === 0 ? V_BORDER : BORDER}`,
                borderRadius: "5px", textAlign: "center",
                fontSize: "7px", color: i === 0 ? V_BRIGHT : MUTED,
                fontFamily: "var(--font-sans)", fontWeight: 500,
              }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
      {/* BG glow */}
      <div style={{
        position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)",
        width: "200px", height: "100px",
        background: `radial-gradient(ellipse, hsla(263,82%,62%,0.15) 0%, transparent 70%)`,
      }} />
    </div>
  )
}

function EcommerceMockup() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(135deg, #12100a 0%, #1e1a10 100%)`,
      display: "flex", alignItems: "flex-end",
      justifyContent: "flex-start",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background fashion-grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }} />
      {/* Color blocks */}
      <div style={{ position: "absolute", top: "24px", right: "24px", display: "flex", gap: "8px" }}>
        {[
          { bg: "#2a1f1a", h: "110px" },
          { bg: "#1e2a1f", h: "80px" },
          { bg: "#1a1a2a", h: "130px" },
        ].map((b, i) => (
          <div key={i} style={{
            width: "60px", height: b.h,
            background: b.bg, borderRadius: "6px",
            border: `1px solid rgba(255,255,255,0.06)`,
          }}>
            <div style={{ height: "4px", borderRadius: "2px 2px 0 0", background: i === 2 ? V : "transparent" }} />
          </div>
        ))}
      </div>
      {/* Product card */}
      <div style={{
        margin: "24px", width: "220px",
        background: "#1a1815",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "14px",
        boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
      }}>
        <div style={{
          width: "100%", height: "80px", background: "#262118",
          borderRadius: "6px", marginBottom: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 8h20l-2 14H8L6 8Z" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" />
            <circle cx="12" cy="26" r="2" fill="rgba(255,255,255,0.15)" />
            <circle cx="22" cy="26" r="2" fill="rgba(255,255,255,0.15)" />
          </svg>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "11px", color: TEXT, marginBottom: "2px" }}>Premium Edition</div>
            <div style={{ fontSize: "9px", color: MUTED, fontFamily: "var(--font-sans)" }}>Fashion Collection</div>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", color: V_BRIGHT }}>$289</div>
        </div>
      </div>
    </div>
  )
}

function SaasMockup() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(160deg, #0c0b14 0%, #121026 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "24px",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 70% 30%, hsla(263,82%,62%,0.06) 0%, transparent 60%)`,
      }} />
      {/* Dashboard window */}
      <div style={{
        width: "100%", maxWidth: "340px",
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}>
        {/* Titlebar */}
        <div style={{
          height: "32px", background: BG2,
          borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center",
          padding: "0 12px", gap: "6px",
        }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
          ))}
        </div>
        {/* Dashboard content */}
        <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {/* Stat row */}
          <div style={{ display: "flex", gap: "6px" }}>
            {[
              { label: "Users", val: "2.4k", up: true },
              { label: "Revenue", val: "$18k", up: true },
              { label: "Churn", val: "1.2%", up: false },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, background: BG3, borderRadius: "6px", padding: "8px",
                border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: "8px", color: MUTED, fontFamily: "var(--font-sans)", marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "13px", color: TEXT }}>{s.val}</div>
                <div style={{ fontSize: "7px", color: s.up ? "#4ade80" : "#f87171", marginTop: "2px" }}>{s.up ? "↑" : "↓"} 12%</div>
              </div>
            ))}
          </div>
          {/* Mini chart area */}
          <div style={{
            background: BG3, borderRadius: "6px", padding: "8px",
            border: `1px solid ${BORDER}`,
          }}>
            <div style={{ fontSize: "8px", color: MUTED, fontFamily: "var(--font-sans)", marginBottom: "6px" }}>Analytics Overview</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "36px" }}>
              {[30, 50, 40, 70, 55, 85, 65, 90, 70, 80].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h}%`,
                  background: i === 7 ? V : `hsla(263,82%,62%,${0.15 + i * 0.02})`,
                  borderRadius: "2px 2px 0 0",
                }} />
              ))}
            </div>
          </div>
          {/* Table rows */}
          {[1, 2].map(i => (
            <div key={i} style={{
              display: "flex", gap: "6px", alignItems: "center",
              padding: "6px 0", borderBottom: `1px solid ${BORDER}`,
            }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: i === 1 ? V_DIM : BG3, border: `1px solid ${i === 1 ? V_BORDER : BORDER}` }} />
              <div style={{ flex: 1, height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ width: "30px", height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.04)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── 3. Selected Work ── */
const PROJECTS = [
  {
    num: "01",
    title: "Fintech Mobile App",
    desc: "Mobile banking experience redesign focused on clarity, trust, and seamless financial management.",
    category: "Mobile Design",
    year: "2024",
    tags: ["UX Research", "UI Design", "Prototyping", "iOS"],
    Mockup: FintechMockup,
    layout: "portrait",
  },
  {
    num: "02",
    title: "E-commerce Experience",
    desc: "Premium fashion shopping platform redefining the luxury retail experience online.",
    category: "E-commerce",
    year: "2024",
    tags: ["Web Design", "Design System", "Interaction"],
    Mockup: EcommerceMockup,
    layout: "landscape",
  },
  {
    num: "03",
    title: "SaaS Dashboard",
    desc: "Analytics and management platform that makes complex data intuitive and actionable.",
    category: "Product Design",
    year: "2023",
    tags: ["Dashboard", "Data Viz", "UX Design", "Systems"],
    Mockup: SaasMockup,
    layout: "wide",
  },
]

function ProjectCard({ project, layout }: { project: typeof PROJECTS[0]; layout: string }) {
  const [hovered, setHovered] = useState(false)

  if (layout === "landscape") {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          border: `1px solid ${hovered ? V_BORDER : BORDER}`,
          borderRadius: "12px", overflow: "hidden",
          transition: "border-color 0.3s",
          background: SURFACE,
        }}
      >
        {/* Image left */}
        <div style={{ height: "320px", overflow: "hidden" }}>
          <project.Mockup />
        </div>
        {/* Content right */}
        <div style={{ padding: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: FAINT, letterSpacing: "0.06em" }}>
                {project.num}
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: MUTED }}>{project.year}</span>
            </div>
            <Tag>{project.category}</Tag>
            <h3 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "28px", color: TEXT, letterSpacing: "-0.02em",
              margin: "16px 0 12px",
            }}>{project.title}</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: MUTED, lineHeight: 1.65 }}>
              {project.desc}
            </p>
          </div>
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
              {project.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-sans)", fontSize: "11px", color: MUTED,
                  border: `1px solid ${BORDER}`, borderRadius: "4px", padding: "3px 8px",
                }}>{t}</span>
              ))}
            </div>
            <CaseStudyLink hovered={hovered} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? V_BORDER : BORDER}`,
        borderRadius: "12px", overflow: "hidden",
        transition: "border-color 0.3s",
        background: SURFACE,
      }}
    >
      {/* Image */}
      <div style={{ height: layout === "wide" ? "280px" : "320px", overflow: "hidden" }}>
        <project.Mockup />
      </div>
      {/* Content */}
      <div style={{ padding: "28px 28px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <Tag>{project.category}</Tag>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: FAINT, letterSpacing: "0.05em" }}>
              {project.num}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: MUTED }}>{project.year}</span>
          </div>
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: layout === "wide" ? "22px" : "24px",
          color: TEXT, letterSpacing: "-0.02em",
          margin: "0 0 10px",
        }}>{project.title}</h3>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "14px",
          color: MUTED, lineHeight: 1.65, margin: "0 0 20px",
        }}>{project.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: "var(--font-sans)", fontSize: "11px", color: MUTED,
              border: `1px solid ${BORDER}`, borderRadius: "4px", padding: "3px 8px",
            }}>{t}</span>
          ))}
        </div>
        <CaseStudyLink hovered={hovered} />
      </div>
    </div>
  )
}

function CaseStudyLink({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 500,
      color: hovered ? V_BRIGHT : MUTED,
      cursor: "pointer",
      transition: "color 0.2s",
    }}>
      View Case Study
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
        style={{ transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "transform 0.2s" }}>
        <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function SelectedWork() {
  return (
    <section id="work" style={{ padding: "120px 64px", maxWidth: "1440px", margin: "0 auto" }}>
      {/* Section header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: "64px", paddingBottom: "32px",
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: V, marginBottom: "12px",
          }}>Portfolio</div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(36px, 4vw, 56px)", color: TEXT,
            letterSpacing: "-0.03em", margin: 0,
          }}>Selected Work</h2>
        </div>
        <Btn>View All Projects</Btn>
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <ProjectCard project={PROJECTS[0]} layout="portrait" />
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <ProjectCard project={PROJECTS[1]} layout="landscape" />
          <ProjectCard project={PROJECTS[2]} layout="wide" />
        </div>
      </div>
    </section>
  )
}

/* ── 4. About ── */
const SKILLS = [
  "UI Design", "UX Research", "Wireframing",
  "Prototyping", "Design Systems", "Interaction Design",
]

function About() {
  return (
    <section id="about" style={{
      padding: "120px 64px",
      maxWidth: "1440px", margin: "0 auto",
      borderTop: `1px solid ${BORDER}`,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
        {/* Left */}
        <div>
          <div style={{
            fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: V, marginBottom: "20px",
          }}>About</div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(32px, 3.5vw, 52px)", color: TEXT,
            letterSpacing: "-0.03em", margin: "0 0 28px",
            lineHeight: 1.08,
          }}>Design with<br />purpose.</h2>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "16px",
            color: MUTED, lineHeight: 1.75,
            margin: "0 0 16px",
          }}>
            I'm a UI/UX designer who believes that good design is invisible — it removes friction, builds trust, and creates moments of delight that users remember long after the interaction ends.
          </p>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "16px",
            color: MUTED, lineHeight: 1.75,
            margin: "0 0 48px",
          }}>
            My process is rooted in understanding real user problems first, then crafting elegant digital experiences that balance function and form with precision.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "0", borderTop: `1px solid ${BORDER}`, borderLeft: `1px solid ${BORDER}` }}>
            {[
              { num: "3+", label: "Years of Experience" },
              { num: "20+", label: "Projects Completed" },
              { num: "10+", label: "Happy Clients" },
            ].map(s => (
              <div key={s.label} style={{
                flex: 1, padding: "24px",
                borderRight: `1px solid ${BORDER}`,
                borderBottom: `1px solid ${BORDER}`,
              }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "36px", color: V_BRIGHT,
                  letterSpacing: "-0.04em", marginBottom: "4px",
                }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: MUTED }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Skills */}
        <div>
          <div style={{ marginBottom: "40px" }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: "12px",
              color: MUTED, letterSpacing: "0.06em", textTransform: "uppercase",
              marginBottom: "20px",
            }}>Expertise</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {SKILLS.map((skill, i) => (
                <SkillItem key={skill} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div style={{
            padding: "24px", background: BG2,
            border: `1px solid ${BORDER}`, borderRadius: "10px",
          }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: "12px",
              color: MUTED, letterSpacing: "0.06em", textTransform: "uppercase",
              marginBottom: "16px",
            }}>Tools</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Figma", "Framer", "Principle", "Notion", "Lottie", "Zeplin", "ProtoPie"].map(tool => (
                <span key={tool} style={{
                  fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500,
                  color: MUTED, background: BG3,
                  border: `1px solid ${BORDER}`, borderRadius: "4px",
                  padding: "4px 10px",
                }}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillItem({ skill, index }: { skill: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 16px",
        background: hovered ? SURFACE : "transparent",
        border: `1px solid ${hovered ? V_BORDER : BORDER}`,
        borderRadius: "8px",
        cursor: "default",
        transition: "all 0.2s",
        display: "flex", alignItems: "center", gap: "10px",
      }}
    >
      <div style={{
        width: "6px", height: "6px", borderRadius: "50%",
        background: hovered ? V : FAINT,
        transition: "background 0.2s",
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: "14px",
        color: hovered ? TEXT : MUTED,
        fontWeight: 400, transition: "color 0.2s",
      }}>{skill}</span>
    </div>
  )
}

/* ── 5. Process ── */
const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Dive deep into user research, competitor analysis, and stakeholder interviews to understand the problem space.",
  },
  {
    num: "02",
    title: "Define",
    desc: "Synthesize insights into clear problem statements, user personas, and measurable design goals.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Explore, iterate, and refine solutions through wireframes, prototypes, and high-fidelity interfaces.",
  },
  {
    num: "04",
    title: "Refine",
    desc: "Test with real users, gather feedback, and polish every interaction until the experience feels effortless.",
  },
]

function Process() {
  return (
    <section style={{
      padding: "120px 64px",
      maxWidth: "1440px", margin: "0 auto",
      borderTop: `1px solid ${BORDER}`,
    }}>
      {/* Header */}
      <div style={{ marginBottom: "72px" }}>
        <div style={{
          fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: V, marginBottom: "12px",
        }}>Process</div>
        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "clamp(32px, 3.5vw, 52px)", color: TEXT,
          letterSpacing: "-0.03em", margin: 0,
        }}>How I work.</h2>
      </div>

      {/* Steps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", position: "relative" }}>
        {/* Connector line */}
        <div style={{
          position: "absolute", top: "28px", left: "calc(12.5% + 8px)", right: "calc(12.5% + 8px)",
          height: "1px", background: `linear-gradient(90deg, ${BORDER} 0%, ${V_BORDER} 50%, ${BORDER} 100%)`,
          pointerEvents: "none",
        }} />

        {STEPS.map((step, i) => (
          <ProcessStep key={step.num} step={step} isLast={i === STEPS.length - 1} />
        ))}
      </div>
    </section>
  )
}

function ProcessStep({ step, isLast }: { step: typeof STEPS[0]; isLast: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "0 32px 0 0",
        paddingRight: isLast ? 0 : "32px",
      }}
    >
      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: hovered ? V : BG2,
          border: `1px solid ${hovered ? V : BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.25s",
          position: "relative", zIndex: 1,
          boxShadow: hovered ? `0 0 16px hsla(263,82%,62%,0.4)` : "none",
        }}>
          <span style={{
            fontFamily: "var(--font-sans)", fontSize: "10px",
            fontWeight: 600, color: hovered ? "#fff" : MUTED,
            transition: "color 0.25s",
          }}>{step.num}</span>
        </div>
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "22px", color: TEXT, letterSpacing: "-0.02em",
        margin: "0 0 12px",
      }}>{step.title}</h3>
      <p style={{
        fontFamily: "var(--font-sans)", fontSize: "14px",
        color: MUTED, lineHeight: 1.7, margin: 0,
      }}>{step.desc}</p>
    </div>
  )
}

/* ── 6. Testimonial ── */
function Testimonial() {
  return (
    <section style={{
      padding: "120px 64px",
      maxWidth: "1440px", margin: "0 auto",
      borderTop: `1px solid ${BORDER}`,
    }}>
      <div style={{
        background: BG2, border: `1px solid ${BORDER}`,
        borderRadius: "16px", padding: "80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Purple glow */}
        <div style={{
          position: "absolute", top: "-60px", left: "-60px",
          width: "300px", height: "300px",
          background: "radial-gradient(circle, hsla(263,82%,62%,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Quote mark */}
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "160px", fontWeight: 800,
          color: V, opacity: 0.12,
          lineHeight: 1, marginBottom: "-40px",
          marginTop: "-24px", userSelect: "none",
        }}>"</div>

        <blockquote style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(22px, 2.5vw, 34px)",
          fontWeight: 600, color: TEXT,
          letterSpacing: "-0.02em",
          lineHeight: 1.35,
          margin: "0 0 48px",
          maxWidth: "800px",
        }}>
          Working with this designer transformed our product entirely. They brought clarity to complexity, and the result was an experience our users genuinely love to use.
        </blockquote>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Avatar */}
          <div style={{
            width: "48px", height: "48px", borderRadius: "50%",
            background: `linear-gradient(135deg, ${V} 0%, hsla(263,60%,40%,1) 100%)`,
            border: `2px solid ${V_BORDER}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "16px", color: "#fff",
          }}>
            S
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-sans)", fontWeight: 600,
              fontSize: "15px", color: TEXT, marginBottom: "2px",
            }}>Sarah Mitchell</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: MUTED }}>
              Chief Product Officer, NovaPay
            </div>
          </div>
          {/* Decorative divider */}
          <div style={{ flex: 1 }} />
          <div style={{
            display: "flex", gap: "3px",
          }}>
            {[1, 2, 3, 4, 5].map(i => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={V} opacity={0.9}>
                <path d="M8 1.5l1.8 3.6L14 5.9l-3 2.9.7 4.1L8 10.8l-3.7 2.1.7-4.1L2 5.9l4.2-.8L8 1.5Z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 7. Contact CTA ── */
function ContactCTA() {
  const [email, setEmail] = useState("")
  const [focused, setFocused] = useState(false)

  return (
    <section id="contact" style={{
      padding: "120px 64px 80px",
      maxWidth: "1440px", margin: "0 auto",
      borderTop: `1px solid ${BORDER}`,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "80px", alignItems: "end" }}>
        {/* Left */}
        <div>
          <div style={{
            fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: V, marginBottom: "20px",
          }}>Get in Touch</div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "clamp(36px, 4.5vw, 68px)", color: TEXT,
            letterSpacing: "-0.03em", margin: "0 0 16px",
            lineHeight: 1.06,
          }}>
            Have a project<br />in mind? <span style={{ color: V }}>Let's create</span><br />
            something memorable.
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: MUTED, lineHeight: 1.7, margin: "0 0 40px" }}>
            Open to freelance projects, collaborations, and full-time opportunities.
          </p>

          {/* Email input */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "48px", maxWidth: "500px" }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1, padding: "14px 16px",
                background: BG2, color: TEXT,
                fontFamily: "var(--font-sans)", fontSize: "14px",
                border: `1px solid ${focused ? V_BORDER : BORDER}`,
                borderRadius: "6px", outline: "none",
                transition: "border-color 0.2s",
              }}
            />
            <Btn primary>
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Btn>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: FAINT, letterSpacing: "0.05em" }}>FIND ME ON</span>
            {[
              { label: "Behance", icon: "Be" },
              { label: "Dribbble", icon: "Dr" },
              { label: "LinkedIn", icon: "in" },
            ].map(s => (
              <SocialPill key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Right: Contact info */}
        <div style={{
          background: BG2, border: `1px solid ${BORDER}`,
          borderRadius: "12px", padding: "32px",
          minWidth: "260px",
        }}>
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: "11px", color: MUTED,
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px",
            }}>Email</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: TEXT }}>
              hello@hue263.design
            </div>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: "11px", color: MUTED,
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "8px",
            }}>Availability</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80",
                boxShadow: "0 0 0 2px rgba(74,222,128,0.2)",
              }} />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#4ade80" }}>
                Open for work
              </span>
            </div>
          </div>
          <div style={{ paddingTop: "24px", borderTop: `1px solid ${BORDER}` }}>
            <div style={{
              fontFamily: "var(--font-sans)", fontSize: "11px", color: MUTED,
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px",
            }}>Response Time</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: TEXT }}>
              Within 24 hours
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialPill({ label, icon }: { label: string; icon: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "8px 14px",
        background: hovered ? SURFACE : "transparent",
        border: `1px solid ${hovered ? V_BORDER : BORDER}`,
        borderRadius: "6px", textDecoration: "none",
        transition: "all 0.2s",
      }}
    >
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "11px", color: hovered ? V_BRIGHT : MUTED,
        transition: "color 0.2s",
      }}>{icon}</span>
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: "12px",
        color: hovered ? TEXT : MUTED, transition: "color 0.2s",
      }}>{label}</span>
    </a>
  )
}

/* ── 8. Footer ── */
function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer style={{
      borderTop: `1px solid ${BORDER}`,
      padding: "40px 64px",
      maxWidth: "1440px", margin: "0 auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "16px", color: TEXT, letterSpacing: "-0.02em",
            marginBottom: "4px",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            HUE
            <span style={{
              color: V, fontSize: "13px", fontWeight: 700,
              background: V_DIM, border: `1px solid ${V_BORDER}`,
              padding: "1px 6px", borderRadius: "3px",
            }}>263</span>
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: MUTED }}>
            UI/UX Designer
          </div>
        </div>

        {/* Center: copyright */}
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: FAINT }}>
          © 2024 HUE 263. All rights reserved.
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {["Behance", "Dribbble", "LinkedIn"].map(s => (
            <a key={s} href="#" style={{
              fontFamily: "var(--font-sans)", fontSize: "12px",
              color: MUTED, textDecoration: "none",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >{s}</a>
          ))}
          <button
            onClick={scrollToTop}
            style={{
              background: BG2, border: `1px solid ${BORDER}`,
              borderRadius: "6px", padding: "8px 12px",
              cursor: "pointer", color: MUTED,
              fontFamily: "var(--font-sans)", fontSize: "11px",
              letterSpacing: "0.05em", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: "6px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = V_BORDER
              e.currentTarget.style.color = TEXT
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = BORDER
              e.currentTarget.style.color = MUTED
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Top
          </button>
        </div>
      </div>
    </footer>
  )
}

/* ── Root ── */
export default function App() {
  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh", overflowX: "hidden" }}>
      <Header />
      <main>
        <Hero />
        <SelectedWork />
        <About />
        <Process />
        <Testimonial />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}
