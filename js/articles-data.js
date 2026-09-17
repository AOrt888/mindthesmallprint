// Article metadata used to keep card content in one place for editing.
// (The homepage/articles page cards are still static HTML for reliability
// and SEO — this file exists so future edits only need to happen once.)
// `categories` is an array because an article can sit under more than one
// category badge/filter (e.g. the piracy article is both Sports Law and
// Intellectual Property Law) — the article page and card markup then
// render one badge per entry, and articles.html's data-category attribute
// lists them comma-separated for the filter logic in js/main.js.
window.ARTICLES = [
  {
    slug: "tackling-premier-league-piracy",
    title: "Tackling Premier League Piracy",
    categories: ["Sports Law", "Intellectual Property Law"],
    excerpt: "Live Premier League football is pirated on a huge scale. Drawing on my MA Law dissertation, I look at whether UK copyright law can actually stop it, and what would work better than blocking injunctions alone.",
    date: "2024-08-01",
    readTime: "8 min read",
    featured: true
  },
  {
    slug: "gpt-6-astra-and-the-law",
    title: "GPT-6 Astra and the Law",
    categories: ["Intellectual Property Law"],
    excerpt: "OpenAI's newest flagship model launched with law firms as a headline use case. What it actually means for intellectual property and the future of the legal profession under English law.",
    date: "2026-09-15",
    readTime: "6 min read",
    featured: false
  },
  {
    slug: "easygroup-v-easy-life-trade-mark-dispute",
    title: "Easy Life, Hard Lessons: What the easyGroup Trade Mark Dispute Teaches About Brand Protection",
    categories: ["Intellectual Property Law"],
    excerpt: "A Leicester indie band spent six years building a following under a name easyGroup decided it owned. A year on from their enforced rebrand to Hard Life, what the case shows about the Trade Marks Act 1994.",
    date: "2025-06-11",
    readTime: "8 min read",
    featured: false
  },
  {
    slug: "bosman-ruling-at-30",
    title: "The Bosman Ruling at 30: How One Case Changed Football Forever",
    categories: ["Sports Law"],
    excerpt: "In 1995, a Belgian midfielder's contract dispute reshaped the entire landscape of professional football. Three decades on, we examine the ruling's lasting legacy — and the questions it still hasn't answered.",
    date: "2026-08-20",
    readTime: "8 min read",
    featured: false
  },
  {
    slug: "doping-bans-and-due-process",
    title: "Doping, Bans and Due Process in Elite Sport",
    categories: ["Sports Law"],
    excerpt: "When an athlete tests positive, the legal machinery that follows is complex, contested and often misunderstood. We break down how anti-doping tribunals actually work — and whether they deliver justice.",
    date: "2026-08-15",
    readTime: "10 min read",
    featured: false
  }
];
