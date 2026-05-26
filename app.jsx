// app.jsx — Wedding invitation: top-level App + Tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bride": "Amelia",
  "groom": "Julien",
  "dateShort": "12 . 09 . 2026",
  "palette": "champagne",
  "typography": "classic",
  "heroVariant": "centered",
  "showCountdown": true
}/*EDITMODE-END*/;

const PALETTES = {
  champagne: {
    name: "Champagne",
    swatch: ["#f7f1e8", "#a88858", "#2e1a24"],
    vars: {
      "--bg": "#f7f1e8",
      "--bg-deep": "#efe6d6",
      "--ink": "#2e1a24",
      "--ink-soft": "#4a2f3a",
      "--muted": "#8a7367",
      "--accent": "#a88858",
      "--accent-2": "#c9a87a",
      "--rule": "rgba(46, 26, 36, 0.18)",
      "--rule-soft": "rgba(46, 26, 36, 0.08)",
    }
  },
  blush: {
    name: "Blush",
    swatch: ["#faf3ee", "#c98a8a", "#5a3a3a"],
    vars: {
      "--bg": "#faf3ee",
      "--bg-deep": "#f1e3dc",
      "--ink": "#3a1f24",
      "--ink-soft": "#5a3a3a",
      "--muted": "#a08585",
      "--accent": "#c98a8a",
      "--accent-2": "#e0a8a8",
      "--rule": "rgba(58, 31, 36, 0.18)",
      "--rule-soft": "rgba(58, 31, 36, 0.08)",
    }
  },
  sage: {
    name: "Sage",
    swatch: ["#f4f1ea", "#6b7a5a", "#2f3a2a"],
    vars: {
      "--bg": "#f4f1ea",
      "--bg-deep": "#e6e1d2",
      "--ink": "#2f3a2a",
      "--ink-soft": "#4a5742",
      "--muted": "#8a9080",
      "--accent": "#6b7a5a",
      "--accent-2": "#a3ad8e",
      "--rule": "rgba(47, 58, 42, 0.18)",
      "--rule-soft": "rgba(47, 58, 42, 0.08)",
    }
  },
  noir: {
    name: "Noir",
    swatch: ["#1a1a1a", "#d4af7a", "#f5ebe0"],
    vars: {
      "--bg": "#161412",
      "--bg-deep": "#1f1c19",
      "--ink": "#f5ebe0",
      "--ink-soft": "#d8cfc1",
      "--muted": "#9c9387",
      "--accent": "#d4af7a",
      "--accent-2": "#e8c89a",
      "--rule": "rgba(245, 235, 224, 0.18)",
      "--rule-soft": "rgba(245, 235, 224, 0.08)",
    }
  },
};

const TYPOGRAPHY = {
  classic: {
    name: "Classic Romantic",
    vars: {
      "--font-display": "'Cormorant Garamond', serif",
      "--font-script":  "'Italiana', serif",
      "--font-body":    "'Cormorant Garamond', serif",
      "--font-label":   "'Cormorant Garamond', serif",
    }
  },
  modern: {
    name: "Modern Editorial",
    vars: {
      "--font-display": "'Fraunces', serif",
      "--font-script":  "'Italiana', serif",
      "--font-body":    "'Fraunces', serif",
      "--font-label":   "'Outfit', sans-serif",
    }
  },
  timeless: {
    name: "Timeless Serif",
    vars: {
      "--font-display": "'Playfair Display', serif",
      "--font-script":  "'Dancing Script', cursive",
      "--font-body":    "'Cardo', serif",
      "--font-label":   "'Cardo', serif",
    }
  },
};

function applyVars(obj) {
  const root = document.documentElement;
  for (const k in obj) root.style.setProperty(k, obj[k]);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply CSS vars whenever palette / typography changes
  React.useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.champagne;
    const f = TYPOGRAPHY[t.typography] || TYPOGRAPHY.classic;
    applyVars({ ...p.vars, ...f.vars });
  }, [t.palette, t.typography]);

  // Merge tweaked details with defaults
  const d = {
    ...DEFAULT_DETAILS,
    bride: t.bride || DEFAULT_DETAILS.bride,
    groom: t.groom || DEFAULT_DETAILS.groom,
    dateShort: t.dateShort || DEFAULT_DETAILS.dateShort,
  };

  return (
    <React.Fragment>
      <Hero d={d} variant={t.heroVariant} />
      {t.showCountdown && <Countdown d={d} />}
      <Story d={d} />
      <Schedule d={d} />
      <Venue d={d} />
      <DressCode />
      <RSVP d={d} />
      <FAQ />
      <SignOff d={d} />

      <TweaksPanel>
        <TweakSection label="The Couple" />
        <TweakText label="Bride" value={t.bride}
                   onChange={(v) => setTweak('bride', v)} />
        <TweakText label="Groom" value={t.groom}
                   onChange={(v) => setTweak('groom', v)} />
        <TweakText label="Date" value={t.dateShort}
                   onChange={(v) => setTweak('dateShort', v)} />

        <TweakSection label="Aesthetic" />
        <TweakSelect label="Palette" value={t.palette}
                     options={Object.keys(PALETTES).map(k => ({ value: k, label: PALETTES[k].name }))}
                     onChange={(v) => setTweak('palette', v)} />
        <TweakSelect label="Typography" value={t.typography}
                     options={Object.keys(TYPOGRAPHY).map(k => ({ value: k, label: TYPOGRAPHY[k].name }))}
                     onChange={(v) => setTweak('typography', v)} />

        <TweakSection label="Hero Layout" />
        <TweakSelect label="Variant" value={t.heroVariant}
                     options={[
                       { value: "centered",  label: "Centered Cover" },
                       { value: "editorial", label: "Editorial Stacked" },
                       { value: "portrait",  label: "With Portrait Plate" },
                     ]}
                     onChange={(v) => setTweak('heroVariant', v)} />

        <TweakSection label="Sections" />
        <TweakToggle label="Show countdown" value={t.showCountdown}
                     onChange={(v) => setTweak('showCountdown', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
