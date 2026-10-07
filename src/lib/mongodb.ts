/**
 * MongoDB has been removed from this project.
 * Products and new data use Supabase (see src/lib/supabase.ts).
 * This stub exists only so any leftover import does not crash the app.
 */

export async function dbConnect(): Promise<null> {
  console.warn(
    "[deprecated] dbConnect() called — MongoDB is removed. Use Supabase (src/lib/supabase.ts)."
  );
  return null;
}

const clientPromise = Promise.reject(
  new Error(
    "MongoDB has been removed from this project. Use Supabase (NEXT_PUBLIC_SUPABASE_URL)."
  )
);

// Prevent unhandled rejection noise if something still imports the default export
clientPromise.catch(() => {});

export default clientPromise;
