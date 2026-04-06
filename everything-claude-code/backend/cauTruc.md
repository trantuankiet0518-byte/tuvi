tuvi-backend/
├── src/
│ ├── index.ts ← entry point
│ ├── routes/
│ │ ├── chart.ts ← POST /chart/generate
│ │ ├── calendar.ts ← GET /calendar/convert
│ │ └── user.ts ← CRUD user profile
│ ├── services/
│ │ ├── tuvi.service.ts ← wrap cantian-tymext  
│ │ ├── cache.service.ts ← Redis logic
│ │ └── calendar.service.ts
│ ├── db/
│ │ ├── schema.ts ← Drizzle schema
│ │ └── index.ts ← db client
│ └── types/
│ └── tuvi.ts ← ChartRequest, ChartResponse (share với frontend)
├── package.json
└── .env
