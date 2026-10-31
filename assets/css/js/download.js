document.addEventListener("click", async function (event) {
    const link = event.target.closest("a.download-file");

    if (!link) return;

    event.preventDefault();

    const fileUrl = link.href;
    const fileName = link.dataset.filename || fileUrl.split("/").pop();

    try {
        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error(`Download failed: ${response.status}`);
        }

        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = fileName;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();

        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error("Unable to download file:", error);
        alert("The file could not be downloaded. Please try again.");
    }
});
