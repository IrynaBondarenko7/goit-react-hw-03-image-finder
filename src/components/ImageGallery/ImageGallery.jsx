import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ERROR_MSG = 'Something went wrong, try again';

export const ImageGallery = ({ hits }) => {
  return (
    <ul className="gallery">
      {hits.map(hit => {
        return <ImageGalleryItem key={hit.id} hit={hit} />;
      })}
    </ul>
  );
};
