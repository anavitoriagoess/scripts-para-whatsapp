async function sendScriptWpp(scriptText) {
  const linesScriptText = scriptText
    .split(/[\n\t]+/)
    .map((line) => line.trim())
    .filter((line) => line);
  (mainWppCode = document.querySelector("#main")),
    (messageSpaceWppCode = mainWppCode.querySelector(
      `div[contenteditable="true"]`
    ));

  for (const line of linesScriptText) {
    messageSpaceWppCode.focus();
    dispatchText(messageSpaceWppCode, line);

    setTimeout(() => {
      (
        mainWppCode.querySelector(`[data-testid="send"]`) ||
        mainWppCode.querySelector(`[data-icon="send"]`)
      ).click();
    }, 100);

    if (linesScriptText.indexOf(line) !== linesScriptText.length - 1)
      await new Promise((resolve) => setTimeout(resolve, 250));
  }

  if (!messageSpaceWppCode)
    throw new Error(
      "Não existe nenhuma conversa aberta. Por favor, abra uma conversa e tente novamente"
    );

  return linesScriptText.length;
}

function dispatchText(target, text) {
  const dataTransfer = new DataTransfer();
  dataTransfer.setData("text/plain", text);

  target.dispatchEvent(
    new ClipboardEvent("paste", {
      clipboardData: dataTransfer,
      bubbles: true,
      cancelable: true,
    })
  );

  dataTransfer.clearData();
}

sendScriptWpp(`O texto que você quiser aqui :)`)
  .then((count) => console.log(`${count} mensagens enviadas`))
  .catch(console.error);
