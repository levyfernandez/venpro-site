import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Falta configurar RESEND_API_KEY en el servidor." },
        { status: 500 }
      )
    }

    const body = await req.json()

    const name = typeof body.name === "string" ? body.name.trim() : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const message = typeof body.message === "string" ? body.message.trim() : ""

    if (!name || !email || !message) {
      return Response.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "El correo electrónico no es válido." },
        { status: 400 }
      )
    }

    if (name.length > 120) {
      return Response.json(
        { error: "El nombre es demasiado largo." },
        { status: 400 }
      )
    }

    if (message.length > 5000) {
      return Response.json(
        { error: "El mensaje es demasiado largo." },
        { status: 400 }
      )
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)

    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev"
    const toEmail = process.env.CONTACT_TO_EMAIL || "info@venprogroup.com"

    const { error } = await resend.emails.send({
      from: `Venpro Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `Nuevo mensaje desde la web - ${name}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="margin-bottom: 20px;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="white-space: pre-wrap; border: 1px solid #e5e5e5; padding: 16px; border-radius: 8px;">
            ${safeMessage}
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)

      return Response.json(
        { error: "No se pudo enviar el correo." },
        { status: 500 }
      )
    }

    return Response.json(
      { ok: true, message: "Mensaje enviado correctamente." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact API error:", error)

    return Response.json(
      { error: "Ocurrió un error procesando la solicitud." },
      { status: 500 }
    )
  }
}