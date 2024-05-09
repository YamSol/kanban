#!/bin/bash
# entrypoint.sh

# Execute database migration
echo "Migrating database..."
yarn knex:migrate

# Execute seed
echo "Seeding database..."
yarn knex:seed

# Execute Dockerfile CMD
exec "$@"