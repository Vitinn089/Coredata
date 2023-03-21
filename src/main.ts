
import app from './adapters/express/server';
import appConfigs from './config/config';

const PORT = appConfigs.PORT;

app.listen(PORT, () => console.log(`\nServer is running in: http://localhost:${PORT}/` ));