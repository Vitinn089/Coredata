DROP TABLE tb_project_languages;
DROP TABLE tb_project_topics;
DROP TABLE tb_languages;
DROP TABLE tb_topics;
DROP TABLE tb_projects;

DELETE FROM tb_project_languages;
DELETE FROM tb_project_topics;
DELETE FROM tb_languages;
DELETE FROM tb_topics;
DELETE FROM tb_projects;

SELECT * FROM tb_languages;
SELECT * FROM tb_topics;
SELECT * FROM tb_projects;
SELECT * FROM tb_project_languages;
SELECT * FROM tb_project_topics;

DELETE FROM tb_languages WHERE project_id='c9f69ae5-0fee-4be3-8b7c-05c825d0e45b';
SELECT * FROM tb_languages;

DELETE FROM tb_topics WHERE project_id='c9f69ae5-0fee-4be3-8b7c-05c825d0e45b';
SELECT * FROM tb_topics;

DELETE FROM tb_projects WHERE project_id='10d2e2ab-b57b-4749-a3dd-055ed13b3af0';
SELECT * FROM tb_projects;

SELECT tb_projects.project_id, project_name, language_name
FROM tb_projects RIGHT JOIN tb_project_languages
ON tb_projects.project_id = tb_project_languages.project_id
RIGHT JOIN tb_languages ON tb_project_languages.language_id = tb_languages.language_id
ORDER BY project_name ASC;


-- SELECTS

SELECT project_id, language_name
FROM tb_project_languages 
RIGHT JOIN tb_languages 
ON tb_project_languages.language_id = tb_languages.language_id  
WHERE project_id=$1;