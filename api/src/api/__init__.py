from api.env import init_supabase, init_openai


def main() -> None:
    _ = init_supabase()
    _ = init_openai()
    print("Hello from api!")
