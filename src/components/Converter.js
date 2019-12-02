import React from 'react';
import { connect } from 'react-redux';
import { PDFtoIMG } from 'react-pdf-to-image';
import file from './aaa.pdf';
import { actionCreators } from '../reduxStore';

function Converter({ setImages }) {
  return (
    <div>
      <PDFtoIMG file={file}>
        {({ pages }) => {
          if (!pages || !pages.length) {
            return '';
          }
          setImages(pages);
          return '';
        }}
      </PDFtoIMG>
    </div>
  );
}

const mapStateToProps = state => ({
  images: state.images,
  imageIndex: state.imageIndex,
});

const mapDispatchToProps = dispatch => ({
  setImages: images => dispatch(actionCreators.setImages(images)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Converter);
