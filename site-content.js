/* ============================================================================
   EXECUTIVE TILING — SITE CONTENT
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit for day-to-day content changes.
   Everything below is plain text inside quotes. Edit between the quotes,
   keep the commas, and save. No coding knowledge required.

   QUICK MAP:
     1. BUSINESS   – phone, email, name, areas (shows site-wide)
     2. SERVICES   – the service cards
     3. GALLERY    – project tiles + their category (for the filter)
     4. TESTIMONIALS – reviews

   ⚠ TESTIMONIALS BELOW ARE PLACEHOLDERS. They are invented examples.
     Replace them with REAL client reviews before the site goes live —
     publishing fabricated reviews is misleading conduct under the NZ
     Fair Trading Act. Keep the format, swap the words.
   ============================================================================ */

const SITE = {

  /* ── 1. BUSINESS DETAILS ────────────────────────────────────────────────
     These appear in the header, footer, contact page and call buttons.
     Update the phone/email here and it changes everywhere automatically. */
  business: {
    name: "Executive Tiling",
    tagline: "Precision. Quality. Executive Finish.",
    phoneDisplay: "021 000 0000",        // shown on screen — replace
    phoneDial: "+6421000000",            // used by Call buttons (no spaces)
    email: "hello@executivetiling.co.nz", // replace
    areasShort: "Christchurch & Canterbury",
    hours: "Mon–Fri 7:00am – 5:00pm",
    addressLine: "Serving all of Christchurch & Canterbury",
  },

  /* ── 2. SERVICES ────────────────────────────────────────────────────────
     Each block is one card: a short title and a one-line description.
     Add or remove blocks freely (keep the { } and the comma). */
  services: {
    residential: [
      { title: "Residential Tiling", desc: "Full-home tiling delivered to an exacting, architectural standard." },
      { title: "Bathroom Renovations", desc: "Complete bathroom transformations, from substrate to final grout line." },
      { title: "Kitchen Splashbacks", desc: "Precise splashback installation that becomes the room's centrepiece." },
      { title: "Floor Tiling", desc: "Perfectly levelled, lippage-free floors built to last decades." },
      { title: "Wall Tiling", desc: "Clean, consistent wall finishes with disciplined alignment." },
      { title: "Outdoor Tiling", desc: "Weather-resilient patios, entries and outdoor living areas." },
      { title: "Tile Repair", desc: "Discreet repairs and replacements matched to the original finish." },
    ],
    commercial: [
      { title: "Commercial Tiling", desc: "Scheduled, coordinated installs for commercial fit-outs and developments." },
      { title: "Townhouse Developments", desc: "Repeatable, high-volume finishes held to the same standard on every unit." },
    ],
    specialty: [
      { title: "Waterproofing", desc: "Certified wet-area waterproofing — the foundation of every lasting finish." },
    ],
  },

  /* ── 3. GALLERY / PROJECTS ──────────────────────────────────────────────
     'category' powers the filter buttons. Use one of:
       residential | commercial | bathrooms | kitchens | outdoor | waterproofing
     'image' is optional — leave "" to show the premium placeholder, or point
     it at a file you've added to /images/gallery/ e.g. "images/gallery/job1.jpg" */
  gallery: [
    { title: "Ensuite — Fendalton",        category: "bathrooms",     image: "" },
    { title: "Townhouse Block — Riccarton", category: "commercial",    image: "" },
    { title: "Kitchen Splashback — Merivale", category: "kitchens",   image: "" },
    { title: "Wet-Area System — Ilam",      category: "waterproofing", image: "" },
    { title: "Outdoor Living — Cashmere",   category: "outdoor",       image: "" },
    { title: "Main Bathroom — St Albans",   category: "bathrooms",     image: "" },
    { title: "Residential Floor — Halswell", category: "residential",  image: "" },
    { title: "Development Common Areas — Addington", category: "commercial", image: "" },
    { title: "Heated Floor — Sumner",       category: "residential",   image: "" },
  ],

  /* ── 4. TESTIMONIALS ────────────────────────────────────────────────────
     ⚠ PLACEHOLDERS — replace with real, attributable reviews before launch. */
  testimonials: [
    { quote: "Executive Tiling consistently delivered high-quality finishes across our townhouse development. Communication was excellent, timelines were met, and the workmanship was to a very high standard. We'll definitely be using them again.", author: "Townhouse Developer", location: "Christchurch", type: "Developer" },
    { quote: "Professional, reliable, and detail-oriented. Executive Tiling completed multiple bathrooms and common areas for our development and the finish quality was exceptional throughout.", author: "Project Manager", location: "Canterbury", type: "Developer" },
    { quote: "It's hard finding trades that genuinely care about quality and deadlines. Executive Tiling delivered both. Clean workmanship, excellent coordination on site, and a premium finish.", author: "Residential Builder", location: "Christchurch", type: "Builder" },
    { quote: "We wanted a premium bathroom finish and Executive Tiling exceeded expectations. The attention to detail was outstanding and the final result completely transformed the space.", author: "Homeowner", location: "Christchurch", type: "Residential" },
    { quote: "From waterproofing through to the final finish, everything was completed professionally and to a very high standard. Easy communication and great workmanship.", author: "Renovation Client", location: "Canterbury", type: "Residential" },
    { quote: "Reliable, tidy, and incredibly precise. You can tell quality matters to them. We're extremely happy with the final result and would highly recommend Executive Tiling.", author: "Homeowner", location: "Canterbury", type: "Residential" },
  ],

  /* Short trust lines used in the rotating strip on the homepage. */
  trustLines: [
    "Precision workmanship from start to finish.",
    "Reliable delivery and premium-quality finishes.",
    "Trusted for townhouse and residential tiling projects.",
    "Professional service with exceptional attention to detail.",
  ],
};

/* Make available to the page scripts. Do not edit below this line. */
if (typeof window !== "undefined") { window.SITE = SITE; }
