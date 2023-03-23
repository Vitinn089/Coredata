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

DELETE FROM tb_projects WHERE project_id='c9f69ae5-0fee-4be3-8b7c-05c825d0e45b';
SELECT * FROM tb_projects;
