// sections.jsx — All section components for the wedding invitation

const { useState, useEffect, useRef, useMemo } = React;

// ─── DETAILS (the actual content, also editable via Tweaks) ──────────────────
const DEFAULT_DETAILS = {
  bride: "Amelia",
  groom: "Julien",
  brideFull: "Amelia Rose Whitlock",
  groomFull: "Julien Pierre Marchand",
  dateLong: "Saturday, the twelfth of September, two thousand twenty-six",
  dateShort: "12 . 09 . 2026",
  weddingISO: "2026-09-12T16:00:00",
  city: "Lake Como, Italy",
  venue: "Villa Astoria",
  venueAddr: "Via Roma 28, Cernobbio CO",
  hashtag: "#AmeliaAndJulien2026",
};

// ─── BOTANICAL MONOGRAM (custom SVG, not slop) ───────────────────────────────
function Monogram({ a = "A", b = "J", size = 180 }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 200 180" aria-hidden="true">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      {/* left botanical sprig */}
      <g stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.7">
        <path d="M30 130 Q40 90 55 60" />
        <path d="M40 110 Q30 105 25 100" />
        <path d="M40 110 Q50 108 56 102" />
        <path d="M46 90 Q36 86 30 82" />
        <path d="M46 90 Q55 88 61 84" />
        <path d="M52 72 Q44 70 39 67" />
        <path d="M52 72 Q60 70 66 67" />
      </g>
      {/* right botanical sprig */}
      <g stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.7">
        <path d="M170 130 Q160 90 145 60" />
        <path d="M160 110 Q170 105 175 100" />
        <path d="M160 110 Q150 108 144 102" />
        <path d="M154 90 Q164 86 170 82" />
        <path d="M154 90 Q145 88 139 84" />
        <path d="M148 72 Q156 70 161 67" />
        <path d="M148 72 Q140 70 134 67" />
      </g>
      {/* leaves dots */}
      <g fill="var(--accent)" opacity="0.6">
        <ellipse cx="25" cy="100" rx="3" ry="1.5" transform="rotate(-30 25 100)" />
        <ellipse cx="56" cy="102" rx="3" ry="1.5" transform="rotate(30 56 102)" />
        <ellipse cx="30" cy="82" rx="2.6" ry="1.3" transform="rotate(-25 30 82)" />
        <ellipse cx="61" cy="84" rx="2.6" ry="1.3" transform="rotate(25 61 84)" />
        <ellipse cx="39" cy="67" rx="2.2" ry="1.1" transform="rotate(-20 39 67)" />
        <ellipse cx="66" cy="67" rx="2.2" ry="1.1" transform="rotate(20 66 67)" />
        <ellipse cx="175" cy="100" rx="3" ry="1.5" transform="rotate(30 175 100)" />
        <ellipse cx="144" cy="102" rx="3" ry="1.5" transform="rotate(-30 144 102)" />
        <ellipse cx="170" cy="82" rx="2.6" ry="1.3" transform="rotate(25 170 82)" />
        <ellipse cx="139" cy="84" rx="2.6" ry="1.3" transform="rotate(-25 139 84)" />
        <ellipse cx="161" cy="67" rx="2.2" ry="1.1" transform="rotate(20 161 67)" />
        <ellipse cx="134" cy="67" rx="2.2" ry="1.1" transform="rotate(-20 134 67)" />
      </g>
      {/* the ampersand / monogram circle */}
      <circle cx="100" cy="90" r="44" fill="none" stroke="var(--ink)" strokeWidth="0.6" opacity="0.5" />
      <circle cx="100" cy="90" r="40" fill="none" stroke="url(#mg)" strokeWidth="0.5" />
      <text x="100" y="103" textAnchor="middle"
            style={{ font: "italic 300 54px 'Cormorant Garamond', serif", fill: "var(--ink)" }}>
        {a}<tspan dx="-2" style={{ fontStyle: "italic", fill: "var(--accent)" }}>&amp;</tspan>{b}
      </text>
    </svg>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ d, variant }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const stage = {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "5vh 8vw 4vh",
  };

  const TopBar = (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      paddingBottom: 24, borderBottom: "1px solid var(--rule)",
    }}>
      <div className="label" style={{ letterSpacing: ".4em" }}>Save the Date</div>
      <div className="script" style={{ fontSize: 22, color: "var(--ink)" }}>
        {d.bride[0]}<span style={{ color: "var(--accent)", margin: "0 4px" }}>·</span>{d.groom[0]}
      </div>
      <div className="label" style={{ letterSpacing: ".4em" }}>No. I</div>
    </div>
  );

  /* ── Layout A: Centered cover ── */
  if (variant === "centered") {
    return (
      <section className="s" style={stage}>
        {TopBar}
        <div style={{ flex: 1, display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", textAlign: "center", gap: 32 }}>
          <div className="label">Together with their families</div>

          <h1 className="display" style={{
            fontSize: "clamp(60px, 11vw, 200px)",
            margin: 0,
            fontStyle: "italic",
            fontWeight: 300,
          }}>
            <span style={{ display: "block" }}>{d.bride}</span>
            <span className="script" style={{
              fontStyle: "normal", fontSize: "0.55em", color: "var(--accent)",
              display: "block", margin: "-0.05em 0",
            }}>&amp;</span>
            <span style={{ display: "block" }}>{d.groom}</span>
          </h1>

          <div className="label" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span className="hairline"></span>
            <span>Invite you to celebrate their wedding</span>
            <span className="hairline"></span>
          </div>

          <Monogram a={d.bride[0]} b={d.groom[0]} size={140} />
        </div>

        <Footer d={d} scrolled={scrolled} />
      </section>
    );
  }

  /* ── Layout B: Editorial stacked ── */
  if (variant === "editorial") {
    return (
      <section className="s" style={stage}>
        {TopBar}
        <div style={{ flex: 1, display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      alignItems: "center", gap: 40, padding: "40px 0" }}>
          {/* left */}
          <div>
            <div className="label" style={{ marginBottom: 16 }}>The Bride</div>
            <div className="display" style={{ fontSize: "clamp(64px, 10vw, 180px)", fontStyle: "italic" }}>
              {d.bride}
            </div>
            <div className="label" style={{ marginTop: 24, opacity: .8 }}>{d.brideFull}</div>
          </div>

          {/* center ampersand */}
          <div style={{ textAlign: "center" }}>
            <div className="display" style={{
              fontSize: "clamp(80px, 14vw, 240px)",
              fontStyle: "italic", color: "var(--accent)", lineHeight: 1,
            }}>&amp;</div>
            <div className="label" style={{ marginTop: 16 }}>{d.dateShort}</div>
          </div>

          {/* right */}
          <div style={{ textAlign: "right" }}>
            <div className="label" style={{ marginBottom: 16 }}>The Groom</div>
            <div className="display" style={{ fontSize: "clamp(64px, 10vw, 180px)", fontStyle: "italic" }}>
              {d.groom}
            </div>
            <div className="label" style={{ marginTop: 24, opacity: .8 }}>{d.groomFull}</div>
          </div>
        </div>

        <Footer d={d} scrolled={scrolled} />
      </section>
    );
  }

  /* ── Layout C: Cover with image plate ── */
  return (
    <section className="s" style={stage}>
      {TopBar}
      <div style={{ flex: 1, display: "grid",
                    gridTemplateColumns: "1.1fr 1fr",
                    gap: "6vw", alignItems: "center", padding: "40px 0" }}>
        <div>
          <div className="label" style={{ marginBottom: 24 }}>{d.dateShort} — {d.city}</div>
          <h1 className="display" style={{
            fontSize: "clamp(56px, 10vw, 180px)",
            margin: 0, fontStyle: "italic", fontWeight: 300,
          }}>
            {d.bride}<br/>
            <span className="script" style={{
              fontStyle: "normal", color: "var(--accent)",
              fontSize: "0.7em", display: "inline-block", padding: "0 .2em",
            }}>and</span><br/>
            {d.groom}
          </h1>
          <div style={{ marginTop: 40, maxWidth: 380 }}>
            <div className="label">Are getting married</div>
            <p style={{
              marginTop: 12, fontSize: 19, lineHeight: 1.55,
              fontStyle: "italic", color: "var(--ink-soft)",
            }}>
              Two souls, one promise — and a small celebration on the shores of Lake Como.
              You are warmly invited to be part of it.
            </p>
          </div>
        </div>

        <div style={{
          aspectRatio: "3 / 4",
          background: "linear-gradient(135deg, var(--bg-deep), var(--accent-2))",
          borderRadius: 4,
          position: "relative", overflow: "hidden",
          boxShadow: "0 30px 80px -30px rgba(46,26,36,.4)",
        }}>
          <ImagePlate label="A &amp; J — Portrait" />
        </div>
      </div>

      <Footer d={d} scrolled={scrolled} />
    </section>
  );
}

function Footer({ d, scrolled }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      paddingTop: 24, borderTop: "1px solid var(--rule)",
    }}>
      <div className="label">{d.city}</div>
      <div style={{
        opacity: scrolled ? 0 : 1, transition: "opacity .4s",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <div className="label" style={{ fontSize: 9 }}>Scroll</div>
        <svg width="14" height="40" viewBox="0 0 14 40">
          <line x1="7" y1="0" x2="7" y2="36" stroke="var(--ink)" strokeWidth="0.5" />
          <polyline points="3,30 7,38 11,30" fill="none" stroke="var(--ink)" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="label">Est. 2026</div>
    </div>
  );
}

// placeholder image plate
function ImagePlate({ label = "Photo" }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "rgba(255,255,255,.7)",
    }}>
      <svg width="100%" height="100%" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice"
           style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.6" fill="rgba(255,255,255,.3)" />
          </pattern>
        </defs>
        <rect width="300" height="400" fill="url(#dots)" />
        {/* abstract botanical silhouette */}
        <g stroke="rgba(255,255,255,.4)" strokeWidth="0.6" fill="none">
          <path d="M150 380 Q140 240 130 100" />
          <path d="M140 320 Q120 310 105 305" />
          <path d="M140 320 Q160 318 175 312" />
          <path d="M138 280 Q118 275 100 270" />
          <path d="M138 280 Q160 275 178 268" />
          <path d="M135 230 Q117 222 102 215" />
          <path d="M135 230 Q156 222 172 213" />
          <path d="M132 180 Q116 170 102 162" />
          <path d="M132 180 Q150 170 168 160" />
        </g>
      </svg>
      <div style={{ position: "relative", textAlign: "center" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="5" width="18" height="14" rx="1" />
          <circle cx="9" cy="11" r="1.5" />
          <path d="M21 17l-4-4-6 6" />
        </svg>
        <div style={{
          marginTop: 12, fontSize: 10, letterSpacing: ".3em",
          textTransform: "uppercase", fontFamily: "var(--font-label)",
        }} dangerouslySetInnerHTML={{ __html: label }} />
      </div>
    </div>
  );
}

// ─── COUNTDOWN ───────────────────────────────────────────────────────────────
function Countdown({ d }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const target = new Date(d.weddingISO);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const units = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: mins, l: "Minutes" },
    { v: secs, l: "Seconds" },
  ];

  return (
    <section className="s" style={{
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      background: "linear-gradient(180deg, transparent, var(--bg-deep) 50%, transparent)",
      padding: "100px 8vw",
    }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="label">Counting down to</div>
        <h2 className="display" style={{
          fontSize: "clamp(36px, 5vw, 64px)",
          fontStyle: "italic", margin: "16px 0 0",
        }}>the happiest day</h2>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        maxWidth: 800, margin: "0 auto",
        gap: 0,
      }}>
        {units.map((u, i) => (
          <div key={u.l} style={{
            textAlign: "center", padding: "0 12px",
            borderLeft: i > 0 ? "1px solid var(--rule)" : "none",
          }}>
            <div className="display" style={{
              fontSize: "clamp(48px, 7vw, 84px)",
              fontStyle: "italic", lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}>
              {String(u.v).padStart(2, "0")}
            </div>
            <div className="label" style={{ marginTop: 16 }}>{u.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── OUR STORY ───────────────────────────────────────────────────────────────
function Story({ d }) {
  return (
    <section className="s">
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6vw",
        alignItems: "center", maxWidth: 1200, margin: "0 auto",
      }} className="story-grid">
        <div style={{
          aspectRatio: "4 / 5",
          background: "linear-gradient(160deg, var(--accent-2), var(--bg-deep))",
          position: "relative", overflow: "hidden",
          boxShadow: "0 30px 60px -30px rgba(46,26,36,.3)",
        }}>
          <ImagePlate label="The first dance" />
        </div>

        <div>
          <div className="label" style={{ marginBottom: 8 }}>Chapter One</div>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 6vw, 88px)",
            fontStyle: "italic", margin: "0 0 32px",
          }}>
            Our<br/>story.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
            <p style={{ fontSize: 19, fontStyle: "italic", color: "var(--ink-soft)", margin: 0 }}>
              It began on a rainy Tuesday in a small bookshop on Rue de Seine —
              a borrowed umbrella, a recommended novel, and a coffee that turned into eight years.
            </p>
            <p style={{ margin: 0 }}>
              Through three cities, two cats, one rescue dog, countless mornings,
              and one very dramatic proposal at the top of Pic du Midi —
              we have arrived here, and we cannot wait to celebrate with you.
            </p>

            <div style={{ display: "flex", gap: 32, marginTop: 16, alignItems: "center" }}>
              <span className="hairline" style={{ width: 40 }}></span>
              <div className="script" style={{ fontSize: 28, color: "var(--accent)" }}>
                forever &amp; ever
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:720px){.story-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── SCHEDULE ────────────────────────────────────────────────────────────────
function Schedule({ d }) {
  const events = [
    { time: "3:30 PM", title: "Arrival & Welcome",  loc: "Villa Astoria Gardens",     icon: "✦" },
    { time: "4:00 PM", title: "Ceremony",            loc: "Lakeside Pavilion",         icon: "❦" },
    { time: "5:00 PM", title: "Aperitivo",           loc: "South Terrace",             icon: "✧" },
    { time: "7:00 PM", title: "Dinner",              loc: "The Orangery",              icon: "❉" },
    { time: "9:30 PM", title: "First Dance",         loc: "The Ballroom",              icon: "❀" },
    { time: "12:00 AM", title: "Late-night sweets",  loc: "Library Lounge",            icon: "✦" },
  ];

  return (
    <section className="s" style={{ background: "var(--bg-deep)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="label">The Itinerary</div>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 6vw, 88px)",
            fontStyle: "italic", margin: "16px 0 0",
          }}>
            The day, hour by hour.
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {/* center timeline */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: 1, background: "var(--rule)", transform: "translateX(-50%)",
          }} className="tl-line"></div>

          {events.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <div key={i} className="tl-row" style={{
                display: "grid", gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center", marginBottom: 40,
              }}>
                <div style={{
                  textAlign: left ? "right" : "left",
                  paddingRight: left ? 40 : 0,
                  paddingLeft: left ? 0 : 40,
                  gridColumn: left ? 1 : 3,
                }}>
                  <div className="label">{e.time}</div>
                  <div className="display" style={{
                    fontSize: 32, fontStyle: "italic", margin: "4px 0 4px",
                  }}>{e.title}</div>
                  <div style={{ color: "var(--muted)", fontStyle: "italic" }}>{e.loc}</div>
                </div>

                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "var(--bg)", border: "1px solid var(--rule)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--accent)", fontSize: 16,
                  position: "relative", zIndex: 1,
                }}>
                  {e.icon}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media(max-width:720px){
          .tl-line{left:18px!important;transform:none!important}
          .tl-row{grid-template-columns:36px 1fr!important;gap:24px}
          .tl-row > div:first-child, .tl-row > div:last-child{
            text-align:left!important;padding:0!important;grid-column:2!important
          }
          .tl-row > div:nth-child(2){grid-column:1;grid-row:1}
        }
      `}</style>
    </section>
  );
}

// ─── VENUE ───────────────────────────────────────────────────────────────────
function Venue({ d }) {
  return (
    <section className="s">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="label">The Setting</div>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 6vw, 88px)",
            fontStyle: "italic", margin: "16px 0 0",
          }}>{d.venue}.</h2>
          <p style={{
            marginTop: 24, fontStyle: "italic", color: "var(--ink-soft)",
            maxWidth: 560, margin: "16px auto 0", fontSize: 18,
          }}>
            A neoclassical villa on the western shore of Lake Como, with cypress avenues,
            a private orangery, and a view that we promise will steal your breath.
          </p>
        </div>

        {/* hand-drawn map */}
        <div style={{
          background: "var(--bg)",
          border: "1px solid var(--rule)",
          padding: "40px 32px",
          position: "relative",
        }}>
          <svg viewBox="0 0 600 280" style={{ width: "100%", height: "auto", display: "block" }}>
            {/* lake */}
            <path d="M50,140 Q120,90 200,110 Q280,130 360,100 Q440,75 540,120 Q560,180 480,200 Q400,220 320,200 Q240,180 160,200 Q80,220 50,180 Z"
                  fill="var(--bg-deep)" stroke="var(--accent)" strokeWidth="0.8" opacity="0.7" />
            {/* ripples */}
            <path d="M120,150 Q160,145 200,150" fill="none" stroke="var(--accent)" strokeWidth="0.4" opacity="0.5" />
            <path d="M280,165 Q330,160 380,165" fill="none" stroke="var(--accent)" strokeWidth="0.4" opacity="0.5" />
            <path d="M180,175 Q220,170 260,175" fill="none" stroke="var(--accent)" strokeWidth="0.4" opacity="0.4" />
            <path d="M360,180 Q410,175 460,180" fill="none" stroke="var(--accent)" strokeWidth="0.4" opacity="0.4" />

            {/* roads */}
            <path d="M40,50 Q180,80 280,95 Q360,105 420,90" fill="none"
                  stroke="var(--ink)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
            <path d="M540,40 Q480,70 440,90" fill="none"
                  stroke="var(--ink)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />

            {/* trees */}
            {[80, 110, 470, 500, 530].map((x, i) => (
              <g key={i} transform={`translate(${x},${50 + (i % 2) * 15})`}>
                <path d="M0,0 l-5,12 l10,0 z" fill="var(--accent)" opacity="0.5" />
                <line x1="0" y1="12" x2="0" y2="18" stroke="var(--accent)" strokeWidth="0.5" />
              </g>
            ))}

            {/* venue marker */}
            <g transform="translate(300,110)">
              <circle r="18" fill="none" stroke="var(--ink)" strokeWidth="0.5" />
              <circle r="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="0.8" />
              <text textAnchor="middle" y="5" style={{
                font: "italic 14px 'Cormorant Garamond', serif", fill: "var(--ink)",
              }}>★</text>
              <text textAnchor="middle" y="-26" style={{
                font: "500 9px 'Cormorant Garamond', serif",
                letterSpacing: ".25em", textTransform: "uppercase", fill: "var(--ink)",
              }}>The Villa</text>
            </g>

            {/* compass */}
            <g transform="translate(540,240)">
              <circle r="16" fill="none" stroke="var(--ink)" strokeWidth="0.4" opacity="0.6" />
              <path d="M0,-12 L3,0 L0,12 L-3,0 Z" fill="var(--ink)" opacity="0.5" />
              <text y="-20" textAnchor="middle" style={{ font: "8px serif", fill: "var(--ink)" }}>N</text>
            </g>

            <text x="100" y="245" style={{
              font: "italic 12px 'Cormorant Garamond', serif", fill: "var(--muted)",
            }}>Lago di Como</text>
          </svg>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24, marginTop: 32, paddingTop: 32,
            borderTop: "1px solid var(--rule)",
          }} className="venue-grid">
            <div>
              <div className="label">Address</div>
              <div style={{ marginTop: 8, fontSize: 17 }}>
                {d.venue}<br/>{d.venueAddr}
              </div>
            </div>
            <div>
              <div className="label">Nearest Airport</div>
              <div style={{ marginTop: 8, fontSize: 17 }}>
                Milan Malpensa (MXP)<br/>
                <span style={{ color: "var(--muted)" }}>1h 15m by car</span>
              </div>
            </div>
            <div>
              <div className="label">Accommodation</div>
              <div style={{ marginTop: 8, fontSize: 17 }}>
                Block reserved at Hotel Belle Rive<br/>
                <span style={{ color: "var(--muted)" }}>code: AMELIA-JULIEN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:720px){.venue-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── DRESS CODE ──────────────────────────────────────────────────────────────
function DressCode() {
  const swatches = [
    { c: "#3d3a4f", name: "Midnight" },
    { c: "#5f6b5b", name: "Cypress" },
    { c: "#a88858", name: "Antique Gold" },
    { c: "#c9b5a4", name: "Champagne" },
    { c: "#e8d9c4", name: "Almond" },
    { c: "#7a4a4f", name: "Wine" },
  ];
  return (
    <section className="s">
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "6vw", alignItems: "center",
        }} className="dc-grid">
          <div>
            <div className="label">Attire</div>
            <h2 className="display" style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              fontStyle: "italic", margin: "16px 0 24px",
            }}>Garden formal.</h2>
            <p style={{ color: "var(--ink-soft)", fontStyle: "italic", fontSize: 18, marginTop: 0 }}>
              Long dresses, linen suits, and shoes you can dance in (the lawn is gentle).
              We invite you to lean into the palette below — but please come however
              you feel most beautiful.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16,
          }}>
            {swatches.map(s => (
              <div key={s.name}>
                <div style={{
                  aspectRatio: "3/4", background: s.c,
                  borderRadius: 2,
                  boxShadow: "0 8px 24px -10px rgba(0,0,0,.3)",
                }}></div>
                <div className="label" style={{
                  marginTop: 10, textAlign: "center", letterSpacing: ".2em",
                }}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:720px){.dc-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// ─── RSVP ────────────────────────────────────────────────────────────────────
function RSVP({ d }) {
  const [form, setForm] = useState({
    name: "", attending: "", guests: "1", meal: "", song: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const pick   = (k, v) => setForm({ ...form, [k]: v });

  if (submitted) {
    return (
      <section className="s" style={{ background: "var(--ink)", color: "var(--bg)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", padding: "60px 0" }}>
          <div className="script" style={{ fontSize: 32, color: "var(--accent-2)" }}>thank you</div>
          <h2 className="display" style={{
            fontSize: "clamp(48px, 7vw, 96px)", fontStyle: "italic",
            margin: "16px 0 24px", color: "var(--bg)",
          }}>
            {form.attending === "yes" ? "We can't wait." : "We'll miss you dearly."}
          </h2>
          <p style={{ color: "rgba(247,241,232,.7)", fontSize: 19, fontStyle: "italic" }}>
            {form.attending === "yes"
              ? `Your seat at ${d.venue} is reserved, ${form.name}. A confirmation will arrive in your inbox soon.`
              : `Thank you for letting us know, ${form.name}. We'll raise a glass to you.`}
          </p>
          <button onClick={() => { setSubmitted(false); setForm({ name:"", attending:"", guests:"1", meal:"", song:"" }); }}
                  style={{
                    marginTop: 32, background: "transparent",
                    border: "1px solid rgba(247,241,232,.4)",
                    color: "var(--bg)", padding: "14px 32px",
                    fontFamily: "var(--font-label)", fontSize: 11,
                    letterSpacing: ".3em", textTransform: "uppercase", cursor: "pointer",
                  }}>
            Edit response
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="s" style={{ background: "var(--ink)", color: "var(--bg)" }} id="rsvp">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="label" style={{ color: "var(--accent-2)" }}>Kindly Respond</div>
          <h2 className="display" style={{
            fontSize: "clamp(48px, 7vw, 96px)",
            fontStyle: "italic", margin: "16px 0 8px", color: "var(--bg)",
          }}>
            <span className="script" style={{
              fontStyle: "normal", color: "var(--accent-2)", fontSize: ".55em",
              display: "block", marginBottom: -6,
            }}>will you be there?</span>
            R.S.V.P.
          </h2>
          <p style={{ color: "rgba(247,241,232,.6)", marginTop: 16 }}>
            Please respond by the 30<sup>th</sup> of June, 2026.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Name */}
          <div>
            <label className="label" style={{ color: "rgba(247,241,232,.5)" }}>Your full name</label>
            <input required value={form.name} onChange={change("name")}
                   placeholder="As it appears on your invitation"
                   style={inputStyle} />
          </div>

          {/* Attending */}
          <div>
            <label className="label" style={{ color: "rgba(247,241,232,.5)" }}>Will you attend?</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
              {[
                { v: "yes", l: "Joyfully accepts" },
                { v: "no",  l: "Regretfully declines" },
              ].map(o => (
                <button key={o.v} type="button"
                        onClick={() => pick("attending", o.v)}
                        style={{
                          padding: "20px 16px", background: "transparent",
                          border: `1px solid ${form.attending === o.v ? "var(--accent-2)" : "rgba(247,241,232,.2)"}`,
                          color: form.attending === o.v ? "var(--accent-2)" : "var(--bg)",
                          cursor: "pointer", fontFamily: "var(--font-display)",
                          fontSize: 20, fontStyle: "italic",
                          transition: "all .2s",
                        }}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          {form.attending === "yes" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="rsvp-row">
                <div>
                  <label className="label" style={{ color: "rgba(247,241,232,.5)" }}>Number in your party</label>
                  <select value={form.guests} onChange={change("guests")} style={inputStyle}>
                    <option value="1">1 — Just me</option>
                    <option value="2">2 — Me + plus one</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div>
                  <label className="label" style={{ color: "rgba(247,241,232,.5)" }}>Menu</label>
                  <select value={form.meal} onChange={change("meal")} style={inputStyle}>
                    <option value="">Select…</option>
                    <option>Fish</option>
                    <option>Lamb</option>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label" style={{ color: "rgba(247,241,232,.5)" }}>
                  A song to get you on the dance floor
                </label>
                <input value={form.song} onChange={change("song")}
                       placeholder="Artist — Title (optional)"
                       style={inputStyle} />
              </div>
            </>
          )}

          <button type="submit"
                  disabled={!form.name || !form.attending}
                  style={{
                    marginTop: 16, padding: "18px",
                    background: "var(--accent)",
                    color: "var(--bg)", border: 0, cursor: "pointer",
                    fontFamily: "var(--font-label)", fontSize: 12,
                    letterSpacing: ".4em", textTransform: "uppercase",
                    opacity: (!form.name || !form.attending) ? .4 : 1,
                    transition: "opacity .2s",
                  }}>
            Send Response
          </button>
        </form>
      </div>
      <style>{`@media(max-width:600px){.rsvp-row{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  background: "transparent",
  border: 0,
  borderBottom: "1px solid rgba(247,241,232,.25)",
  padding: "14px 0",
  color: "var(--bg)",
  fontFamily: "var(--font-display)",
  fontSize: 20,
  fontStyle: "italic",
  outline: "none",
  marginTop: 8,
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: "Can I bring a plus one?",
      a: "Your invitation will indicate who has been reserved a seat. If you have any questions, please don't hesitate to reach out to us directly." },
    { q: "Are children welcome?",
      a: "We adore your little ones — and we've planned a child-friendly room with caretakers for the evening so you can dance freely. Please indicate ages on your RSVP." },
    { q: "What's the weather like in September?",
      a: "Late summer at the lake is glorious — daytime highs around 24°C / 75°F, cool by the water at night. A light shawl or jacket for the evening is a lovely idea." },
    { q: "Where should I stay?",
      a: "We've blocked rooms at Hotel Belle Rive for our guests at a preferred rate. There are also charming Airbnbs in Cernobbio and Como if you'd prefer." },
    { q: "Is there parking at the venue?",
      a: "Yes — and we'll also run a shuttle between Hotel Belle Rive and Villa Astoria from 3 PM until 1 AM, so no need to worry about driving." },
    { q: "Gift registry?",
      a: "Your presence is the only present we ask for. If you wish to give anything, we are saving for our honeymoon — a small fund is linked in your invitation card." },
  ];
  return (
    <section className="s" style={{ background: "var(--bg-deep)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="label">In case you were wondering</div>
          <h2 className="display" style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontStyle: "italic", margin: "16px 0 0",
          }}>The fine print.</h2>
        </div>

        <div>
          {items.map((it, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--rule)" }}>
              <button onClick={() => setOpen(open === i ? -1 : i)}
                      style={{
                        width: "100%", background: "transparent", border: 0,
                        padding: "28px 0", cursor: "pointer", textAlign: "left",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        gap: 24, color: "var(--ink)",
                      }}>
                <span className="display" style={{ fontSize: "clamp(20px, 2.4vw, 26px)", fontStyle: "italic" }}>
                  {it.q}
                </span>
                <span style={{
                  fontFamily: "var(--font-label)", fontSize: 11, letterSpacing: ".3em",
                  textTransform: "uppercase", color: "var(--muted)",
                  transition: "transform .3s", flexShrink: 0,
                  transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  fontSize: 20,
                }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? 200 : 0,
                overflow: "hidden", transition: "max-height .4s ease, padding .4s",
                paddingBottom: open === i ? 28 : 0,
              }}>
                <p style={{
                  margin: 0, color: "var(--ink-soft)", fontStyle: "italic",
                  maxWidth: 620, fontSize: 17,
                }}>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BOTTOM SIGN-OFF ─────────────────────────────────────────────────────────
function SignOff({ d }) {
  return (
    <section className="s" style={{ textAlign: "center", padding: "120px 8vw 80px" }}>
      <Monogram a={d.bride[0]} b={d.groom[0]} size={120} />
      <div className="script" style={{
        fontSize: "clamp(36px, 5vw, 56px)", color: "var(--accent)", margin: "32px 0 16px",
      }}>
        See you on the lake.
      </div>
      <div className="label">{d.hashtag}</div>

      <div style={{
        marginTop: 80, paddingTop: 32, borderTop: "1px solid var(--rule)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        maxWidth: 800, margin: "80px auto 0",
      }}>
        <div className="label">An invitation from</div>
        <div className="display" style={{ fontStyle: "italic", fontSize: 22 }}>
          {d.bride} &amp; {d.groom}
        </div>
        <div className="label">{d.dateShort}</div>
      </div>
    </section>
  );
}

// ─── EXPORT ──────────────────────────────────────────────────────────────────
Object.assign(window, {
  Hero, Countdown, Story, Schedule, Venue, DressCode, RSVP, FAQ, SignOff,
  Monogram, DEFAULT_DETAILS,
});
