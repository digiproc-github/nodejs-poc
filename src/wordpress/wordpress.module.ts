import got from 'got';
import { WordpressClient } from './clients/wordpress.client.js';
import { gotConfig } from './wordpress.config.js';

export interface WordpressModule extends Module {
  Client: WordpressClient
}

export function getWordpressModule(): WordpressModule {
  const gotClient = got.extend(gotConfig);

  return {
    Client: new WordpressClient(gotClient)
  };
}
