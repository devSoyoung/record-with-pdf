import React, {Component} from 'react';
import {PDFtoIMG} from 'react-pdf-to-image';
import file from './aaa.pdf';

const Converter =()=> 
    <div>
        <PDFtoIMG file={file}>
            {({pages}) => {
                if (!pages.length) return 'Loading...';
                var pagelist=[];
                pages.map((page, index)=>
                    pagelist.push(page)
                );
                console.log(pagelist);
                return pagelist;
            }}
        </PDFtoIMG>
    </div>

export default Converter;
/*
const Converter =()=> 
    <div>
        <PDFtoIMG file={file}>
            {({pages}) => {
                if (!pages.length) return 'Loading...';
                return pages.map((page, index)=>
                    <a href={page} download={index}>저장</a>
                );
            }}
        </PDFtoIMG>
    </div>

export default Converter;
*/