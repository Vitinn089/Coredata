# Textual Logical Model

**tb_projects** (<u>project_id</u>, project_name, project_title, project_desc, project_repo, project_site, project_display, project_cover, project_image)

**tb_languages** (<u>language_id</u>, language_name)

**tb_topics** (<u>topic_id</u>, topic_name)

**tb_project_languages** (<u>project_id</u>, <u>language_id</u>) </br>
<u>project_id</u> reference **tb_projects**, </br>
<u>language_id</u> reference **tb_languages**

**tb_project_topics** (<u>project_id</u>, <u>topic_id</u>) </br>
<u>project_id</u> reference **tb_projects**, </br>
<u>topic_id</u> reference **tb_topics**