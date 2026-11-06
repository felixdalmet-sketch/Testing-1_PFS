import QRCode from "qrcode";

export async function generateQRDataUrl(token: string, baseUrl: string): Promise<string> {
  const verifyUrl = `${baseUrl}/verify?token=${token}`;
  try {
    const dataUrl = await QRCode.toDataURL(verifyUrl, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 300,
      color: {
        dark: "#1a1a1a",
        light: "#ffffff",
      },
    });
    return dataUrl;
  } catch (err) {
    console.error("QR generation failed:", err);
    throw new Error("Failed to generate QR code");
  }
}

export function getVerificationUrl(token: string, baseUrl: string): string {
  return `${baseUrl}/verify?token=${token}`;
}
