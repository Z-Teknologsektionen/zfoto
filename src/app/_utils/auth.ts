import { cache } from "react";
import { getServerAuthSession } from "./authOptions";

export const getAuth = cache(getServerAuthSession);
