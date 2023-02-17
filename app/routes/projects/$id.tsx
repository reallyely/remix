import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { getClearances } from "~/models/api/clearance.server";
import { getLocations } from "~/models/api/location.server";
import { getProject, updateProject } from "~/modules/project/project.server";
import {
  mapToUi,
  updateProjectAdapter,
} from "~/modules/project/project.ui-adapter";
import { ProjectForm } from "~/modules/project/ui/ProjectForm";

export const action = async ({ request }: ActionArgs) => {
  //   const userId = await requireUserId(request);

  const formData = await request.formData();
  const parsedForm = updateProjectAdapter(formData);

  const res = await updateProject(parsedForm);

  return redirect(`/projects/${res.id}`);
};

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.id, `Project ID is required but wasn't provided`);
  const project = await getProject({ id: params.id });
  invariant(project, `Project could not be found`);

  return json({
    locations: await getLocations(),
    clearances: await getClearances(),
    project,
  });
};

export default function NewProject() {
  const data = useLoaderData<typeof loader>();
  const project = mapToUi(data.project);
  return (
    <Form method="put">
      <ProjectForm
        locations={data.locations}
        clearances={data.clearances}
        project={project}
      />
    </Form>
  );
}
