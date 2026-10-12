import { redirect } from "next/navigation";

/** Old internal demo path — send users to the live School ERP. */
export default function SchoolErpDemoRedirect() {
  redirect("https://getaxe-school-erp.netlify.app/");
}
