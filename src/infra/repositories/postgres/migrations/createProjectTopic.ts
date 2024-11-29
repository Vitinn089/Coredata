export const createProjectTopics = `
	CREATE TABLE IF NOT EXISTS tb_project_topics (
		project_id VARCHAR(36) NOT NULL,
		topic_id INT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
		CONSTRAINT pk_project_topics PRIMARY KEY (project_id, topic_id),
		CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES tb_projects(project_id),
		CONSTRAINT fk_topic FOREIGN KEY(topic_id) REFERENCES tb_topics(topic_id)
);`;