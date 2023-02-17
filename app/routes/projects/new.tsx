import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { getClearances } from "~/models/api/clearance.server";
import { getLocations } from "~/models/api/location.server";
import { createProject } from "~/modules/project/project.server";
import { createProjectAdapter } from "~/modules/project/project.ui-adapter";
import { ProjectForm } from "~/modules/project/ui/ProjectForm";
import { requireUserId } from "~/session.server";

export const action = async ({ request, ...rest }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const parsedForm = createProjectAdapter(formData);

  const res = await createProject(parsedForm, userId);

  return redirect(`/projects/${res.id}`);
};

export const loader = async () => {
  return json({
    locations: await getLocations(),
    clearances: await getClearances(),
  });
};

export default function NewProject() {
  const data = useLoaderData<typeof loader>();
  return (
    <Form method="post">
      <ProjectForm locations={data.locations} clearances={data.clearances} />
    </Form>
  );
}
