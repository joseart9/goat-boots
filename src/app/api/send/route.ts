import { EmailTemplate } from "../../templates/contact-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "ventas@goatboots.mx",
      to: ["ventas@goatboots.mx"],
      subject: `Nuevo mensaje de contacto de ${name}`,
      react: EmailTemplate({
        name,
        email,
        phone,
        message,
      }),
      replyTo: email,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
