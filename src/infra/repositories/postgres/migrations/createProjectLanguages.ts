export const createProjectLanguages = `
CREATE TABLE IF NOT EXISTS tb_project_languages (
			project_id VARCHAR(36) NOT NULL,
			language_id INT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		
			CONSTRAINT pk_project_languages PRIMARY KEY (project_id, language_id),
			CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES tb_projects(project_id),
			CONSTRAINT fk_language FOREIGN KEY(language_id) REFERENCES tb_languages(language_id)
		);`;