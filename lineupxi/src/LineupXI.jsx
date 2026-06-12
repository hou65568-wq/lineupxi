import { useState } from "react";

const LEAGUES = {
  pl: { name: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", since: 1992 },
  ll: { name: "La Liga", country: "Spain", flag: "🇪🇸", since: 1929 },
  bl: { name: "Bundesliga", country: "Germany", flag: "🇩🇪", since: 1963 },
  sa: { name: "Serie A", country: "Italy", flag: "🇮🇹", since: 1929 },
  l1: { name: "Ligue 1", country: "France", flag: "🇫🇷", since: 1932 },
};

const TEAMS = {
  pl: ["Manchester City","Arsenal","Liverpool","Chelsea","Manchester Utd","Tottenham","Newcastle","Aston Villa"],
  ll: ["Real Madrid","Barcelona","Atlético Madrid","Sevilla","Real Sociedad","Athletic Club","Valencia","Villarreal"],
  bl: ["Bayern Munich","Borussia Dortmund","RB Leipzig","Bayer Leverkusen","Gladbach","Wolfsburg","Eintracht Frankfurt","Stuttgart"],
  sa: ["Juventus","Inter Milan","AC Milan","Napoli","Roma","Lazio","Fiorentina","Atalanta"],
  l1: ["PSG","Marseille","Lyon","Monaco","Lille","Nice","Rennes","Lens"],
};

const LINEUPS = {
  pl: {
    "Manchester City": {
      gk: { name: "Ederson", num: 31 },
      def: [{ name: "Walker", num: 2 },{ name: "Rúben Dias", num: 3 },{ name: "Akanji", num: 25 },{ name: "Gvardiol", num: 24 }],
      mid: [{ name: "Rodri", num: 16 },{ name: "De Bruyne", num: 17 },{ name: "Bernardo", num: 20 }],
      fwd: [{ name: "Savinho", num: 26 },{ name: "Haaland", num: 9 },{ name: "Doku", num: 11 }],
      bench: [{ name: "Ortega", num: 18, pos: "GK" },{ name: "Stones", num: 5, pos: "CB" },{ name: "Kovačić", num: 8, pos: "CM" },{ name: "Grealish", num: 10, pos: "LW" },{ name: "Foden", num: 47, pos: "AM" }],
    },
    "Arsenal": {
      gk: { name: "Raya", num: 22 },
      def: [{ name: "Ben White", num: 4 },{ name: "Saliba", num: 12 },{ name: "Gabriel", num: 6 },{ name: "Calafiori", num: 33 }],
      mid: [{ name: "Odegaard", num: 8 },{ name: "Rice", num: 41 },{ name: "Havertz", num: 29 }],
      fwd: [{ name: "Saka", num: 7 },{ name: "Jesus", num: 9 },{ name: "Martinelli", num: 11 }],
      bench: [{ name: "Ramsdale", num: 1, pos: "GK" },{ name: "Kiwior", num: 15, pos: "LB" },{ name: "Trossard", num: 19, pos: "LW" },{ name: "Vieira", num: 21, pos: "CM" },{ name: "Nketiah", num: 14, pos: "ST" }],
    },
    "Liverpool": {
      gk: { name: "Alisson", num: 1 },
      def: [{ name: "Alexander-Arnold", num: 66 },{ name: "Konaté", num: 5 },{ name: "Van Dijk", num: 4 },{ name: "Robertson", num: 26 }],
      mid: [{ name: "Szoboszlai", num: 8 },{ name: "Mac Allister", num: 10 },{ name: "Gravenberch", num: 38 }],
      fwd: [{ name: "Salah", num: 11 },{ name: "Núñez", num: 9 },{ name: "Díaz", num: 7 }],
      bench: [{ name: "Kelleher", num: 62, pos: "GK" },{ name: "Quansah", num: 78, pos: "CB" },{ name: "Jones", num: 17, pos: "CM" },{ name: "Elliott", num: 19, pos: "RW" },{ name: "Jota", num: 20, pos: "ST" }],
    },
    "Chelsea": {
      gk: { name: "Sánchez", num: 1 },
      def: [{ name: "Reece James", num: 24 },{ name: "Fofana", num: 33 },{ name: "Colwill", num: 26 },{ name: "Cucurella", num: 32 }],
      mid: [{ name: "Caicedo", num: 25 },{ name: "Enzo", num: 5 },{ name: "Palmer", num: 20 }],
      fwd: [{ name: "Madueke", num: 7 },{ name: "Jackson", num: 15 },{ name: "Mudryk", num: 10 }],
      bench: [{ name: "Petrovic", num: 13, pos: "GK" },{ name: "Disasi", num: 2, pos: "CB" },{ name: "Gallagher", num: 23, pos: "CM" },{ name: "Sterling", num: 17, pos: "LW" },{ name: "Gusto", num: 27, pos: "RB" }],
    },
    "Manchester Utd": {
      gk: { name: "Onana", num: 24 },
      def: [{ name: "Dalot", num: 20 },{ name: "Lindelöf", num: 2 },{ name: "Martinez", num: 23 },{ name: "Shaw", num: 23 }],
      mid: [{ name: "Casemiro", num: 18 },{ name: "Mainoo", num: 37 },{ name: "Fernandes", num: 8 }],
      fwd: [{ name: "Rashford", num: 10 },{ name: "Højlund", num: 11 },{ name: "Antony", num: 21 }],
      bench: [{ name: "Bayindir", num: 1, pos: "GK" },{ name: "Maguire", num: 5, pos: "CB" },{ name: "Mount", num: 7, pos: "AM" },{ name: "Pellistri", num: 28, pos: "RW" },{ name: "Wan-Bissaka", num: 29, pos: "RB" }],
    },
    "Tottenham": {
      gk: { name: "Vicario", num: 1 },
      def: [{ name: "Porro", num: 23 },{ name: "Romero", num: 17 },{ name: "Van de Ven", num: 37 },{ name: "Udogie", num: 38 }],
      mid: [{ name: "Sarr", num: 29 },{ name: "Bissouma", num: 8 },{ name: "Maddison", num: 10 }],
      fwd: [{ name: "Kulusevski", num: 21 },{ name: "Son", num: 7 },{ name: "Werner", num: 9 }],
      bench: [{ name: "Forster", num: 20, pos: "GK" },{ name: "Davies", num: 33, pos: "LB" },{ name: "Emerson", num: 12, pos: "RB" },{ name: "Hojbjerg", num: 5, pos: "CM" },{ name: "Johnson", num: 22, pos: "RW" }],
    },
    "Newcastle": {
      gk: { name: "Pope", num: 22 },
      def: [{ name: "Trippier", num: 2 },{ name: "Botman", num: 4 },{ name: "Schär", num: 5 },{ name: "Hall", num: 33 }],
      mid: [{ name: "Tonali", num: 8 },{ name: "Guimarães", num: 39 },{ name: "Longstaff", num: 36 }],
      fwd: [{ name: "Murphy", num: 23 },{ name: "Isak", num: 14 },{ name: "Gordon", num: 10 }],
      bench: [{ name: "Dubravka", num: 1, pos: "GK" },{ name: "Lascelles", num: 6, pos: "CB" },{ name: "Almiron", num: 24, pos: "RW" },{ name: "Barnes", num: 15, pos: "LW" },{ name: "Krafth", num: 17, pos: "RB" }],
    },
    "Aston Villa": {
      gk: { name: "Martinez", num: 1 },
      def: [{ name: "Cash", num: 2 },{ name: "Konsa", num: 4 },{ name: "Torres", num: 23 },{ name: "Digne", num: 12 }],
      mid: [{ name: "Douglas Luiz", num: 6 },{ name: "McGinn", num: 7 },{ name: "Tielemans", num: 8 }],
      fwd: [{ name: "Bailey", num: 31 },{ name: "Watkins", num: 11 },{ name: "Diaby", num: 19 }],
      bench: [{ name: "Olsen", num: 30, pos: "GK" },{ name: "Mings", num: 5, pos: "CB" },{ name: "Ramsey", num: 41, pos: "CM" },{ name: "Buendía", num: 10, pos: "RW" },{ name: "Moreno", num: 15, pos: "LB" }],
    },
  },
};

const FORMATIONS = {
  "4-3-3": [
    { x: 50, y: 90, r: "gk" },
    { x: 16, y: 72, r: "def" },{ x: 36, y: 75, r: "def" },{ x: 64, y: 75, r: "def" },{ x: 84, y: 72, r: "def" },
    { x: 24, y: 50, r: "mid" },{ x: 50, y: 47, r: "mid" },{ x: 76, y: 50, r: "mid" },
    { x: 16, y: 24, r: "fwd" },{ x: 50, y: 18, r: "fwd" },{ x: 84, y: 24, r: "fwd" },
  ],
  "4-4-2": [
    { x: 50, y: 90, r: "gk" },
    { x: 14, y: 73, r: "def" },{ x: 36, y: 76, r: "def" },{ x: 64, y: 76, r: "def" },{ x: 86, y: 73, r: "def" },
    { x: 14, y: 51, r: "mid" },{ x: 38, y: 53, r: "mid" },{ x: 62, y: 53, r: "mid" },{ x: 86, y: 51, r: "mid" },
    { x: 34, y: 22, r: "fwd" },{ x: 66, y: 22, r: "fwd" },
  ],
  "4-2-3-1": [
    { x: 50, y: 90, r: "gk" },
    { x: 14, y: 73, r: "def" },{ x: 36, y: 76, r: "def" },{ x: 64, y: 76, r: "def" },{ x: 86, y: 73, r: "def" },
    { x: 34, y: 57, r: "mid" },{ x: 66, y: 57, r: "mid" },
    { x: 14, y: 36, r: "mid" },{ x: 50, y: 33, r: "mid" },{ x: 86, y: 36, r: "mid" },
    { x: 50, y: 15, r: "fwd" },
  ],
  "3-5-2": [
    { x: 50, y: 90, r: "gk" },
    { x: 24, y: 74, r: "def" },{ x: 50, y: 77, r: "def" },{ x: 76, y: 74, r: "def" },
    { x: 10, y: 53, r: "mid" },{ x: 30, y: 50, r: "mid" },{ x: 50, y: 48, r: "mid" },{ x: 70, y: 50, r: "mid" },{ x: 90, y: 53, r: "mid" },
    { x: 34, y: 21, r: "fwd" },{ x: 66, y: 21, r: "fwd" },
  ],
  "5-3-2": [
    { x: 50, y: 90, r: "gk" },
    { x: 10, y: 73, r: "def" },{ x: 28, y: 76, r: "def" },{ x: 50, y: 78, r: "def" },{ x: 72, y: 76, r: "def" },{ x: 90, y: 73, r: "def" },
    { x: 24, y: 51, r: "mid" },{ x: 50, y: 49, r: "mid" },{ x: 76, y: 51, r: "mid" },
    { x: 34, y: 21, r: "fwd" },{ x: 66, y: 21, r: "fwd" },
  ],
};

const posColor = { gk: "#b45309", def: "#1d4ed8", mid: "#065f46", fwd: "#991b1b" };
const posBorder = { gk: "#f59e0b", def: "#60a5fa", mid: "#34d399", fwd: "#f87171" };

function getSeasons(since) {
  const arr = [];
  for (let y = since; y <= 2024; y++) arr.push(`${y}/${String(y + 1).slice(-2)}`);
  return arr;
}

function getLineup(league, team) {
  return LINEUPS[league]?.[team] || {
    gk: { name: "Goalkeeper", num: 1 },
    def: [{ name: "Defender", num: 2 },{ name: "Defender", num: 5 },{ name: "Defender", num: 6 },{ name: "Defender", num: 3 }],
    mid: [{ name: "Midfielder", num: 8 },{ name: "Midfielder", num: 10 },{ name: "Midfielder", num: 7 }],
    fwd: [{ name: "Forward", num: 11 },{ name: "Striker", num: 9 },{ name: "Forward", num: 7 }],
    bench: [{ name: "Sub", num: 13, pos: "GK" },{ name: "Sub", num: 16, pos: "CB" },{ name: "Sub", num: 14, pos: "CM" },{ name: "Sub", num: 18, pos: "ST" }],
  };
}

export default function LineupXI() {
  const [league, setLeague] = useState("pl");
  const [team, setTeam] = useState("Manchester City");
  const [formation, setFormation] = useState("4-3-3");
  const [season, setSeason] = useState("2024/25");
  const [tooltip, setTooltip] = useState(null);

  const seasons = getSeasons(LEAGUES[league].since);
  const lineup = getLineup(league, team);
  const positions = FORMATIONS[formation];
  const allPlayers = [
    { p: lineup.gk, r: "gk" },
    ...lineup.def.map((p) => ({ p, r: "def" })),
    ...lineup.mid.map((p) => ({ p, r: "mid" })),
    ...lineup.fwd.map((p) => ({ p, r: "fwd" })),
  ];

  function handleLeagueChange(id) {
    setLeague(id);
    setTeam(TEAMS[id][0]);
    const s = getSeasons(LEAGUES[id].since);
    setSeason(s[s.length - 1]);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#e6edf3", fontFamily: "Inter, sans-serif", fontSize: 14 }}>

      {/* top bar */}
      <div style={{ background: "#161b22", borderBottom: "1px solid #30363d", padding: "0 24px", display: "flex", alignItems: "center", height: 52, gap: 16 }}>
        <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "#1a6b3c", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚽</div>
          LineupXI
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, color: "#8b949e" }}>Historical Starting XIs · Top 5 Leagues</div>
      </div>

      {/* ad banner */}
      <div style={{ background: "#1c2128", borderBottom: "1px solid #30363d", padding: "7px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <span style={{ fontSize: 9, color: "#6e7681", border: "1px solid #30363d", padding: "2px 6px", borderRadius: 3, letterSpacing: "0.08em" }}>AD</span>
        <span style={{ fontSize: 13, color: "#8b949e" }}>Your ad could be here — <span style={{ color: "#58a6ff" }}>contact us to advertise</span></span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "210px 1fr 190px", minHeight: "calc(100vh - 88px)" }}>

        {/* sidebar */}
        <div style={{ background: "#161b22", borderRight: "1px solid #30363d", padding: "16px 0", overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#6e7681", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 16px 8px" }}>Leagues</div>
          {Object.entries(LEAGUES).map(([id, lg]) => (
            <button key={id} onClick={() => handleLeagueChange(id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", width: "100%", border: "none", background: league === id ? "rgba(88,166,255,0.1)" : "transparent", borderLeft: league === id ? "2px solid #58a6ff" : "2px solid transparent", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 18 }}>{lg.flag}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: league === id ? "#e6edf3" : "#8b949e" }}>{lg.name}</div>
                <div style={{ fontSize: 11, color: "#6e7681" }}>{lg.country} · since {lg.since}</div>
              </div>
            </button>
          ))}

          <div style={{ fontSize: 10, fontWeight: 600, color: "#6e7681", letterSpacing: "0.1em", textTransform: "uppercase", padding: "16px 16px 8px" }}>Teams</div>
          {TEAMS[league].map((t) => (
            <button key={t} onClick={() => setTeam(t)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 16px", width: "100%", border: "none", background: team === t ? "#21262d" : "transparent", borderLeft: team === t ? "2px solid #1a6b3c" : "2px solid transparent", cursor: "pointer" }}>
              <div style={{ width: 24, height: 24, borderRadius: 4, background: "#21262d", border: "1px solid #30363d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, color: "#8b949e", flexShrink: 0 }}>{t.slice(0, 3).toUpperCase()}</div>
              <span style={{ fontSize: 13, color: team === t ? "#e6edf3" : "#8b949e", fontWeight: team === t ? 500 : 400 }}>{t}</span>
            </button>
          ))}
        </div>

        {/* main content */}
        <div style={{ padding: 20, overflowY: "auto" }}>

          {/* team + season bar */}
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 8, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#21262d", border: "1px solid #30363d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#8b949e", flexShrink: 0 }}>{team.slice(0, 3).toUpperCase()}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{team}</div>
              <div style={{ fontSize: 12, color: "#8b949e" }}>{LEAGUES[league].name}</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#6e7681" }}>Season</span>
              <div style={{ display: "flex", gap: 5, maxWidth: 340, overflowX: "auto", padding: "2px 0" }}>
                {seasons.map((s) => (
                  <button key={s} onClick={() => setSeason(s)}
                    style={{ padding: "4px 10px", borderRadius: 99, fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid", borderColor: season === s ? "#1a6b3c" : "#30363d", background: season === s ? "#1a6b3c" : "#21262d", color: season === s ? "#fff" : "#8b949e", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* formation bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: "#6e7681", marginRight: 4 }}>Formation</span>
            {Object.keys(FORMATIONS).map((f) => (
              <button key={f} onClick={() => setFormation(f)}
                style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid", borderColor: formation === f ? "#58a6ff" : "#30363d", background: "#21262d", color: formation === f ? "#58a6ff" : "#8b949e" }}>
                {f}
              </button>
            ))}
          </div>

          {/* pitch */}
          <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
            <div style={{ position: "relative", width: "100%", paddingTop: "145%", background: "#1e7a45", overflow: "hidden" }}>

              {/* pitch markings */}
              <div style={{ position: "absolute", inset: 0 }}>
                {[0,10,20,30,40,60,70,80,90].map(t => (
                  <div key={t} style={{ position: "absolute", width: "100%", height: "10%", top: `${t}%`, background: t % 20 === 0 ? "#1a6b3c" : "#1e7a45", opacity: 0.6 }} />
                ))}
                <div style={{ position: "absolute", width: "100%", height: 2, background: "rgba(255,255,255,0.2)", top: "50%" }} />
                <div style={{ position: "absolute", width: "21%", paddingTop: "21%", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.2)", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
                <div style={{ position: "absolute", width: "3%", paddingTop: "3%", borderRadius: "50%", background: "rgba(255,255,255,0.2)", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
                <div style={{ position: "absolute", width: "52%", height: "16%", border: "1.5px solid rgba(255,255,255,0.2)", left: "50%", transform: "translateX(-50%)", top: 0, borderTop: "none" }} />
                <div style={{ position: "absolute", width: "52%", height: "16%", border: "1.5px solid rgba(255,255,255,0.2)", left: "50%", transform: "translateX(-50%)", bottom: 0, borderBottom: "none" }} />
                <div style={{ position: "absolute", width: "26%", height: "6.5%", border: "1.5px solid rgba(255,255,255,0.2)", left: "50%", transform: "translateX(-50%)", top: 0, borderTop: "none" }} />
                <div style={{ position: "absolute", width: "26%", height: "6.5%", border: "1.5px solid rgba(255,255,255,0.2)", left: "50%", transform: "translateX(-50%)", bottom: 0, borderBottom: "none" }} />
              </div>

              {/* players */}
              {positions.map((pos, i) => {
                const entry = allPlayers[i];
                if (!entry) return null;
                const { p, r } = entry;
                const initials = p.name.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase();
                return (
                  <div key={i} style={{ position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)", textAlign: "center", width: 56, cursor: "pointer", zIndex: 10 }}
                    onMouseEnter={() => setTooltip({ name: p.name, num: p.num, r, x: pos.x, y: pos.y })}
                    onMouseLeave={() => setTooltip(null)}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", margin: "0 auto 3px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: "#fff", background: posColor[r], border: `2px solid ${posBorder[r]}`, position: "relative" }}>
                      <span style={{ position: "absolute", top: -3, right: -3, width: 15, height: 15, borderRadius: "50%", background: "#0d1117", color: "#8b949e", fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #30363d" }}>{p.num}</span>
                      {initials}
                    </div>
                    <div style={{ fontSize: 9, color: "#fff", fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.9)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 56 }}>
                      {p.name.split(" ").slice(-1)[0]}
                    </div>
                  </div>
                );
              })}

              {/* tooltip */}
              {tooltip && (
                <div style={{ position: "absolute", left: `${tooltip.x > 70 ? tooltip.x - 20 : tooltip.x + 4}%`, top: `${Math.max(tooltip.y - 12, 2)}%`, background: "#0d1117", border: "1px solid #30363d", borderRadius: 8, padding: "7px 12px", fontSize: 12, zIndex: 99, whiteSpace: "nowrap", pointerEvents: "none" }}>
                  <div style={{ fontWeight: 600, color: "#fff", fontSize: 13 }}>#{tooltip.num} {tooltip.name}</div>
                  <div style={{ fontSize: 11, color: posBorder[tooltip.r], marginTop: 2 }}>{tooltip.r.toUpperCase()}</div>
                </div>
              )}
            </div>

            {/* bench */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "10px 12px", borderTop: "1px solid #30363d" }}>
              {(lineup.bench || []).map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, background: "#21262d", border: "1px solid #30363d", borderRadius: 6, padding: "5px 9px", fontSize: 11, color: "#e6edf3" }}>
                  <span style={{ color: "#6e7681", fontSize: 10 }}>{b.num}</span>
                  {b.name}
                  <span style={{ fontSize: 10, padding: "1px 5px", borderRadius: 3, fontWeight: 600, background: "#161b22", color: "#8b949e" }}>{b.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right ad column */}
        <div style={{ background: "#161b22", borderLeft: "1px solid #30363d", padding: 14 }}>
          <div style={{ background: "#1c2128", border: "1px solid #30363d", borderRadius: 8, padding: 12, marginBottom: 14, textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#6e7681", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Advertisement</div>
            <div style={{ height: 120, background: "#21262d", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#6e7681", fontSize: 11 }}>300 × 120</div>
          </div>
          <div style={{ background: "#1c2128", border: "1px solid #30363d", borderRadius: 8, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#6e7681", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Advertisement</div>
            <div style={{ height: 250, background: "#21262d", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#6e7681", fontSize: 11 }}>300 × 250</div>
          </div>
        </div>

      </div>
    </div>
  );
}