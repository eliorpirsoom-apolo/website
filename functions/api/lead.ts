interface Env {
  LEADMANAGER_URL?: string;
}

const DEFAULT_LM_URL =
  "https://api.leadmanager.co.il/handlers/lm/submit.cms?lm_form=69464&lm_key=9119fd5b10d740bbb9b474f19e5a75c3";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const honeypot = (form.get("_gotcha") || "").toString().trim();
  if (honeypot) {
    return Response.redirect(new URL("/thanks/", request.url).toString(), 303);
  }

  const name = (form.get("name") || "").toString().trim();
  const phone = (form.get("phone") || "").toString().trim();

  if (!name || !phone) {
    return Response.redirect(
      new URL("/contact/?error=missing", request.url).toString(),
      303,
    );
  }

  const email = (form.get("email") || "").toString().trim();
  const service = (form.get("service") || "").toString().trim();
  const message = (form.get("message") || "").toString().trim();

  const lmPayload = new URLSearchParams();
  lmPayload.append("name", name);
  lmPayload.append("phone", phone);
  if (email) lmPayload.append("email", email);
  if (service) lmPayload.append("service", service);
  if (message) lmPayload.append("message", message);

  const target = env.LEADMANAGER_URL || DEFAULT_LM_URL;

  try {
    const lmResponse = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: lmPayload.toString(),
    });

    if (!lmResponse.ok) {
      return Response.redirect(
        new URL("/contact/?error=upstream", request.url).toString(),
        303,
      );
    }
  } catch {
    return Response.redirect(
      new URL("/contact/?error=network", request.url).toString(),
      303,
    );
  }

  return Response.redirect(new URL("/thanks/", request.url).toString(), 303);
};

export const onRequest: PagesFunction = async () => {
  return new Response("Method not allowed", { status: 405 });
};
