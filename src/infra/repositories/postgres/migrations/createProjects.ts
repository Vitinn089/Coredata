export const createProjects =  `
	CREATE TABLE IF NOT EXISTS tb_projects (
		project_id VARCHAR(36) UNIQUE NOT NULL,
		project_name VARCHAR(50) UNIQUE NOT NULL,
		project_title VARCHAR(50) NOT NULL,
		project_desc VARCHAR(255),
		project_repo VARCHAR(100),
		project_site VARCHAR(100),
		project_display boolean NOT NULL,
		project_cover VARCHAR(100),
		project_image VARCHAR(100),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

		CONSTRAINT pk_project PRIMARY KEY (project_id)
);`;