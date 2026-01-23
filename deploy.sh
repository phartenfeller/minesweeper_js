#!/bin/bash

# Build the project first (optional, uncomment if needed)
# bun run build

# Sync the dist folder to the remote server
# -a: archive mode (preserves permissions, times, etc.)
# -v: verbose output
# -z: compress file data during the transfer
# --delete: delete extraneous files from destination dirs
rsync -avz --delete dist/ Hetzner2:/home/philipp/www/minesweeper/public
