import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { prop, propOr } from "ramda";
import type { IProjectForm } from "../project.ui-adapter";

const propOrEmpty = propOr("");
const propOrToday = propOr(new Date().toISOString().substring(0, 10));

export function ProjectForm({
  locations,
  clearances,
  project,
}: {
  locations: { id: string; title: string }[];
  clearances: { id: string; title: string }[];
  project?: IProjectForm;
}) {
  const orToday = (prop: string): string => propOrToday(prop, project);
  const orEmpty = (prop: string): string => propOrEmpty(prop, project);

  return (
    <Stack direction="column" spacing={2}>
      <input
        type="hidden"
        name="id"
        key={`${project?.id}-id`}
        value={orEmpty("id")}
      />
      <TextField
        name="name"
        key={`${project?.id}-name`}
        label="Project Name"
        defaultValue={orEmpty("name")}
      />
      <Stack direction="row" spacing={2}>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="startDate"
          key={`${project?.id}-startDate`}
          type="date"
          label="Start Date"
          defaultValue={orToday("startDate")}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          name="endDate"
          key={`${project?.id}-endDate`}
          type="date"
          label="End Date"
          defaultValue={orToday("endDate")}
        />
      </Stack>
      <Autocomplete
        id="location"
        options={locations.map(prop("title"))}
        renderInput={(params) => (
          <TextField
            {...params}
            name="location"
            key={`${project?.id}-location`}
            label="Location"
          />
        )}
        defaultValue={orEmpty("location")}
      />
      <Autocomplete
        id="clearance"
        options={clearances.map(prop("title"))}
        renderInput={(params) => (
          <TextField
            {...params}
            name="clearance"
            key={`${project?.id}-clearance`}
            label="Clearance"
          />
        )}
        defaultValue={orEmpty("clearance")}
      />
      <TextField
        defaultValue={orEmpty("probability")}
        type="number"
        label="Probability"
        name="probability"
        key={`${project?.id}-probability`}
      />
      <TextField
        defaultValue={orEmpty("notes")}
        type="text"
        label="Notes"
        name="notes"
        key={`${project?.id}-notes`}
        multiline
      />
      <Button type="submit">Submit</Button>
    </Stack>
  );
}
