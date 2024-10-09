import React from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

const App = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dw5sqtvsd'
    }
  });

  const products = [
      {name: "cereals", id: 'beneficios-cereales-integrales-para-ninos_ae7vap'},
      {name: "vegetables", id: 'Cesta-de-verdura-ecologica_wzxave'},
      {name: "fruits", id: 'frutas-de-temporada_rkivoj'},
      {name: "meat", id: 'carne_plgsnd'},
      {name: "seafood", id: 'mar_ntg96i'},
      {name: "driedfruits", id: 'frutos_secos_31-blog-rrss-fb_rp9ggm'},
      {name: "milkproducts", id: 'lácteos_chisrm'},
      {name: "herbs", id: 'hierbas_gcgf3v'},
      {name: "spices", id: 'especias-y-el-mundo-de-la-gastronomia_fezicb'},
      {name: "wine", id: 'VINO-TUMBADAS_uqiaxc'},
    ]
    const imageError = cld.image('eror-404_gl2jgd');
    imageError.resize(fill().width(250).height(250))

    const cereals = cld.image('beneficios-cereales-integrales-para-ninos_ae7vap');
    cereals.resize(fill().width(250).height(250));

    return (
      <div>
        <AdvancedImage cldImg={cereals} />
        {products.map((product) => {
          const image = cld.image(product.id).resize(fill().width(250).height(250));
          return <AdvancedImage key={product.id} cldImg={image} />;
        })}
        <AdvancedImage cldImg={imageError} />;
      </div>
    )
};

export default App