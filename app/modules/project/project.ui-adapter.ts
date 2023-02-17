import type { Clearance } from "@prisma/client";
import { z } from "zod";
import type { CreateProjectInterface, UpdateProjectInterface } from "./project.server";

// const yyyMmDdRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/

export interface IProjectForm {
    id: string | null;
    name: string | null;
    startDate: string | null;
    endDate: string | null;
    location: string | null;
    clearance: string | null;
    notes: string | null;
    probability: number | null;
}

export interface NewProjectDTO {
    locations:  Location[] | null 
    clearances: Clearance[]
}

export function createProjectAdapter(form: FormData) : CreateProjectInterface {
    const formEntries = Object.fromEntries(form)
    const projectSchema = z.object({
        name: z.string().nullable(),
        startDate: z.coerce.date().nullable(),
        endDate: z.coerce.date().nullable(),
        location: z.string().nullable().default(""),
        clearance: z.string().nullable().default(""),
        notes: z.string().nullable(),
        probability: z.coerce.number().nullable().default(0),
      });
      
      const result = projectSchema.parse(formEntries)
    return result
}

export function updateProjectAdapter(form: FormData): UpdateProjectInterface {
    const formEntries = Object.fromEntries(form)
    const projectSchema = z.object({
        id: z.string(),
        name: z.string().nullable(),
        startDate: z.coerce.date().nullable(),
        endDate: z.coerce.date().nullable(),
        location: z.string().nullable().default(""),
        clearance: z.string().nullable().default(""),
        notes: z.string().nullable(),
        probability: z.coerce.number().nullable().default(0),
      });
      
      const result = projectSchema.parse(formEntries)
    return result
}

export function mapToUi(from: any) {
    const projectSchema = z.object({
        id: z.string(),
        name: z.string().nullable(),
        startDate: z.coerce.string().datetime().nullable(),
        endDate: z.coerce.string().datetime().nullable(),
        location: z.string().nullable().default(""),
        clearance: z.string().nullable().default(""),
        notes: z.string().nullable(),
        probability: z.coerce.number().nullable().default(0),
      });
      const result = projectSchema.parse(from)
      if (result.startDate) result.startDate = new Date(result.startDate).toISOString().substring(0, 10)
      if (result.endDate) result.endDate = new Date(result.endDate).toISOString().substring(0, 10)
      console.log(result.startDate)
    return result
}
