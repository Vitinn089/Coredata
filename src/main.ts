
import app from './adapters/express/server';
import appConfigs from './config/config';
import { WinstonLogger } from './infra/winston/winston-logger';
import migrationsRun from './infra/repositories/postgres/migrations';

const PORT = appConfigs.PORT;
const logger = new WinstonLogger();

migrationsRun();

app.listen(PORT, () => logger.log.info(`Server is running in: http://localhost:${PORT}` ));