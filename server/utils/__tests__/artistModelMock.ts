export const artistModelMock = {
  modelName: 'artist',
  attributes: {
    Name: { type: 'string' },
    drops: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::drop.drop',
      mappedBy: 'artist',
    },
    description: { type: 'string' },
    image: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['images', 'files', 'videos', 'audios'],
    },
    nfts: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::nft.nft',
      mappedBy: 'artist',
    },
    collections: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::collection.collection',
      mappedBy: 'artist',
    },
    cover: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['images'],
    },
    artist_details: {
      type: 'dynamiczone',
      components: [
        'general.accordion',
        'general.action',
        'general.artists-grid',
        'general.carousel',
        'general.event-data-strip',
        'general.hero-image',
        'general.image-action',
        'general.image',
        'general.info-strip',
        'general.quote',
        'general.video-carousel',
        'general.image-row',
        'general.image-grid',
      ],
    },
    artist_type: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::artist-type.artist-type',
      inversedBy: 'artists',
    },
    programmes: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'api::event.event',
      mappedBy: 'artists',
    },
    play: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::play.play',
      inversedBy: 'artists',
    },
    createdAt: { type: 'datetime' },
    updatedAt: { type: 'datetime' },
    publishedAt: {
      type: 'datetime',
      configurable: false,
      writable: true,
      visible: false,
    },
    createdBy: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'admin::user',
      configurable: false,
      writable: false,
      visible: false,
      useJoinTable: false,
      private: true,
    },
    updatedBy: {
      type: 'relation',
      relation: 'oneToOne',
      target: 'admin::user',
      configurable: false,
      writable: false,
      visible: false,
      useJoinTable: false,
      private: true,
    },
  },
};
