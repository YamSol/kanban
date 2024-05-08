#!/bin/bash
# entrypoint.sh

# Execute database migration
echo "Migrating database..."
yarn knex:migrate

# Execute Dockerfile CMD
exec "$@"