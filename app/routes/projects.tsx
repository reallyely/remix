import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import DeleteIcon from "@mui/icons-material/Delete";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { deleteProject, getProjects } from "~/modules/project/project.server";
import { SubmitButton } from "~/components/SubmitButton";
import { Header } from "~/components/Header";
import { Box, Button, Stack } from "@mui/material";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const projects = await getProjects({ userId });
  return json({ projects });
}

export async function action({ request }: ActionArgs) {
  const id = (await request.formData()).get("id");
  return await deleteProject({ id });
}
export default function ProjectsPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header>
        <h1 className="text-3xl font-bold">
          <Link to=".">Projects</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <SubmitButton>Logout</SubmitButton>
        </Form>
      </Header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Project
          </Link>

          <hr />

          {data.projects.length === 0 ? (
            <p className="p-4">No projects yet</p>
          ) : (
            <ol>
              {data.projects.map((project) => (
                <li key={project.id}>
                  <Stack
                    className="border-b"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <NavLink
                      className={({ isActive }) =>
                        `block grow p-4 text-xl ${isActive ? "bg-white" : ""}`
                      }
                      to={project.id}
                    >
                      📝 {project.name}
                    </NavLink>
                    <Box>
                      <Form method="delete" style={{ height: "100%" }}>
                        <input type="hidden" name="id" value={project.id} />
                        <Button
                          style={{ height: "100%" }}
                          type="submit"
                          variant="text"
                          color="warning"
                        >
                          <DeleteIcon />
                        </Button>
                      </Form>
                    </Box>
                  </Stack>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
