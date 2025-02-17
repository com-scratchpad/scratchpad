from dotenv import load_dotenv

# Simply load dotenv so that env variables are 
# accessible in modules
load_dotenv()

from .openai import create_openai_client
from .supabase import create_supabase_client

