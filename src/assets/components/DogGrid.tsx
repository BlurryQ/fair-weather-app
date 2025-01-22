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
        const alt: string = image.split('/')[3];
        const imageClass: string = alt ? 'dog' : 'dog opaque';
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