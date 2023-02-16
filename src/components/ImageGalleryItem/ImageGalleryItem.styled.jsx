import styled from '@emotion/styled';

export const ImageGalleryItemWrp = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const ImageGalleryItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    box-shadow: 2px 3px 5px #c7fc07, -1px -3px 5px #0f70de;
    transform: scale(1.05);
    cursor: zoom-in;
  }
`;
