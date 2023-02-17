import type { User, Project } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Project } from "@prisma/client";

export async function getProject({
  id}: Pick<Project, "id">) {
  return await prisma.project.findFirst({
    where: { id },
  })
}

export async function getProjects({ userId }: { userId: User["id"] }) {
  const res = await prisma.project.findMany({
    where: { createdById: userId },
    // select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
  console.log(res)
  return res;
}
export type CreateProjectInterface = Omit<Project, "id" | "updatedAt" | "createdAt" | "createdById">
export async function createProject(project: CreateProjectInterface, userId: User["id"]) {
  return await prisma.project.create({
    data: { ...project, createdBy: {connect: {id: userId}} },
  });
}
export type UpdateProjectInterface = Omit<Project, "updatedAt" | "createdAt" | "createdById">
export async function updateProject(project: UpdateProjectInterface) {
  return await prisma.project.update({
    where: {id: project.id},
    data: { ...project },
  });
}

export function deleteProject({
  id,
}: Pick<Project, "id"> ) {
  return prisma.project.deleteMany({
    where: { id },
  });
}
