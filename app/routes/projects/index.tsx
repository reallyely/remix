import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
  return (
    <p>
      No Project selected. Select a project on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new project.
      </Link>
    </p>
  );
}
