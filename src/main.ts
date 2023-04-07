
import app from './adapters/express/server';
import appConfigs from './config/config';
import { WinstonLogger } from './infra/winston/winston-logger';

const PORT = appConfigs.PORT;
const logger = new WinstonLogger();

app.listen(PORT, () => logger.log.info(`Server is running in: http://localhost:${PORT}` ));