import { HourProp } from '../types/HourProp';

export default function DogGrid({
  hour,
  images,
}: {
  hour: HourProp;
  images: string[];
}) {
  return (
    <div data-hour-id={hour.time_epoch} className="weather-images">
      {images.map((image: string, i: number) => {
        // split at [2] for placeholder due to different location (eg. /fair-weather-app/images/rainy.png)
        let alt: string = image.split('/')[3] || image.split('/')[2];
        alt = alt.split('.')[0];
        const imageClass: string = alt === 'favicon' ? 'dog opaque' : 'dog';
        return (
          <img
            key={`${image}-${i}`}
            className={imageClass}
            src={image}
            alt={alt}
          />
        );
      })}
    </div>
  );
}
