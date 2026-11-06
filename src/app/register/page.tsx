import { redirect } from "next/navigation";

const REGISTER_URL = "https://forms.gle/szVdWVhLMAos6Bqy7";

export default function RegisterPage() {
  redirect(REGISTER_URL);
}
