import PptxGenJS from "pptxgenjs";

export function generatePPT(slides) {
  const pptx = new PptxGenJS();
  slides.forEach((slide) => {
    let sld = pptx.addSlide();
    sld.addText(slide.title, { x: 1, y: 0.5, fontSize: 24, bold: true });
    sld.addText(slide.content, { x: 1, y: 1.5, fontSize: 16 });
  });
  return pptx;
}
