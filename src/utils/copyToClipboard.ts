export function copyToClipboard(inputId: string) {
  const copyText = document.querySelector(`textarea#${inputId}`) as
    | HTMLTextAreaElement
    | null
    | undefined;
  copyText?.select();
  copyText?.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard?.writeText(`${copyText?.value}` || "");
}
