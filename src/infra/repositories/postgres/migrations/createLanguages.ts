export const createLanguages =  `
	CREATE TABLE IF NOT EXISTS tb_languages (
		language_id SERIAL UNIQUE NOT NULL,
		language_name VARCHAR(50) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

		CONSTRAINT pk_language PRIMARY KEY (language_id)
);`;