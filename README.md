Hyte projektin backend


SQL Database diagrammi

```mermaid
erDiagram
    Users ||--o{ DiaryEntries : has
    Users ||--o{ Medications : takes
    Users ||--o{ Exercises : performs
    Users ||--o{ DailySteps : walks

    Users {
        INT user_id PK
        VARCHAR username
        VARCHAR password
        VARCHAR email
        DATETIME created_at
        VARCHAR user_level
    }

    DiaryEntries {
        INT entry_id PK
        INT user_id FK
        DATE entry_date
        VARCHAR mood
        DECIMAL weight
        INT sleep_hours
        INT calories_in
        INT calories_out
        TEXT notes
        DATETIME created_at
    }

    Medications {
        INT medication_id PK
        INT user_id FK
        VARCHAR name
        VARCHAR dosage
        VARCHAR frequency
        DATE start_date
        DATE end_date
    }

    Exercises {
        INT exercise_id PK
        INT user_id FK
        VARCHAR type
        INT duration
        VARCHAR intensity
        DATE date
    }

    DailySteps {
        INT step_id PK
        INT user_id FK
        DATE step_date
        INT steps
        DATETIME created_at
    }


