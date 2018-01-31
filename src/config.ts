import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export class Config {

    public static readonly IP :string = '0.0.0.0';
    public static readonly Port :number = 3001;
    public static readonly GlobalRoutePrefix :string = 'api/v1';
    public static readonly docsRoute :string = '/docs';
    public static readonly apiUrl :string = `http://${Config.IP}:${Config.Port}/${Config.GlobalRoutePrefix}`;

    public static readonly db :SqliteConnectionOptions = {
        type: 'sqlite',
        logging: true,
        logger: 'advanced-console',
        database: './bd.sql',
        entities: [`${__dirname}/entities/**.entity{.ts,.js}`],
        synchronize: true
    }

    // public static db :MysqlConnectionOptions = {
    //     name: 'mysql',
    //     type: 'mysql',
    //     logging: true,
    //     logger: 'advanced-console',
    //     host: 'localhost',
    //     port: 3306,
    //     username: 'root',
    //     database: 'test',
    //     entities: [`${__dirname}/entities/**.entity{.ts,.js}`]
    // };

    public static readonly redLog :string = '\x1b[31m'
    public static readonly greenLog :string = '\x1b[32m'
    public static readonly yellowLog :string = '\x1b[33m'
    public static readonly magentaLog :string = '\x1b[35m'
    public static readonly cyanLog :string = '\x1b[36m'

  }