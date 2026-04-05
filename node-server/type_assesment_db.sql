/*DROP DATABASE IF EXISTS type_assesment_db;*/

CREATE DATABASE type_assesment_db;

-- use the db:
USE type_assesment_db;

CREATE TABLE IF NOT EXISTS app_user (
	user_id		BINARY(16)		PRIMARY KEY DEFAULT		(UUID_TO_BIN(UUID())),
    username	TEXT,
    user_password	TEXT,
    best_score_achived	integer
);

CREATE TABLE IF NOT EXISTS user_assesment_results(
	id		integer	primary key		auto_increment,
    accuracy	integer,
    words_per_munite	integer,
    correct_words	integer,
    incorrect_words		integer,
    user_id		BINARY(16),
    FOREIGN KEY (user_id) REFERENCES app_user(user_id)
);


CREATE TABLE IF NOT EXISTS challenge_text(
	text_id		VARCHAR(30)		PRIMARY KEY,
    text_content	TEXT,
    difficult_level		integer
);

select *
from challenge_text;

select *, BIN_TO_UUID(user_id) id
from app_user;


INSERT INTO challenge_text (text_id, text_content, difficult_level)
VALUES ('easy-1', 'The sun rose over the quiet town. Birds sang in the trees as people woke up and started their day. It was going to be a warm and sunny morning.', 0);

INSERT INTO challenge_text (text_id, text_content, difficult_level)
VALUES ('medium-10', 'Night markets come alive after sunset in cities across Asia. Vendors set up stalls selling everything from grilled skewers to handmade crafts. The air fills with enticing aromas and the buzz of conversation. Locals and tourists alike wander through, sampling street food and hunting for bargains.', 1);

INSERT INTO challenge_text (text_id, text_content, difficult_level)
VALUES ('hard-10', 'Constitutional af3efwtfdv efefrfrr the counter-majoritarianasfefw feertry  fwefthj qqwerf frbrserv unelected judges overturn legislation passed by ergergr regafegs gr Adfe ergf qwf vcssfe grhsrtt htr rgersg sovereignty? Some argue courts protect minority rights against tyrannical majorities; others contend this reasoninsdfgre erg ererfgreg ergscdsfe erey5he werfvr btyt wwsdrf wascv olekngio nogoer dence. The tension, perhaps, is irresolvable; democratic systems must bkjbwfei wefjie oihroi principle.', 2);

INSERT INTO app_user (user_id, username, user_password, best_score_achived)
VALUES (UUID_TO_BIN('71450c21-2714-11f1-bc21-74563c4da38e'), 'kams', '$2b$10$mgaCUfYnnDR5Ifeo6w22LuuOlnXEecihNx0wyNc2pDhJMw4v6j2c2', 0);
