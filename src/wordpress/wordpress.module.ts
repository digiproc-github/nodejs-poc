import got from 'got';
import { WordpressClient } from './clients/wordpress.client.js';
import { gotConfig } from './wordpress.config.js';

export interface WordpressModule extends Module {
  wordPressClient: WordpressClient
}

export function getWordpressModule(): WordpressModule {
  const gotClient = got.extend(gotConfig);

  return {
    wordPressClient: new WordpressClient(gotClient)
  };
}
