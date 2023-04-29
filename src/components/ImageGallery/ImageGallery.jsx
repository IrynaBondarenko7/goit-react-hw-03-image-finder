import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGalleryList } from './ImageGallery.styled';

const ERROR_MSG = 'Something went wrong, try again';

export const ImageGallery = ({ hits }) => {
  return (
    <StyledGalleryList className="gallery">
      {hits.map(hit => {
        return <ImageGalleryItem key={hit.id} hit={hit} />;
      })}
    </StyledGalleryList>
  );
};
