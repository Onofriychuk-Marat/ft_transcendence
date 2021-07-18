import { ConnectionOptions } from 'typeorm'
import { username, database, password, url_db } from './configuration'

export  const ormconfig: ConnectionOptions = {
    type: 'postgres',
    url: url_db,
    username: username,
    password: password,
    database: database,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}

export const JWT_SECRET = 'secret-secret'
