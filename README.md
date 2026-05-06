# Depth Chart API

A Node.js/Express REST API for managing an NFL-style depth chart per position using in-memory storage, seeded with the 2022 Tampa Bay Buccaneers roster.

---

## Setup

```bash
npm install
npm start
```

The server starts on **http://localhost:3000**.

---

## Project Structure

```
├── src/
│   ├── controllers/
│   │   └── depthChartController.js   # HTTP request/response handling
│   ├── data/
│   │   ├── buccaneersDepthChart.js   # Seed depth chart (positions → jersey numbers)
│   │   └── playerStore.js            # Seed player registry (jersey number → player)
│   ├── models/
│   │   └── player.js                 # Player class (number, name, position)
│   ├── routes/
│   │   └── depthChartRoutes.js       # Express route definitions
│   ├── services/
│   │   └── depthChartService.js      # Business logic & in-memory state
│   └── app.js                        # Express app entry point
├── tests/
│   └── depthChartService.test.js     # Unit tests
├── package.json
└── README.md
```

---

## Player Model

All players are represented as:

```json
{
  "number": 12,
  "name": "Brady, Tom",
  "position": "QB"
}
```

Endpoints that accept a player reference use the jersey `number` as the identifier.

---

## API Endpoints

| Method   | Endpoint                              | Description                                 |
|----------|---------------------------------------|---------------------------------------------|
| `GET`    | `/depthchart`                         | Get the full depth chart for every position |
| `POST`   | `/depthchart/:position`               | Add a player to a position                  |
| `DELETE` | `/depthchart/:position`               | Remove a player from a position             |
| `POST`   | `/depthchart/:position/backups`       | Get all backups for a player at a position  |

---

## Example Requests

### Get the full depth chart

**bash**
```bash
curl http://localhost:3000/depthchart
```
**PowerShell**
```powershell
Invoke-WebRequest -Uri http://localhost:3000/depthchart
```

---

### Add a player to a position

**bash**
```bash
# Add Tom Brady as QB1 (depth 0)
curl -X POST http://localhost:3000/depthchart/QB -H "Content-Type: application/json" -d "{\"number\": 12, \"name\": \"Brady, Tom\", \"depth\": 0}"

# Add a backup QB without specifying depth (appended to end)
curl -X POST http://localhost:3000/depthchart/QB -H "Content-Type: application/json" -d "{\"number\": 2, \"name\": \"Trask, Kyle\"}"
```
**PowerShell**
```powershell
# Add Tom Brady as QB1 (depth 0)
Invoke-WebRequest -Method POST -Uri http://localhost:3000/depthchart/QB -ContentType "application/json" -Body '{"number": 12, "name": "Brady, Tom", "depth": 0}'

# Add a backup QB without specifying depth (appended to end)
Invoke-WebRequest -Method POST -Uri http://localhost:3000/depthchart/QB -ContentType "application/json" -Body '{"number": 2, "name": "Trask, Kyle"}'
```

---

### Remove a player from a position

**bash**
```bash
curl -X DELETE http://localhost:3000/depthchart/QB -H "Content-Type: application/json" -d "{\"number\": 12, \"name\": \"Brady, Tom\"}"
```
**PowerShell**
```powershell
Invoke-WebRequest -Method DELETE -Uri http://localhost:3000/depthchart/QB -ContentType "application/json" -Body '{"number": 12, "name": "Brady, Tom"}'
```

---

### Get all backups for a player

**bash**
```bash
curl -X POST http://localhost:3000/depthchart/QB/backups -H "Content-Type: application/json" -d "{\"number\": 12, \"name\": \"Brady, Tom\"}"
```
**PowerShell**
```powershell
Invoke-WebRequest -Method POST -Uri http://localhost:3000/depthchart/QB/backups -ContentType "application/json" -Body '{"number": 12, "name": "Brady, Tom"}'
```

---

## Depth Insertion Behaviour

- If `depth` is provided, the player is inserted at that index and everyone at or below that depth shifts down by one.
- If `depth` is omitted, the player is appended to the end of the position's list.
- A player can appear on multiple position charts simultaneously (e.g. a versatile lineman listed at both LT and RT).

---

## Design Decisions

- **In-memory storage**: Chosen for simplicity and fast prototyping. Trade-offs: data is lost on restart, no horizontal scaling, and no persistence. A production system would use a database with proper indexing on jersey number and position.
- **Service/Controller separation**: Controllers handle HTTP concerns (parsing, validation, status codes); services own business logic and state. This keeps the domain model testable without spinning up HTTP infrastructure and makes it easier to add new interfaces later.
- **Players keyed by jersey number**: Jersey numbers are unique per team and stable across positions. This allows O(1) player lookups and supports multi-position players without duplication.
- **Multi-position support**: A player can appear on multiple position charts simultaneously. Removing a player only affects the specified position — they remain on other charts. This matches real NFL depth chart behaviour where versatile players are listed in multiple spots.
- **No authentication**: Omitted for simplicity. A production API would require API keys or OAuth tokens, role-based access control (coaches can edit, fans can only read), and audit logging for roster changes.

---

## Scaling

**Adding more sports (MLB, NHL, NBA)**

The core model is already sport-agnostic — positions and names are simply strings and numbers. Key changes needed:

1. **Routing** — add a `sport` segment: `/depthchart/:sport/:team/:position`
2. **Seed data** — each sport gets its own `data/` folder; the structure is identical, just different positions
3. **Position validation** — a per-sport list of valid positions to reject invalid input (e.g. `QB` for NBA)
4. **Service** — scope the depth chart by sport and team: `depthChart[sport][team][position]`

**Adding all NFL teams**

1. **Routing** — add a `team` segment: `/depthchart/:team/:position`
2. **In-memory store** — players scoped to a team, as the same jersey number can exist across teams
3. **Service instantiation** — refactor to a factory function or class that returns a scoped service per team, which also simplifies unit testing

---

## Automated Testing

Unit tests are written using [Jest](https://jestjs.io) and live in `tests/depthChartService.test.js`.

To run:

```bash
npm install
npm test
```

Edge cases are handled via early exits and validation inside the service layer. In the case of an unhappy path (e.g. removing a player that doesn't exist), the service returns `null` and the controller responds with a `404` and a descriptive error message.
