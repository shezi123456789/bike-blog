import { auth, signOut } from "@/lib/auth";

export default async function AuthButton() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="flex items-center gap-3"
    >
      <span className="font-body text-sm text-garage-muted">
        {session.user.name}
      </span>
      <button
        type="submit"
        className="font-data text-xs uppercase tracking-wider text-garage-accent hover:underline"
      >
        Sign out
      </button>
    </form>
  );
}
