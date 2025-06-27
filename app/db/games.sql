CREATE TABLE games (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    password text,
    question_count integer NOT NULL,
    time_minutes integer NOT NULL,
    created_by uuid NOT NULL,
    participants jsonb DEFAULT '[]',
    category text NOT NULL,
    game_status text DEFAULT 'pending',
    current_question integer DEFAULT 0,
    phase text DEFAULT 'lobby', -- 'lobby', 'question', 'results', 'finished'
    created_at timestamptz DEFAULT now()
);

CREATE TABLE questions (
    id serial PRIMARY KEY,
    category text NOT NULL,
    question text NOT NULL,
    correct_answer text NOT NULL,
    option_1 text NOT NULL,
    option_2 text NOT NULL,
    option_3 text NOT NULL
);

CREATE TABLE answers (
    id serial PRIMARY KEY,
    game_id uuid REFERENCES games(id) ON DELETE CASCADE,
    user_id uuid NOT NULL,
    question_index integer NOT NULL,
    answer text NOT NULL,
    answered_at timestamptz DEFAULT now()
);

CREATE TABLE scores (
    id serial PRIMARY KEY,
    game_id uuid REFERENCES games(id) ON DELETE CASCADE,
    user_id uuid NOT NULL,
    score integer DEFAULT 0
);

CREATE INDEX idx_answers_game ON answers(game_id);
CREATE INDEX idx_answers_user ON answers(user_id);