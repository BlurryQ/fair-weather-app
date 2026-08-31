import loaderSvg from '../assets/loader.svg?raw';

// The exporter frames the art low and small in a 1920x1920 viewBox. Re-crop to a
// 1150x900 window centred on the art (matching .loader-icon's aspect-ratio) so
// the animation fills its container instead of floating small and low in a sea of
// transparent margin. Deliberate compromise: the sunny "rest" cloud is centred
// and large; the bigger storm frame's lightning bolt reaches close to the bottom
// edge mid-loop but stays inside it.
// Also strip the unreferenced `id="iN"` attributes so rendering more than one
// Loader at a time doesn't put duplicate ids in the DOM.
const markup = loaderSvg
  .replace('viewBox="0 0 1920 1920"', 'viewBox="380 560 1150 900"')
  .replace(/ id="i\d+"/g, '');

export default function Loader(): JSX.Element {
  return (
    <div className="loading">
      <div
        className="loader-icon"
        data-testid="loader"
        aria-label="Loading Spinner"
        role="img"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <h2>Loading data...</h2>
    </div>
  );
}
