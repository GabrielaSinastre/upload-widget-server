import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const uploads = pgTable('uploads', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text('name').notNull(),
  remoteKey: text('remote_key').notNull().unique(), //caminho remoto do arquivo
  remoteUrl: text('remote_url').notNull(), //url de acesso ao arquivo, quando tiver arquivo publico
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
