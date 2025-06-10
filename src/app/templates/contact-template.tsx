import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailTemplate = ({
  name,
  email,
  phone,
  message,
}: Readonly<EmailTemplateProps>) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <h1
      style={{
        color: "#333",
        borderBottom: "2px solid #eee",
        paddingBottom: "10px",
      }}
    >
      Nuevo Mensaje de Contacto
    </h1>

    <div style={{ marginTop: "20px" }}>
      <p style={{ margin: "10px 0" }}>
        <strong>Nombre:</strong> {name}
      </p>
      <p style={{ margin: "10px 0" }}>
        <strong>Email:</strong> {email}
      </p>
      <p style={{ margin: "10px 0" }}>
        <strong>Teléfono:</strong> {phone}
      </p>
    </div>

    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "10px" }}>Mensaje:</h2>
      <p style={{ whiteSpace: "pre-wrap", color: "#444" }}>{message}</p>
    </div>
  </div>
);
