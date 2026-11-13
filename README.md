# CSIT248 – My Student Portal

- **Name:** Daniil Pinegin
- **Enrolment number:** A85204925012
- **Last four digits:** 5 0 1 2 → D1 = 5, D2 = 0, D3 = 1, D4 = 2
- **Started:** 2026-11-13

## My values

| Value | Meaning | Formula | Result |
|-------|---------|---------|--------|
| P | password min length | 6 + (D4 mod 4) = 6 + 2 | **8** |
| M | name max characters | 20 + D1 = 20 + 5 | **25** |
| S | students in JSON | 5 + (D3 mod 3) = 5 + 1 | **6** |
| K | my own marks | (5 + 0 + 1 + 2) × 4 = 32 (max 100) | **32** |
| T | pass mark | 40 + D4 = 40 + 2 | **42** |
| C | accent colour | named CSS colour starting with "P" (Pinegin) | **purple** |
