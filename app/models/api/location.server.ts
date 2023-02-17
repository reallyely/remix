import type { Location } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Location } from "@prisma/client";

export function getLocations() {
  return prisma.location.findMany();
}

