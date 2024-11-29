export const createTopics = `
	CREATE TABLE IF NOT EXISTS tb_topics  (
		topic_id SERIAL UNIQUE NOT NULL,
		topic_name VARCHAR(50) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			
		CONSTRAINT pk_topic PRIMARY KEY (topic_id)
);`;