// context
import { useUser } from '../context/UserContext';

// types
import { HourProp } from '../types/HourProp';

// utils
import getImages, { IMAGE_DEFAULTS, WeatherImage } from '../utils/getImages';
import Loader from './Loader';

export default function DogGrid({ hour }: { hour: HourProp }): JSX.Element {
  const userContext = useUser();
  if (!userContext) return <></>;
  const { user, settingsRefreshing } = userContext;

  // Stale timestamps / dead object URLs are handled centrally in UserContext:
  // it refreshes the whole settings payload and flips settingsRefreshing. While
  // that is in flight the bundled defaults still render fine, so only fall back
  // to the full loader when there are no settings to draw from at all.
  if (settingsRefreshing && !user.settings) return <Loader />;

  const images: WeatherImage[] = getImages(hour);

  return (
    <div
      data-hour-id={hour.time_epoch}
      className="weather-images"
      style={settingsRefreshing ? { opacity: 0.5 } : undefined}
    >
      {images.map(({ src, name }: WeatherImage, i: number) => {
        const imageClass: string = name === 'favicon' ? 'dog opaque' : 'dog';
        return (
          <img
            key={`${src}-${i}`}
            className={imageClass}
            src={src}
            alt={name}
            onError={(e) => {
              // A user upload can 404 (dead session URL, deleted file). Swap in
              // the bundled default once so we never show a broken image.
              const img = e.currentTarget;
              if (img.dataset.fellBack) return;
              const fallback = IMAGE_DEFAULTS[name];
              if (!fallback) return;
              img.dataset.fellBack = 'true';
              img.src = fallback;
            }}
          />
        );
      })}
    </div>
  );
}
