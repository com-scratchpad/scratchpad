Prerequisites
---
1. Install `uv` package manager by [following this](https://docs.astral.sh/uv/getting-started/installation/), or copy-paste the below for macOS/Linux:
##
    curl -LsSf https://astral.sh/uv/install.sh | sh

2. Install `bun` by [following this](https://bun.sh/docs/installation) or copy-paste the below for macOS/Linux:
###
    curl -fsSL https://bun.sh/install | bash

3. Ensure you have environment variables set below in a `.env` file in the `server` folder.
##
    export SUPABASE_URL="<url to supabase>"
    export SUPABASE_KEY="<supabase secret>"
    
    export OPENAI_API_KEY="<openai secret>"

Running desktop frontend
---
Go into directory `scratchpad/desktop`, then run `bun run tauri dev`
##
      cd <scratchpad directory>/desktop
      bun run tauri dev

Running backend
---
Go into directory `scratchpad/server`, then run `uv run fastapi dev`
##
      cd <scratchpad directory>/server
      uvicorn app.main:app --reload
