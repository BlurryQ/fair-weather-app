// context
import { useUser } from '../context/UserContext';

// types
import { HourProp } from '../types/HourProp';

// utils
import getImages from '../utils/getImages';
import Loader from './Loader';

export default function DogGrid({ hour }: { hour: HourProp }): JSX.Element {
  const userContext = useUser();
  if (!userContext) return <></>;
  const { user, updateImageUrls } = userContext;

  // TODO loaders for when fetching images
  if (user.settings) {
    const now = new Date();
    const oneHour: number = 1000 * 60 * 60;
    const timestampExpired: boolean =
      now.getTime() - user.settings.timestamp > oneHour;

    if (timestampExpired) {
      updateImageUrls(user.id);
    }
  }
  const images: string[] = getImages(hour);

  // TODO check this works
  if (images.length === 0) return <Loader />;

  return (
    <div data-hour-id={hour.time_epoch} className="weather-images">
      {images.map((image: string, i: number) => {
        // split at [2] for placeholder due to different location (eg. /fair-weather-app/images/rainy.png)
        let alt: string = image.split('/')[5] || image.split('/')[1];
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
