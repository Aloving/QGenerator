import { User } from "../../users";

export interface JwtPayload {
  id: User["id"];
}
