'use client';
export default function Error({ error }: { error: Error }) {
  return <p className="errorMessage">Could not fetch the list of notes. {error.message}</p>;
}
