import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Suspense, useCallback, useId, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./Sample.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https:////unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
  wasmUrl: "/wasm/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

function Sample() {
  const fileId = useId();
  const [file, setFile] = useState<PDFFile>("./sample.pdf");
  const [numPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;
    console.log(files);

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor={fileId}>Load from file:</label>{" "}
          <input id={fileId} onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document" ref={setContainerRef}>
          <ErrorBoundary
            fallback={<p role="alert">Failed to load PDF.</p>}
            resetKeys={[file]}
          >
            <Suspense fallback={<p>Loading PDF…</p>}>
              <Document file={file} onLoadSuccess={() => {}} options={options}>
                {Array.from(new Array(numPages), (_el, index) => (
                  <Page
                    // biome-ignore lint/suspicious/noArrayIndexKey: index is stable here
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={
                      containerWidth
                        ? Math.min(containerWidth, maxWidth)
                        : maxWidth
                    }
                  />
                ))}
              </Document>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

export const Component = () => {
  return <Sample />;
};
