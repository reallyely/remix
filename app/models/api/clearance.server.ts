import type { Clearance } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Clearance } from "@prisma/client";

export function getClearances() {
  return prisma.clearance.findMany();
}

// export function getProjects({ userId }: { userId: User["id"] }) {
//   return prisma.project.findMany({
//     where: { userId },
//     select: { id: true, name: true },
//     orderBy: { updatedAt: "desc" },
//   });
// }
// export const createProject = prisma.project.create

// export function deleteProject({
//   id,
//   userId,
// }: Pick<Project, "id"> & { userId: User["id"] }) {
//   return prisma.project.deleteMany({
//     where: { id, userId },
//   });
// }
