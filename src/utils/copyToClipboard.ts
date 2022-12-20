export async function copyToClipboard(inputId: string): Promise<void> {
  const copyText = document.querySelector(`textarea#${inputId}`) as
    | HTMLTextAreaElement
    | null
    | undefined;
  copyText?.select();
  copyText?.setSelectionRange(0, 99999); // For mobile devices
  if (!copyText?.value) {
    return;
  }
  await navigator.clipboard?.writeText(`${copyText.value}`);
}
