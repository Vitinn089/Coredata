CREATE DATABASE IF NOT EXISTS vitinn
    WITH
    OWNER = coredata
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE vitinn
    IS 'Database to Coredata application.';