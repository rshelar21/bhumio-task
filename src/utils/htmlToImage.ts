import * as htmlToImage from "html-to-image";

export const getHtmlToImage = async (type: string, elementRef: any) => {
  if (!elementRef.current) return;
  if (type === "PNG") {
    htmlToImage
      .toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (type === "SVG") {
    htmlToImage
      .toSvg(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.svg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (type === "JPEG") {
    htmlToImage
      .toJpeg(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
